/**
 * Footer.jsx
 */

import "../../styles/footer.css";

import { useContext } from "react";
import { Link } from "react-router-dom";

import ProfileContext from "../../context/ProfileContext";

import logo from "../../assets/logo.webp";

/**
 * Renders the footer component.
 *
 * @returns {JSX.Element} The rendered footer component.
 */
function Footer() {
  const { isAdmin, isAuthenticated } = useContext(ProfileContext); // Get the user and access token from the ProfileContext

  return (
    <footer className="footer">
      <div>
        <br />
        <div className="footer-content">
          <img src={logo} alt="Logo" />
        </div>
        <div className="footer-bottom">
          <h5>© 2024 ServeSpot</h5>
        </div>
      </div>
      <div>
        <nav>
          <div className="footer-heading">Links</div>
          <Link to="/">Home</Link>
          <br />
          {isAuthenticated ? (
            isAdmin ? (
              /*Otherwise display admin page */
              <Link to="/admin">Admin Panel</Link>
            ) : (
              /*Display profile page and topup page if authenticated but not admin*/
              <>
                <Link to="/profile">Profile</Link>
                <br />
                <Link to="/profile/topup">Topup</Link>
              </>
            )
          ) : (
            /*Display login page and register page if not authenticated*/
            <>
              <Link to="/login">Login</Link>
              <br />
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </div>
      <div>
        <div className="footer-heading">Contact Us</div>
        <h8>Email: servespot@servspot.com</h8>
        <br />
        <h8>Telephone: 123456789</h8>
        <br />
        <h8>Address: Malta, Malta, MLT123</h8>
      </div>
    </footer>
  );
}

export default Footer;
