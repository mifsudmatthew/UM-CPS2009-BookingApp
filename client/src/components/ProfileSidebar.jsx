import { useEffect } from "react";
import { NavLink, Navigate } from "react-router-dom";
import { defaultProfilePic } from "../components/Icons";

import { useAuth } from "../context/Auth";
import { useUser } from "../context/User";

function toRoot() {
  return <Navigate to="/" replace={true} />;
}

/**
 * Renders the profile sidebar component.
 * This component displays the user's profile picture, name, and navigation links.
 * It also provides a log out button to log the user out of the application.
 *
 * @returns {JSX.Element} The profile sidebar component.
 */
const ProfileSidebar = () => {
  const { token, setToken } = useAuth(); // Accesses authentication context
  const { user, setUser } = useUser(); // Accesses user context

  /**
   * Logs the user out by clearing the token and user data,
   * and redirects the user to the root page.
   */
  const logOut = () => {
    setToken(""); // Clears the authentication token
    setUser({}); // Clears the user data
    toRoot(); // Redirects the user to the root page
  };

  return (
    <aside className="sidebar">
      <div className="profile-picture">
        <img src={defaultProfilePic} alt="Profile" className="profile-image" />
      </div>
      <h3>Hello, {user.name ? user.name : "#Undefined#"}</h3> {/* Displays the user's name or a placeholder if it's undefined */}
      <nav>
        <ul>
          <li>
            <NavLink to="/profile">Profile</NavLink> {/* Navigation link to the user's profile page */}
          </li>
          <li>
            <NavLink to="/profile/bookings">Bookings</NavLink> {/* Navigation link to the user's bookings page */}
          </li>
          <li>
            <NavLink to="/profile/balance">Balance</NavLink> {/* Navigation link to the user's balance page */}
          </li>
          <li>
            <NavLink to="/profile/topup">Top Up</NavLink> {/* Navigation link to the top-up page */}
          </li>
          <li>
            <NavLink to="/booking">Book Court</NavLink> {/* Navigation link to the court booking page */}
          </li>
          <li>
            <NavLink to="/profile/changepassword">Change Password</NavLink> {/* Navigation link to the change password page */}
          </li>
          <li>
            <button onClick={logOut}>Log Out</button> {/* Log out button */}
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default ProfileSidebar;