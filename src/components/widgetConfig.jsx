import React from "react";

export default function WidgetConfig({ size, wType, handleCommand }) {
  const handleReset = (event) => {
    //event.preventDefault();
    handleCommand("reset");
  };
  const handleSave = (event) => {
    event.preventDefault();
    handleCommand("save");
  };
  return (
    <form className="bg-slate-700 p-3" onReset={handleReset} onSubmit={handleSave}>
      <div className="grid grid-cols-2 gap-x-4 gap-y-4 text-right">
        <label className="text-slate-200">Color:</label>
        <select>
          <option>Color</option>
        </select>
        <label className="text-right text-slate-200">Items to display: </label>
        <input
          className=" pl-1 dark:bg-zinc-800 dark:text-zinc-300"
          onChange={(e) => {
            handleCommand("size", e.currentTarget.value);
          }}
          type="number"
          defaultValue={size}
        />
        <label className="text-right text-slate-200">Type: </label>
        <select
          className=" px-1 dark:bg-zinc-800 dark:text-zinc-300"
          defaultValue={wType}
          onChange={(e) => {
            handleCommand("wType", e.currentTarget.value);
          }}
        >
          <option value="simple">Simple</option>
          <option value="excerpt">With excerpt</option>
        </select>
        <div className="col-span-2">
          <button className="btn-primary mx-2 bg-slate-500 px-1 md:px-2" type="reset">
            Reset
          </button>
          <button className="btn-primary mx-2 bg-slate-500 px-1 md:px-2" type="submit">
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
