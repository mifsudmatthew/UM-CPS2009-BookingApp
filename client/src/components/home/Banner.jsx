/**
 * Banner.jsx
 * Main Section containing tennis guy image
 * Contains a button that navigates the user to different pages depending on
 * if they are admin/logged in/not logged in
 */

import "../../styles/banner.css";

import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import ProfileContext from "../../context/ProfileContext";

/**
 * Renders a banner component with a title, description, and a login button.
 *
 * @returns {JSX.Element} The Banner component.
 */
function Banner() {
  const navigate = useNavigate();
  const { user, accessToken } = useContext(ProfileContext);

  /**
   *
   * Redirects the user to the login page if they are not logged in.
   * If the user is logged in, redirects them to the booking page if they are not an admin.
   * If the user is an admin, redirects them to the admin page.
   */
  const toLogin = () => {
    if (accessToken === "") {
      navigate("/login", { replace: true });
    } else if (!user.admin) {
      navigate("/profile/booking", { replace: true });
    } else {
      navigate("/admin", { replace: true });
    }
  };

  return (
    <div className="background-container">
      <div className="banner-title">Your best tennis game</div>
      <p>Having the best equipment</p>
      <button className="login-button" onClick={toLogin}>
        {/* Set the button text based on the user's login status */}
        {accessToken === ""
          ? // If the user is not logged in
            "Login"
          : user.admin
          ? // If the user is an admin
            "Admin Panel"
          : // If the user is logged in and not an admin
            "Book a court"}
      </button>
    </div>
  );
}

export default Banner;
