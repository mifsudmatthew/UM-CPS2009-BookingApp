/* App.jsx
 * Main react page */

/* React imports */
import { Outlet } from "react-router-dom";

/* CSS */
import "./styles/app.css";

/* Components */
import Navbar from "./components/Navbar";

// Main react app
function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
