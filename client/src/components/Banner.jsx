import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/User";
import { useAuth } from "../context/Auth";

import "../styles/banner.css";

/**
 * Renders a banner component with a title, description, and a login button.
 *
 * @returns {JSX.Element} The Banner component.
 */
function Banner() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { token } = useAuth();
  const [buttonText, setButtonText] = useState("");

  // Set the button text based on the user's login status
  useEffect(() => {
    if (token === "") {
      // If the user is not logged in
      setButtonText("Login"); // Set the button text to "Login"
    } else if (!user.admin) {
      // If the user is logged in and not an admin
      setButtonText("Book a court"); // Set the button text to "Book a court"
    } else {
      // If the user is an admin
      setButtonText("Admin Panel"); // Set the button text to "Admin Panel"
    }
  }, [token, user.admin]);

  /**
   *
   * Redirects the user to the login page if they are not logged in.
   * If the user is logged in, redirects them to the booking page if they are not an admin.
   * If the user is an admin, redirects them to the admin page.
   */
  const toLogin = () => {
    if (token === "") {
      navigate("/login", { replace: true });
    } else if (!user.admin) {
      navigate("/booking", { replace: true });
    } else {
      navigate("/admin", { replace: true });
    }
  };

  return (
    <div className="background-container">
      <h2>Your best tennis game</h2>
      <p>Having the best equipment</p>
      <button className="login-button" onClick={toLogin}>
        {buttonText}
      </button>
    </div>
  );
}

export default Banner;
