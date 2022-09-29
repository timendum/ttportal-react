import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsRotate,
  faGear,
  faXmarkCircle,
  faCaretUp,
  faCaretDown
} from "@fortawesome/free-solid-svg-icons";

export default function WidgetHeader({ isCollapsed, feed, handleCommand }) {
  return (
    <div className="flex gap-2 mx-2">
      <button
        onClick={() => {
          handleCommand("toggleCollapse");
        }}
      >
        <FontAwesomeIcon icon={isCollapsed ? faCaretUp : faCaretDown} />
      </button>
      <button>{feed.unread}</button>
      <h4 className="grow">{feed.title}</h4>
      <button
        onClick={() => {
          handleCommand("refresh");
        }}
      >
        <FontAwesomeIcon icon={faArrowsRotate} size="xs" />
      </button>
      <button
        onClick={() => {
          handleCommand("toggleConfiguring");
        }}
      >
        <FontAwesomeIcon icon={faGear} size="xs" />
      </button>
      <button>
        <FontAwesomeIcon icon={faXmarkCircle} size="xs" />
      </button>
    </div>
  );
}
