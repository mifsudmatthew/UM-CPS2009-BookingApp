/**
 * @file App.jsx
 * @desc The main react app component.
 */

/* CSS */
import "react-toastify/dist/ReactToastify.css";
import "./styles/app.css";

/* React imports */
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

/* Components */
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import ReloadPrompt from "./ReloadPrompt";

// Main react app
function App() {
  return (
    <>
      <ToastContainer />
      <ReloadPrompt />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
