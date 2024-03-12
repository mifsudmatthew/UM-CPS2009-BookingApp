import { useUser } from "../hooks/useUser"; 
import { useState , useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useToken } from "../hooks/useToken";
import logo from "../assets/racket.png";
import hamburger from "../assets/hamburger.png";

import "../styles/navbar.css";

function Navbar() {
  const [showNavbar, setShowNavbar] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const {accessToken} = useToken()
  const {user} = useUser();

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };
  // Effect to trigger refresh when user or access token changes
  useEffect(() => {
    console.log("useEffect triggered");
    setRefresh(prevRefresh => !prevRefresh); // Toggle refresh state to trigger re-render
  }, [user, accessToken]);

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
              {accessToken != "" ?(<>Balance: {user.balance}</>):(<></>)}
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
              {accessToken == ""? (
                <>
                  <li>
                    <NavLink to="/login">Login</NavLink>
                  </li>
                  <li>
                    <NavLink to="/register">Register</NavLink>
                  </li>
                </>
              ): (
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