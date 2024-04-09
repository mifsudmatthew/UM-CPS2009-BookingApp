import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import Popup from "reactjs-popup";
import { Wallet2, Bell, BellFill } from 'react-bootstrap-icons'; 
import NotificationContext from "../context/NavbarContext";
import NotificationPanel from "../components/NotificationPanel";

import "../styles/navbar.css";

import { money, hamburger, logo } from "../components/Icons";

import { useUser } from "../context/User";
import { useAuth } from "../context/Auth";

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
  const { token } = useAuth(); // Authentication hook for managing user token
  const { user } = useUser(); // User hook for managing user data

  useEffect(() => {
    // Effect to be triggered when token or user changes
    // Add any necessary logic here
  }, [token, user]);

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
        <div className="navbar-logo">
          <img src={logo} alt="logo" />
        </div>
        {(!user.admin && token !== "") ? (
            <div className="navbar-balance">
              <Wallet2 className="wallet"> : </Wallet2>
              {user.balance}
            </div>
          ) : null}
        <div className="navbar-title">
          <NavLink to="/">ServeSpot</NavLink>
        </div>
        <Popup // Add a popup to display the notification panel
          trigger={
            <div style={{ cursor: "pointer" }} onClick={handleBellClick}>
              {token && (notification ? <BellFill className="bell"/> : <Bell />)}
            </div>
          }
          position="right top"
          on="click">
          <NotificationPanel />
        </Popup>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <img src={hamburger} alt="hamburger" />
        </div>
        <div className={`nav-elements ${showNavbar ? "active" : ""}`}>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            {token == "" ? (
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
