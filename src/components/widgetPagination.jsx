import React from "react";

export default function WidgetPagination({ skip, sizeLimit, setSkip }) {
  const page = Math.floor(skip / sizeLimit) + 1;
  const handleChange = (toPage) => {
    setSkip((toPage - 1) * sizeLimit);
  };
  function makeButton(disabled, selected, newPage) {
    let text = String(newPage);
    if (newPage === 0) {
      text = "<";
      newPage = page - 1;
    } else if (newPage === -1) {
      text = ">";
      newPage = page + 1;
    }
    let classes = "px-2 rounded-full w-max";
    if (selected) {
      classes += " border bg-teal-500 border-teal-500";
    }
    return (
      <li key={text + String(newPage)}>
        <button className={classes} disabled={disabled} onClick={() => handleChange(newPage)}>
          {text}
        </button>
      </li>
    );
  }
  return (
    <nav>
      <ul className="px-3 pb-2 flex flex-row gap-3">
        {makeButton(page === 1, false, 0)}
        {page > 1 && makeButton(false, false, 1)}
        {page > 5 && makeButton(true, false, "…")}
        {[page - 3, page - 2, page - 1]
          .filter((e) => e > 1)
          .map((e) => makeButton(false, false, e))}
        {makeButton(true, true, page)}
        {[page + 1, page + 2].map((e) => makeButton(false, false, e))}
        {makeButton(false, false, -1)}
      </ul>
    </nav>
  );
}
