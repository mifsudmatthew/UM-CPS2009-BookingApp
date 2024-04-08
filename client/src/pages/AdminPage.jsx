import { Outlet, Navigate } from "react-router-dom";
import { AdminSidebar } from "../components/AdminSidebar";
import { useUser } from "../context/User";
import { useAuth } from "../context/Auth";
import "../styles/profile.css";

const AdminPage = () => {
  // Check if the user is an admin based on token
  const { user } = useUser();
  const { token } = useAuth();

  if (!user.admin || token === "") {
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
