import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <div className="container mx-auto px-4">
      <App />
    </div>
  </React.StrictMode>
);
