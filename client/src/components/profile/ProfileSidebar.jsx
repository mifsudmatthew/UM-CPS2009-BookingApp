import { NavLink, useNavigate } from "react-router-dom";
import { defaultProfilePic } from "../Icons";

import { useAuth } from "../../context/AuthContext";
import { useUser } from "../../context/UserContext";
import InputButton from "../form//InputButton";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

// function toRoot() {
//   return <Navigate to="/" replace={true} />;
// }

/**
 * Renders the profile sidebar component.
 * This component displays the user's profile picture, name, and navigation links.
 * It also provides a log out button to log the user out of the application.
 *
 * @returns {JSX.Element} The profile sidebar component.
 */
const ProfileSidebar = () => {
  const { updateToken } = useAuth(); // Accesses authentication context
  const { user, setUser } = useUser(); // Accesses user context
  const navigate = useNavigate(); // Navigation hook
  /**
   * Logs the user out by clearing the accessToken and user data,
   * and redirects the user to the root page.
   */
  const logOut = () => {
    toast.success("Logged out successfully!"); // Displays a success message

    // Profile user validation requires change therefore updateToken and setUser should be taken out then.
    setTimeout(() => {
      updateToken(""); // Clears the authentication accessToken
      setUser({}); // Clears the user data
      // navigate("/", { replace: true }); // Redirects the user to the root page
    }, 2000);
  };

  return (
    <aside className="sidebar">
      <ToastContainer />
      <div className="profile-picture">
        <img src={defaultProfilePic} alt="Profile" className="profile-image" />
      </div>
      <h3>Hello, {user.name ? user.name : "#Undefined#"}</h3>{" "}
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
            <NavLink to="/booking">Book Court</NavLink>{" "}
            {/* Navigation link to the court booking page */}
          </li>
          <li>
            <NavLink to="/profile/changepassword">Change Password</NavLink>{" "}
            {/* Navigation link to the change password page */}
          </li>
          <li>
            <InputButton
              onClick={logOut}
              label="Log Out"
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
