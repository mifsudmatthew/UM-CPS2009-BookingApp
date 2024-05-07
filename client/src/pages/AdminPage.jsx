import "../styles/profile.css";

import { Outlet } from "react-router-dom";
import { AdminSidebar } from "../components/admin/AdminSidebar";
import Authenticated from "../components/shared/Authenticated.jsx";
import Admin from "../components/shared/Admin.jsx";

/**
 * Renders the admin page.
 *
 * @returns {JSX.Element} The rendered admin page.
 */
const AdminPage = () => {
  return (
    <Authenticated>
      <Admin>
        <div className="profile-container">
          <AdminSidebar />
          <Outlet />
        </div>
      </Admin>
    </Authenticated>
  );
};

export default AdminPage;
