/**
 * @file Banner.jsx
 * @desc Main Section containing tennis image, title, description, and login button. Contains a button that navigates the user to different pages depending on if they are admin/logged in/not logged in.
 */

import "../../styles/banner.css";

import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import ProfileContext from "../../context/ProfileContext";

/**
 * Renders a banner component with a title, description, and a login button.
 * @category Front-end
 * @returns {JSX.Element} The Banner component.
 */
function Banner() {
  const navigate = useNavigate();
  const { isAdmin, isAuthenticated } = useContext(ProfileContext);

  /**
   *
   * Redirects the user to the login page if they are not logged in.
   * If the user is logged in, redirects them to the booking page if they are not an admin.
   * If the user is an admin, redirects them to the admin page.
   */
  const NavigationButton = () => {
    /* Set the button text based on the user's login status */
    if (isAuthenticated) {
      if (isAdmin) {
        return (
          <button
            className="login-button"
            onClick={() => navigate("/admin", { replace: true })}
          >
            Admin Panel
          </button>
        );
      } else {
        return (
          <button
            className="login-button"
            onClick={() => navigate("/profile/booking", { replace: true })}
          >
            Book a court
          </button>
        );
      }
    } else {
      return (
        <button
          className="login-button"
          onClick={() => navigate("/login", { replace: true })}
        >
          Login
        </button>
      );
    }
  };

  return (
    <div className="background-container">
      <div className="banner-title">Your best tennis game</div>
      <p>Having the best equipment</p>
      <NavigationButton />
    </div>
  );
}

export default Banner;
