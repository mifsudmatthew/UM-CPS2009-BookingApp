/* App.jsx
 * Main react page */

/* React imports */
import { Outlet } from "react-router-dom";

/* CSS */
import "./styles/app.css";

/* Components */
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import ReloadPrompt from "./ReloadPrompt";

// Main react app
function App() {
  return (
    <>
      <Navbar />
      <Outlet />
      <ReloadPrompt />
      <Footer />
    </>
  );
}

export default App;
