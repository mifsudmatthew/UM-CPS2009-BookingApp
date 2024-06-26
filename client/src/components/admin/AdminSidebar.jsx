/**
 * @file AdminSidebar.jsx
 * @desc Admin sidebar component.
 */

import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

import ProfileContext from "../../context/ProfileContext";

import InputButton from "../form//InputButton";

/**
 * Renders the admin sidebar component.
 * @category Front-end
 * @returns {JSX.Element} The admin sidebar component.
 */
export const AdminSidebar = () => {
  const { logout } = useContext(ProfileContext); // Accesses authentication context

  /**
   * Logs the user out by clearing the accessToken and user data,
   * and redirects the user to the root page.
   */
  const logOut = () => {
    toast.success("Logged out successfully!"); // Displays a success message

    // Profile user validation requires change therefore updateToken and setUser should be taken out then.
    logout(); // Clears the authentication accessToken
  };

  return (
    <aside className="sidebar">
      <h3>Admin Panel</h3>
      <nav>
        <ul>
          <li>
            <NavLink to="/admin/statistics">Statistics</NavLink>
          </li>
          <li>
            <NavLink to="/admin/updatecourts">Update Courts</NavLink>
          </li>
          <li>
            <NavLink to="/admin/addnewcourt">Add New Court</NavLink>
          </li>
          <li>
            {/* Log out button */}
            <InputButton
              onClick={logOut}
              label="Log Out"
              classname={"logoutBtn"}
            />
          </li>
        </ul>
      </nav>
    </aside>
  );
};
