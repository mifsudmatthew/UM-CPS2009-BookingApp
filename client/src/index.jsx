/**
 * @file index.jsx
 * @desc Entry point into react application and root of all react components
 */

/* React commonents to render */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
/* Main CSS and React entry point (App) */
import "./styles/index.css";
import AppContainer from "./AppContainer.jsx";

// Modifies div with root id in index.html
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AppContainer />
    </BrowserRouter>
  </StrictMode>
);
