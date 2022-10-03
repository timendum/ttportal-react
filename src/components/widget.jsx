import React, { useState } from "react";
import { ttRss } from "../ttrss.js";

import Loading from "./loading";
import WidgetHeader from "./widgetHeader";
import WidgetConfig from "./widgetConfig";
import WidgetLink from "./widgetLink";
import WidgetPagination from "./widgetPagination";

export default function Widget({ feed, config, updateConfig }) {
  const [isCollapsed, setCollapsed] = useState(false);
  const [isConfiguring, setConfiguring] = useState(false);
  const [sizeLimit, setSizeLimit] = useState(config.sizeLimit || 10);
  const [wType, setWType] = useState(config.wType || "excerpt");
  const [skip, setSkip] = useState(0);
  const [rows, setRows] = useState([]);
  React.useEffect(() => {
    if (!isCollapsed) {
      ttRss.getContent(feed.id, sizeLimit, skip, false).then((rows) => {
        setRows(rows);
      });
    }
  }, [skip]);
  React.useEffect(() => {
    if (!isCollapsed) {
      if (rows.length < sizeLimit) {
        ttRss.getContent(feed.id, sizeLimit, skip, false).then((rows) => {
          setRows(rows);
        });
      }
    }
  }, [sizeLimit]);
  const handleCommand = (name, data) => {
    if (name === "toggleCollapse") {
      setCollapsed(!isCollapsed);
    } else if (name === "toggleConfiguring") {
      setConfiguring(!isConfiguring);
    } else if (name === "refresh") {
      ttRss
        .getUpdatedContent(feed.id)
        .then(() => ttRss.getContent(feed.id, sizeLimit, skip, false))
        .then((rows) => {
          setRows(rows);
        });
    } else if (name === "size") {
      setSizeLimit(parseInt(data, 10));
    } else if (name === "wType") {
      setWType(data);
    } else if (name === "reset") {
      setSizeLimit(config.sizeLimit || 10);
      setWType(config.wType || "excerpt");
    } else if (name === "save") {
      updateConfig({ id: feed.id, sizeLimit, wType });
      setConfiguring(false);
    } else if (name === "remove") {
      updateConfig({ id: feed.id, remove: true });
      setConfiguring(false);
    }
  };

  return (
    <div className="block rounded-lg border border-slate-700 shadow-md shadow-slate-500 dark:shadow-slate-800 lg:border-2">
      <WidgetHeader feed={feed} isCollapsed={isCollapsed} handleCommand={handleCommand} />
      {isConfiguring && (
        <WidgetConfig size={sizeLimit} wType={wType} handleCommand={handleCommand} />
      )}
      <div
        className={"border-t border-slate-700 dark:bg-zinc-800 " + (isCollapsed ? "hidden" : "box")}
      >
        {rows.length < 1 && <Loading />}
        {rows.length > 0 && (
          <ul className="px-1 lg:space-y-1 xl:p-2 xl:px-3">
            {rows.slice(0, sizeLimit).map((row) => {
              return <WidgetLink key={row.id} row={row} wType={wType} />;
            })}
          </ul>
        )}
        {rows.length >= sizeLimit && (
          <WidgetPagination skip={skip} sizeLimit={sizeLimit} setSkip={setSkip} />
        )}
      </div>
    </div>
  );
}
