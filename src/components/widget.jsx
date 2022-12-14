import React, { useState } from "react";
import ttRss from "../ttrss";

import Loading from "./loading";
import WidgetHeader from "./widgetHeader";
import WidgetConfig from "./widgetConfig";
import WidgetMove from "./widgetMove";
import WidgetLink from "./widgetLink";
import WidgetPagination from "./widgetPagination";

export default function Widget({ feed, config, updateConfig, updateFeed, move }) {
  const [isCollapsed, setCollapsed] = useState(false);
  const [isMoving, setMoving] = useState(false);
  const [isConfiguring, setConfiguring] = useState(false);
  const [sizeLimit, setSizeLimit] = useState(config.sizeLimit || 10);
  const [wType, setWType] = useState(config.wType || "excerpt");
  const [color, setColor] = useState(config.color || "gray");
  const [skip, setSkip] = useState(0);
  const [rows, setRows] = useState([]);
  const { unread } = feed;
  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    if (!isCollapsed) {
      ttRss.getContent(feed.id, sizeLimit, skip, false).then(setRows);
    }
  }, [skip, feed]);

  React.useEffect(() => {
    if (!isCollapsed) {
      if (rows.length < sizeLimit) {
        ttRss.getContent(feed.id, sizeLimit, skip, false).then(setRows);
      }
    }
  }, [sizeLimit]);
  /* eslint-enable */
  const handleCommand = (name, data) => {
    if (name === "toggleCollapse") {
      setCollapsed(!isCollapsed);
    } else if (name === "toggleConfiguring") {
      setConfiguring(!isConfiguring);
      setSizeLimit(config.sizeLimit || 10);
      setWType(config.wType || "excerpt");
      setSizeLimit(config.sizeLimit || 10);
      setColor(config.color || "gray");
      setMoving(false);
    } else if (name === "refresh") {
      ttRss
        .getUpdatedContent(feed.id)
        .then(() => ttRss.getFeeds())
        .then((feeds) => {
          const idx = feeds.findIndex((e) => e.id === feed.id);
          if (idx < 0) {
            console.log("refresh: feed not found", feed);
            return;
          }
          updateFeed(feeds[idx]);
        });
    } else if (name === "size") {
      setSizeLimit(parseInt(data, 10));
    } else if (name === "wType") {
      setWType(data);
    } else if (name === "color") {
      setColor(data);
    } else if (name === "reset") {
      setSizeLimit(config.sizeLimit || 10);
      setWType(config.wType || "excerpt");
      setSizeLimit(config.sizeLimit || 10);
      setColor(config.color || "gray");
    } else if (name === "save") {
      updateConfig({
        id: feed.id,
        sizeLimit,
        wType,
        color,
      });
      setConfiguring(false);
    } else if (name === "remove") {
      updateConfig({ id: feed.id, remove: true });
      setConfiguring(false);
    } else if (name === "move") {
      move(feed.id, data);
    } else if (name === "startMoving") {
      setConfiguring(false);
      setMoving(!isMoving);
    } else if (name === "readAll") {
      const countNumber = rows.filter((e) => e.unread).length;
      let markAction = () => ttRss.markReadFeed(feed.id);
      if (countNumber === unread) {
        markAction = () => ttRss.markReadItems(rows.filter((e) => e.unread).map((e) => e.id));
      }
      markAction().then(() => {
        const newRows = [...rows];
        newRows.forEach((row) => {row.unread = false; });
        feed.unread = 0;
        updateFeed(feed);
        setRows(newRows);
      });
    }
  };
  const updateLink = (id) => {
    for (const row of rows) {
      if (row.id === id) {
        if (row.unread) {
          row.unread = false;
          if (unread > -1) {
            feed.unread = unread - 1;
            updateFeed(feed);
          }
          setRows(rows);
          break;
        }
      }
    }
  };

  return (
    <div className={`block rounded-lg border widget-${color} shadow-md lg:border-2`}>
      <WidgetHeader
        feed={feed}
        unread={unread}
        isCollapsed={isCollapsed}
        handleCommand={handleCommand}
      />
      {isConfiguring && (
        <WidgetConfig size={sizeLimit} wType={wType} color={color} handleCommand={handleCommand} />
      )}
      {isMoving && <WidgetMove handleCommand={handleCommand} />}
      <div className="bg-zinc-100 dark:bg-zinc-800">
        <div className={isCollapsed ? "hidden" : "box"}>
          {rows.length < 1 && <Loading />}
          {rows.length > 0 && (
            <ul className="px-1 lg:space-y-1 xl:p-2 xl:px-3">
              {rows.slice(0, sizeLimit).map((row) => (
                <WidgetLink key={row.id} row={row} wType={wType} updateLink={updateLink} />
              ))}
            </ul>
          )}
          {rows.length >= sizeLimit && (
            <WidgetPagination skip={skip} sizeLimit={sizeLimit} setSkip={setSkip} />
          )}
        </div>
      </div>
    </div>
  );
}
