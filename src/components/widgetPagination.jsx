import React from "react";

export default function WidgetPagination({ skip, sizeLimit, setSkip }) {
  const page = Math.floor(skip / sizeLimit) + 1;
  const handleChange = (event, toPage) => {
    setSkip((toPage - 1) * sizeLimit);
  };
  return (
    <nav>
      <p> Pagina  {page + 1} </p>
    </nav>
  );
}
