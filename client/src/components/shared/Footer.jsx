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
 * @category Front-end
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
        <div>Email: servespot@servspot.com</div>
        <div>Telephone: 123456789</div>
        <div>Address: Malta, Malta, MLT123</div>
      </div>
    </footer>
  );
}

export default Footer;
