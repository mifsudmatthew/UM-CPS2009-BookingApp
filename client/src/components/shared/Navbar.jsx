/**
 * Navbar.jsx
 */

import "../../styles/navbar.css";

import { useState, useEffect, useContext, useRef } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

import ProfileContext from "../../context/ProfileContext";
import NotificationContext from "../../context/NotificationContext";

import { logo } from "../Icons";
import {
  Wallet2,
  Bell,
  House,
  BoxArrowInRight,
  BoxArrowInLeft,
  PersonPlusFill,
  PersonFill,
  List,
  X,
  GearWideConnected,
} from "react-bootstrap-icons";

/**
 * Renders the navigation bar component.
 * Navbar component represents the navigation bar of the application.
 * It displays the logo, title, user balance, notification bell, and menu icon.
 * It also handles the show/hide functionality of the navbar, notification panel, and menu elements.
 * @category Front-end
 * @returns {JSX.Element} The rendered navigation bar.
 */
function Navbar() {
  // Accesses authentication context and get the user and access token from the ProfileContext
  const { user, logout, isAdmin, isAuthenticated } = useContext(ProfileContext);
  // Accesses the stored notifications
  const { notifications, clearNotifications } = useContext(NotificationContext);

  // State variable to store the visibility of the menu
  const [open, setOpen] = useState(false);
  // State variable to store the visibility of the notification panel
  const [notificationOpen, setNotificationOpen] = useState(false);

  // State variable to store the logout button state
  const [clickedLogout, setClickedLogout] = useState(false);

  let menuRef = useRef(); // Reference to the navigation menu element
  let notifRef = useRef(); // Reference to the notification menu element

  // Function to log out the user
  const logOut = () => {
    if (!clickedLogout) {
      setClickedLogout(true); // To prevent multiple clicks

      toast.success("Logged out successfully!"); // Displays a success message
      // Clear the 'notifications' array
      clearNotifications();
      // Profile user validation requires change therefore updateToken and setUser should be taken out then.
      logout();

      setClickedLogout(false); // Reset the state variable
    }
  };

  // Function to handle the bell click (adding listeners only once, when component mounts)
  useEffect(() => {
    // Event listener to close the menu when clicked outside
    let handler = (e) => {
      // Close the navigation menu if the click is outside the menu
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
      }
      // Close the notification menu if the click is outside the menu
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotificationOpen(false);
      }
    };

    // Add the event listener when the component mounts
    document.addEventListener("mousedown", handler);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <nav className="navbar">
      {/* ---------------------- Logo ------------------------------- */}
      <div className="navbar-logo">
        <NavLink to="/">
          <img src={logo} alt="logo" />
        </NavLink>
      </div>

      {/* ---------------------- Title ------------------------------ */}
      <div className="navbar-title">
        <NavLink to="/">ServeSpot</NavLink>
      </div>

      <div className="navbar-right">
        {/* ---------------------- Balance ---------------------------- */}
        {!isAdmin && isAuthenticated && (
          <NavLink style={{ padding: "10px" }} to="/profile/topup">
            <div className="navbar-balance">
              <Wallet2 className="wallet"> : </Wallet2>
              {user.balance !== undefined ? `€${user.balance.toFixed(2)}` : 0}
            </div>
          </NavLink>
        )}

        {/* ---------------------- Notification Bell ---------------------------- */}
        {!isAdmin && isAuthenticated && (
          <div className="bellWidth">
            <div className="navbar-bell" ref={notifRef}>
              <div
                className="hover-grow"
                onClick={() => {
                  setNotificationOpen(!notificationOpen);
                }}
              >
                {notificationOpen ? (
                  <X
                    className="bell-icon menu-icon-img"
                    style={{ marginTop: "10px" }}
                  ></X>
                ) : (
                  <Bell
                    className="bell-icon bell-icon-img"
                    style={{ marginTop: "15px" }}
                  ></Bell>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ---------------------- Navigation Menu - Icon ---------------------------- */}
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

        {/* ---------------------- Notification - Menu ---------------------------- */}
        <div
          className={`notification-menu ${
            notificationOpen ? "active" : "inactive"
          }`}
        >
          <ul className="notificationList">
            {notifications.map((notification, index) => (
              <li className="dropdownItem" key={index}>
                <span className="dropdownItem-notification">
                  {notification.text}
                  <br></br>
                  {notification.time}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className={`dropdown-menu ${open ? "active" : "inactive"}`}>
          <ul>
            <NavLink to="/">
              <li className="dropdownItem">
                <House className="dropdownItem-img"></House>
                <a className="dropdownItem-a"> Home</a>
              </li>
            </NavLink>
            {/* Displaying login and register hyperlinks if user not authenticated */}
            {!isAuthenticated ? (
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
                {/* Displaying profile and topup hyperlinks if authenticated but not admin */}
                {!isAdmin ? (
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
                  /* Display admin panel hyperlink if user is admin */
                  <NavLink to="/admin">
                    <li className="dropdownItem">
                      <GearWideConnected className="dropdownItem-img"></GearWideConnected>
                      <a className="dropdownItem-a">Admin Panel</a>
                    </li>
                  </NavLink>
                )}
                {/* Displaying logout hyperlink if authenticated */}
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
