import React from "react";

//import Topbar from "./topbar.js";
//import Widget from "./widget.js";
//import AddWidget from "./addWidget.js";
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
  return <p>Content</p>;
}
