import React, { useState } from "react";
import he from "he";

import { ttRss } from "../ttrss.js";

export default function WidgetLink({ row, wType }) {
  const [isRead, setRead] = useState(!row.unread);
  const excerpt = he.decode(row.excerpt);
  const markRead = () => {
    ttRss.markReadItem(row.id);
    setRead(true);
  };

  return (
    <li key={row.id}>
      <a
        href={row.link}
        target="_blank"
        className="article-link"
        title={excerpt}
        rel="noreferrer"
        onClick={!isRead ? markRead : undefined}
      >
        {row.title}
      </a>
      {wType === "excerpt" ? <div className="article-excerpt">{excerpt}</div> : undefined}
    </li>
  );
}
