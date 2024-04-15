import { Outlet, Navigate } from "react-router-dom";
import { AdminSidebar } from "../components/admin/AdminSidebar";
import { useUser } from "../context/UserContext";
import { useAuth } from "../context/AuthContext";
import "../styles/profile.css";

/**
 * Renders the admin page.
 *
 * @returns {JSX.Element} The rendered admin page.
 */
const AdminPage = () => {
  // Check if the user is an admin based on accessToken
  const { user } = useUser();
  const { accessToken } = useAuth();

  if (!user.admin || accessToken === "") {
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
