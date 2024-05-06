/**
 * ProfileSidebar.jsx
 * Left bar that holds links to all profile
 */

import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

import { useProfile } from "../../context/ProfileContext";
import { useNotifications } from "../../context/NotificationContext";

import InputButton from "../form//InputButton";

import profilePicture from "../../assets/default-pp.jpg";

/**
 * Renders the profile sidebar component.
 * This component displays the user's profile picture, name, and navigation links.
 * It also provides a log out button to log the user out of the application.
 *
 * @returns {JSX.Element} The profile sidebar component.
 */
const ProfileSidebar = () => {
  const { user, logout } = useProfile(); // Accesses authentication context
  const { clearNotifications } = useNotifications();
  /**
   * Logs the user out by clearing the accessToken and user data,
   * and redirects the user to the root page.
   */
  const logOut = () => {
    toast.success("Logged out successfully!"); // Displays a success message
    clearNotifications();
    logout();
  };

  return (
    <aside className="sidebar">
      <div className="profile-picture">
        <img src={profilePicture} alt="Profile" className="profile-image" />
      </div>
      <h3>Hello, {user.name ? user.name : "#Undefined#"}</h3>
      {/* Displays the user's name or a placeholder if it's undefined */}
      <nav>
        <ul>
          <li>
            <NavLink to="/profile">Profile</NavLink>{" "}
            {/* Navigation link to the user's profile page */}
          </li>
          <li>
            <NavLink to="/profile/bookings">Bookings</NavLink>{" "}
            {/* Navigation link to the user's bookings page */}
          </li>
          <li>
            <NavLink to="/profile/topup">Top Up</NavLink>{" "}
            {/* Navigation link to the top-up page */}
          </li>
          <li>
            <NavLink to="/profile/booking">Book Court</NavLink>{" "}
            {/* Navigation link to the court booking page */}
          </li>
          <li>
            <NavLink to="/profile/changepassword">Change Password</NavLink>{" "}
            {/* Navigation link to the change password page */}
          </li>
          <li>
            <InputButton
              onClick={logOut}
              label="Logout"
              classname={"logoutBtn"}
            />
            {/* Log out button */}
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default ProfileSidebar;
