import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import "../styles/navbar.css";

import { hamburger, logo } from "../components/Icons";

import { useUser } from "../context/User";
import { useAuth } from "../context/Auth";

function Navbar() {
  const [showNavbar, setShowNavbar] = useState(false);

  const { token, setToken } = useAuth();
  const { user, setUser } = useUser();

  useEffect(() => {}, [token, user]);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
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
            <ul className="navbar-balance">
              {token != "" ? <>Balance: {user.balance}</> : <></>}
            </ul>
          </div>
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
