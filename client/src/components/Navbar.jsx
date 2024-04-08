import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { Bell, BellFill } from 'react-bootstrap-icons'; 
import NotificationContext from '../context/NavbarContext';
import NotificationPanel from '../components/NotificationPanel';

import "../styles/navbar.css";

import { hamburger, logo } from "../components/Icons";

import { useUser } from "../context/User";
import { useAuth } from "../context/Auth";

function Navbar() {
  const [showNavbar, setShowNavbar] = useState(false);
  const { notification } = useContext(NotificationContext);
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);

  const { token, setToken } = useAuth();
  const { user, setUser } = useUser();

  useEffect(() => {}, [token, user]);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const handleBellClick = () => {
    setShowNotificationPanel(!showNotificationPanel); 
  };

  return (
    <>
      <nav className="navbar">
        <div className="container">
          <div className="navbar-logo">
            <img src={logo} alt="logo" />
          </div>
          <div className="navbar-title">
            <NavLink to="/">ServeSpot</NavLink>
          </div>
          <div>
            <p className="navbar-balance">
              {token != "" ? <>Balance: {user.balance}</> :<></>}
            </p>
          </div>
          <div onClick={handleBellClick}>
            {token && (notification ? <BellFill /> : <Bell />)}
          </div>
          {showNotificationPanel && <NotificationPanel />} {/* Render notification panel */}
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
                  <li>
                    <NavLink to="/profile">Profile</NavLink>
                  </li>
                  <li>
                    <NavLink to="/profile/topup">Top Up</NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
