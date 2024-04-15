import { Outlet, Navigate } from "react-router-dom";
import { AdminSidebar } from "../components/admin/AdminSidebar";
import { useProfile } from "../context/ProfileContext";
import { isAuthenticated, isAdmin } from "../utils/userFunctions";
import "../styles/profile.css";

/**
 * Renders the admin page.
 *
 * @returns {JSX.Element} The rendered admin page.
 */
const AdminPage = () => {
  // Check if the user is an admin based on accessToken
  const { user, accessToken } = useProfile();

  if (!isAdmin(user) || !isAuthenticated(accessToken)) {
    // Redirect to the home page if the user is not an admin
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div className="profile-container">
      <AdminSidebar />
      <Outlet />
    </div>
  );
};

export default AdminPage;
