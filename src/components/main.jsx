import React from "react";

import Topbar from "./topbar";
import Widget from "./widget";
import AddWidget from "./addWidget";
import { ttRss } from "../ttrss.js";

function setWidgetsFromStorage(setWidgets) {
  try {
    const sWidgets = JSON.parse(localStorage.getItem("TTRssWidgets"));
    if (sWidgets && sWidgets.length > 0) {
      console.log("from storage", sWidgets);
      setWidgets(sWidgets);
    }
  } catch (e) {
    // pass
  }
}

function makeWidget(col, widgets, feeds) {
  return widgets
    .filter((_, i) => i % 3 === col)
    .map((widget) => {
      let widgetFeed = null;
      for (let feed of feeds) {
        if (parseInt(feed.id, 10) === parseInt(widget.id, 10)) {
          widgetFeed = feed;
          break;
        }
      }
      if (!widgetFeed) {
        return (
          <div key={widget.id}>
            <div>Feed non trovato</div>;
          </div>
        );
      }
      return <Widget key={widget.id} feed={widgetFeed} size={widget.size} />;
    });
}

export default function Main({ handleLogin }) {
  const [isAddWidget, setAddWiget] = React.useState(false);
  const [widgets, setWidgets] = React.useState([]);
  const [feeds, setFeeds] = React.useState([]);
  React.useEffect(() => {
    setWidgetsFromStorage(setWidgets);
  }, []);
  const addWidget = (id) => {
    setAddWiget(false);
    if (id) {
      setWidgets(widgets.concat([{ id: id }]));
      localStorage.setItem("TTRssWidgets", JSON.stringify(widgets.concat([{ id: id }])));
    }
  };
  React.useEffect(() => {
    ttRss
      .checkCategories()
      .then((resp) => {
        if (!resp) {
          return { id: null, title: "Portal category not found on TT-RSS" };
        }
        return ttRss.getFeeds();
      })
      .then((feeds) => {
        setFeeds(feeds);
      });
  }, []);
  console.log("widgets", widgets);
  return (
    <React.Fragment>
      <Topbar handleLogin={handleLogin} setAddWiget={setAddWiget} />
      <div className="flex flex-row gap-4 p-3">
        <div className="basis-1/3 w-1/3	flex flex-col gap-4">{makeWidget(0, widgets, feeds)}</div>
        <div className="basis-1/3 w-1/3	flex flex-col gap-4">{makeWidget(1, widgets, feeds)}</div>
        <div className="basis-1/3 w-1/3	flex flex-col gap-4">{makeWidget(2, widgets, feeds)}</div>
      </div>
      <AddWidget
        feeds={feeds}
        open={isAddWidget}
        addWidget={addWidget}
        skip={widgets.map((w) => w.id)}
      />
    </React.Fragment>
  );
}
