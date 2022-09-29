import React from "react";

export default function WidgetConfig({ sizeLimit, wType, handleHeaderCommand }) {
  return (
    <form className="bg-slate-700 p-3">
      <div className="grid grid-cols-2 gap-x-4 gap-y-4 text-right">
        <label className="text-slate-200">Color:</label>
        <select>
          <option>Color</option>
        </select>
        <label className="text-right text-slate-200">Items to display: </label>
        <input type="number" defaultValue={sizeLimit} />
        <label className="text-right text-slate-200">Type: </label>
        <select>
          <option value="simple">Simple</option>
          <option value="excerpt">With excerpt</option>
        </select>
      </div>
    </form>
  );
}
