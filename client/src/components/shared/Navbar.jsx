import { useState, useContext, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import Popup from "reactjs-popup";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import {
  Wallet2,
  Bell,
  BellFill,
  House,
  BoxArrowInRight,
  BoxArrowInLeft,
  PersonPlusFill,
  PersonFill,
  List,
  X,
  GearWideConnected,
} from "react-bootstrap-icons";
import NotificationPanel from "./NotificationPanel";

import NotificationContext from "../../context/NavbarContext";
import { useProfile } from "../../context/ProfileContext";

import { logo } from "../Icons";

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
  const { updateToken } = useProfile(); // Accesses authentication context
  const [open, setOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false); // State variable to store the visibility of the notification panel
  let logoutButtonState = false;
  let menuRef = useRef();
  let notifRef = useRef();

  const logOut = () => {
    if (logoutButtonState == false) {
      // Only allow logout to be pressed once.

      logoutButtonState = true;
      toast.success("Logged out successfully!"); // Displays a success message

      // Profile user validation requires change therefore updateToken and setUser should be taken out then.
      setTimeout(() => {
        updateToken(""); // Clears the authentication accessToken
      }, 2000);
    }
  };

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
      }
      if (!notifRef.current.contains(e.target)) {
        setNotificationOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);
  // State variables
  const [authenticated, setAuthenticated] = useState(false); // State variable to store the login status of the user
  const { notification } = useContext(NotificationContext); // Notification context for displaying notifications
  const [showNotificationPanel, setShowNotificationPanel] = useState(false); // Controls the visibility of the notification panel

  const { user, accessToken } = useProfile();

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
          <NavLink to="/profile/topup">
            <div className="navbar-balance">
              <Wallet2 className="wallet"> : </Wallet2>
              {user.balance !== undefined ? `€${user.balance.toFixed(2)}` : 0}
            </div>
          </NavLink>
        ) : (
          <></>
        )}

        {/* ---------------------- Bell ---------------------------- */}
        {/* <div className="navbar-bell">
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
        </div> */}

        <div className="navbar-bell" ref={notifRef}>
          <div
            className="hover-grow"
            onClick={() => {
              setNotificationOpen(!notificationOpen);
            }}
          >
            {notificationOpen ? (
              <X className="bell-icon menu-icon-img"></X>
            ) : (
              <Bell className="bell-icon bell-icon-img"></Bell>
            )}
          </div>
        </div>

        {/* ---------------------- Menu - icon ---------------------------- */}
        <div
          className="menu-icon"
          ref={menuRef}
          onClick={() => {
            setOpen(!open);
          }}
        >
          <div className="hover-grow menu-icon menu-icon-img">
            {open ? <X></X> : <List></List>}
          </div>
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
            <NavLink to="/">
              <li className="dropdownItem">
                <House className="dropdownItem-img"></House>
                <a className="dropdownItem-a"> Home</a>
              </li>
            </NavLink>
            {!authenticated ? (
              <>
                <NavLink to="/login">
                  <li className="dropdownItem">
                    <BoxArrowInRight className="dropdownItem-img"></BoxArrowInRight>
                    <a className="dropdownItem-a"> Login </a>
                  </li>
                </NavLink>
                <NavLink to="/register">
                  <li className="dropdownItem">
                    <PersonPlusFill className="dropdownItem-img"></PersonPlusFill>
                    <a className="dropdownItem-a"> Register </a>
                  </li>
                </NavLink>
              </>
            ) : (
              <>
                {!isAdmin(user) ? (
                  <>
                    <NavLink to="/profile">
                      <li className="dropdownItem">
                        <PersonFill className="dropdownItem-img"></PersonFill>
                        <a className="dropdownItem-a">Profile</a>
                      </li>
                    </NavLink>
                    <NavLink to="/profile/topup">
                      <li className="dropdownItem">
                        <Wallet2 className="dropdownItem-img"></Wallet2>
                        <a className="dropdownItem-a">Topup</a>
                      </li>
                    </NavLink>
                  </>
                ) : (
                  <NavLink to="/admin">
                    <li className="dropdownItem">
                      <GearWideConnected className="dropdownItem-img"></GearWideConnected>
                      <a className="dropdownItem-a">Admin Panel</a>
                    </li>
                  </NavLink>
                )}
                <li className="dropdownItem" onClick={logOut}>
                  <BoxArrowInLeft className="dropdownItem-img"></BoxArrowInLeft>
                  <a className="dropdownItem-a">Logout</a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
