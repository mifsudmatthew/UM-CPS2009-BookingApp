/* index.jsx
 * Entry point into react application
 * (Acts as the root of all javascript) */

/* React commonents to render */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
/* Main CSS and React entry point (App) */
import AppContainer from "./AppContainer.jsx";
import "./styles/index.css";

// Modifies div with root id in index.html
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AppContainer />
    </BrowserRouter>
  </StrictMode>
);
