import { NavLink } from "react-router-dom";

/**
 * Renders the admin sidebar component.
 * @returns {JSX.Element} The admin sidebar component.
 */
export const AdminSidebar = () => {
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
        </ul>
      </nav>
    </aside>
  );
};
