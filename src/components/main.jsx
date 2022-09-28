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
      <div className="grid grid-cols-3 gap-4">
        {widgets.map((widget) => {
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
        })}
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
