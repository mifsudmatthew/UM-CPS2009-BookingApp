import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import Popup from "reactjs-popup";
import { Wallet2, Bell, BellFill } from "react-bootstrap-icons";
import NotificationPanel from "./NotificationPanel";

import NotificationContext from "../../context/NavbarContext";
import { useUser } from "../../context/UserContext";
import { useAuth } from "../../context/AuthContext";

import { money, hamburger, logo } from "../Icons";

import "../../styles/navbar.css";

const isAuthenticated = (accessToken) => {
  if (!accessToken) return false;

  return fetch("/api/authenticate", {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
  })
    .then((response) => {
      if (response.ok) {
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      return false;
    });
};

const isAdmin = (user) => {
  if (!user) return false;
  return user.isAdmin ? true : false;
};

/**
 * Renders the navigation bar component.
 * Navbar component represents the navigation bar of the application.
 * It displays the logo, title, user balance, notification bell, and menu icon.
 * It also handles the show/hide functionality of the navbar, notification panel, and menu elements.
 *
 * @returns {JSX.Element} The rendered navigation bar.
 */
function Navbar() {
  // State variables
  const [showNavbar, setShowNavbar] = useState(false); // Controls the visibility of the navbar
  const { notification } = useContext(NotificationContext); // Notification context for displaying notifications
  const [showNotificationPanel, setShowNotificationPanel] = useState(false); // Controls the visibility of the notification panel

  // Custom hooks
  const { accessToken } = useAuth(); // Authentication hook for managing user accessToken
  const { user } = useUser(); // User hook for managing user data

  /**
   * Toggles the visibility of the navbar.
   */
  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  /**
   * Toggles the visibility of the notification panel.
   */
  const handleBellClick = () => {
    setShowNotificationPanel(!showNotificationPanel);
  };

  return (
    <nav className="navbar">
      <div className="container">
        {/* ---------------------- Logo ------------------------------- */}
        <div className="navbar-logo">
          <img src={logo} alt="logo" />
        </div>

        {/* ---------------------- Title ------------------------------ */}
        <div className="navbar-title">
          <NavLink to="/">ServeSpot</NavLink>
        </div>

        {/* ---------------------- Balance ---------------------------- */}
        {isAdmin(user.admin) && isAuthenticated(accessToken) ? (
          <div className="navbar-balance">
            <Wallet2 className="wallet"> : </Wallet2>
            {user.balance}
          </div>
        ) : null}

        {/* ---------------------- Bell ---------------------------- */}
        <Popup // Add a popup to display the notification panel
          trigger={
            <div style={{ cursor: "pointer" }} onClick={handleBellClick}>
              {accessToken &&
                (notification ? <BellFill className="bell" /> : <Bell />)}
            </div>
          }
          position="right top"
          on="click">
          <NotificationPanel />
        </Popup>

        {/* ---------------------- Menu - icon ---------------------------- */}
        <div className="menu-icon" onClick={handleShowNavbar}>
          <img src={hamburger} alt="hamburger" />
        </div>

        <div className={`nav-elements ${showNavbar ? "active" : ""}`}>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            {accessToken == "" ? (
              <>
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
                <li>
                  <NavLink to="/register">Register</NavLink>
                </li>
              </>
            ) : (
              <>
                {!user.admin && (
                  <>
                    <li>
                      <NavLink to="/profile">Profile</NavLink>
                    </li>
                    <li>
                      <NavLink to="/profile/topup">Top Up</NavLink>
                    </li>
                  </>
                )}
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
