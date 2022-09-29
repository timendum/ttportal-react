import React, { useState } from "react";
import { ttRss } from "../ttrss.js";

import Loading from "./loading";
import WidgetHeader from "./widgetHeader";
import WidgetLink from "./widgetLink";
import WidgetPagination from "./widgetPagination";

export default function Widget({ feed, sizeLimit, wType }) {
  const [isCollapsed, setCollapsed] = useState(false);
  const [isConfiguring, setConfiguring] = useState(false);
  const [skip, setSkip] = useState(0);
  const [rows, setRows] = useState([]);
  React.useEffect(() => {
    if (!isCollapsed) {
      ttRss.getContent(feed.id, sizeLimit, skip, false).then((rows) => {
        setRows(rows);
      });
    }
  }, [skip]);
  const handleHeaderCommand = (name, _) => {
    if (name === "toggleCollapse") {
      setCollapsed(!isCollapsed);
    } else if (name === "toggleConfiguring") {
      setConfiguring(!isConfiguring);
    } else if (name === "refresh") {
      ttRss
        .getUpdatedContent(feed.id)
        .then(() => ttRss.getContent(feed.id, sizeLimit, skip, false))
        .then((rows) => {
          console.log(rows);
          setRows(rows);
        });
    }
  };

  return (
    <div className="block border lg:border-2 border-slate-700 rounded-lg shadow-lg">
      <WidgetHeader feed={feed} isCollapsed={isCollapsed} handleCommand={handleHeaderCommand} />
      <div className={isCollapsed ? "hidden" : "box"}>
        {rows.length < 1 && <Loading />}
        <ul className="px-1 lg:p-2 lg:space-y-1">
          {rows.map((row) => {
            return <WidgetLink key={row.id} row={row} wType={wType} />;
          })}
        </ul>
        <WidgetPagination skip={skip} sizeLimit={sizeLimit} setSkip={setSkip} />
      </div>
    </div>
  );
}

Widget.defaultProps = {
  title: "",
  sizeLimit: 10,
  wType: "excerpt"
};
