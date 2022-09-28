import React from "react";

export default function WidgetHeader({ feeds, open, addWidget, skip }) {
  if (!open) {
    return <React.Fragment />;
  }
  const [feedId, setFeedId] = React.useState("");

  const handleChange = (event) => {
    setFeedId(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const id = data.get("feedId");
    console.log(id);
    addWidget(id);
  };
  return (
    <div className="fade fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto">
      <div className="h-screen w-1/2 mx-auto justify-center">
        <form onSubmit={handleSubmit}>
          <h4>Feed to be added</h4>
          <select
            onChange={handleChange}
            name="feedId"
            className="block
      w-full
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
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
          <button type="submit" disabled={feeds.length < 1 || feedId.length === 0}>
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
