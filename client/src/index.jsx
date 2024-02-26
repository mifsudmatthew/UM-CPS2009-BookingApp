/* index.jsx
 * Entry point into react application
 * (Acts as the root of all javascript) */

/* React commonents to render */
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
/* Main CSS and React entry point (App) */
import App from "./App.jsx";
import "./styles/index.css";

// Modifies div with root id in index.html
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
