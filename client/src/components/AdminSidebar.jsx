import { NavLink } from "react-router-dom";

export const AdminSidebar = () =>  {
    
    return (
        <aside className="sidebar">
        <h3>Admin Panel</h3>
        <nav>
            <ul>
            <li>
                <NavLink to="/profile">Profile</NavLink>
            </li>
            <li>
                <NavLink to="/admin/updatecourts">Update Courts</NavLink>
            </li>
            <li>
                <NavLink to="/admin/addnewcourt">Add New Court</NavLink>
            </li>
            <li>
                <NavLink to="/admin/statistics">View Statistics</NavLink>
            </li>
            </ul>
        </nav>
        </aside>
    );
    }