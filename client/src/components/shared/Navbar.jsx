import { useState, useContext, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import Popup from "reactjs-popup";
import {
  Wallet2,
  Bell,
  BellFill,
  House,
  BoxArrowInRight,
  PersonPlusFill,
  PersonFill,
} from "react-bootstrap-icons";
import NotificationPanel from "./NotificationPanel";

import NotificationContext from "../../context/NavbarContext";
import { useProfile } from "../../context/ProfileContext";

import { hamburger, logo } from "../Icons";

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
  return user.admin ? true : false;
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
  const [open, setOpen] = useState(false);
  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);
  // State variables
  const [authenticated, setAuthenticated] = useState(false); // State variable to store the login status of the user
  const [showNavbar, setShowNavbar] = useState(false); // Controls the visibility of the navbar
  const { notification } = useContext(NotificationContext); // Notification context for displaying notifications
  const [showNotificationPanel, setShowNotificationPanel] = useState(false); // Controls the visibility of the notification panel

  const { user, accessToken } = useProfile();

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

  useEffect(() => {
    const authenticatedResult = async () => {
      setAuthenticated(await isAuthenticated(accessToken));
    };
    authenticatedResult();
  }, [accessToken, setAuthenticated]);
  // console.log(authenticated);
  // console.log(!isAdmin(user));
  // console.log(!isAdmin(user) && authenticated);
  return (
    <nav className="navbar">
      {/* ---------------------- Logo ------------------------------- */}
      <div className="navbar-logo">
        <img src={logo} alt="logo" />
      </div>

      {/* ---------------------- Title ------------------------------ */}
      <div className="navbar-title">
        <NavLink to="/">ServeSpot</NavLink>
      </div>

      <div className="navbar-right">
        {/* ---------------------- Balance ---------------------------- */}
        {!isAdmin(user) && authenticated ? (
          <div className="navbar-balance">
            <Wallet2 className="wallet"> : </Wallet2>
            {user.balance}
          </div>
        ) : (
          <></>
        )}

        {/* ---------------------- Bell ---------------------------- */}
        <div className="navbar-bell">
          <Popup // Add a popup to display the notification panel
            trigger={
              <div style={{ cursor: "pointer" }} onClick={handleBellClick}>
                {accessToken &&
                  (notification ? <BellFill className="bell" /> : <Bell />)}
              </div>
            }
            position="right top"
            on="click"
          >
            <NotificationPanel />
          </Popup>
        </div>
        {/* ---------------------- Menu - icon ---------------------------- */}
        <div className="menu-icon" ref={menuRef}>
          <img
            src={hamburger}
            alt="hamburger"
            onClick={() => {
              setOpen(!open);
            }}
          />
        </div>

        {/* <div className={`nav-elements ${showNavbar ? "active" : ""}`}>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            {!authenticated ? (
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
                {!isAdmin(user) && (
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
        </div> */}
        {/* <div className="menu-container" ref={menuRef}>
          <div
            className="menu-trigger"
            onClick={() => {
              setOpen(!open);
            }}
          >
            <img src={user}></img>
          </div> */}

        <div className={`dropdown-menu ${open ? "active" : "inactive"}`}>
          <ul>
            <li className="dropdownItem">
              <House className="dropdownItem-img"></House>
              <NavLink className="dropdownItem-a" to="/">
                Home
              </NavLink>
            </li>
            {!authenticated ? (
              <>
                <li className="dropdownItem">
                  <BoxArrowInRight className="dropdownItem-img"></BoxArrowInRight>
                  <NavLink className="dropdownItem-a" to="/login">
                    Login
                  </NavLink>
                </li>
                <li className="dropdownItem">
                  <PersonPlusFill className="dropdownItem-img"></PersonPlusFill>
                  <NavLink className="dropdownItem-a" to="/register">
                    Register
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                {!isAdmin(user) && (
                  <>
                    <li className="dropdownItem">
                      <PersonFill className="dropdownItem-img"></PersonFill>
                      <NavLink className="dropdownItem-a" to="/profile">
                        Profile
                      </NavLink>
                    </li>
                    <li className="dropdownItem">
                      <Wallet2 className="dropdownItem-img"></Wallet2>
                      <NavLink className="dropdownItem-a" to="profile/topup">
                        Topup
                      </NavLink>
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
