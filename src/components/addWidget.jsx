import React from "react";

export default function WidgetHeader({ feeds, open, addWidget, skip }) {
  if (!open) {
    return <React.Fragment />;
  }
  const ref = React.useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const id = data.get("feedId");
    console.log(id);
    addWidget(id);
  };
  return (
    <div
      onClick={(event) => {
        if (open && ref.current && !ref.current.contains(event.target)) {
          addWidget(null);
        }
      }}
      className="bg-neutral-600/50 fade fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto"
    >
      <div ref={ref} className="w-1/2 mx-auto mt-20 justify-center bg-white p-4 rounded-xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h4 className="text-lg">Feed to be added:</h4>
          <select
            name="feedId"
            className="block
      w-full
      px-3
      py-1.5
      border border-solid border-gray-300
      rounded
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          >
            {feeds
              .filter((feed) => skip.indexOf(String(feed.id)) == -1)
              .map((feed) => {
                return (
                  <option key={feed.id} value={feed.id}>
                    {feed.title}
                  </option>
                );
              })}
          </select>
          <button
            className="px-7 py-3 bg-blue-600 text-white text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
            type="submit"
            disabled={feeds.length < 1}
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
