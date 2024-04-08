import "../styles/profile.css";
import { Outlet, Navigate } from "react-router-dom";
import ProfileSidebar from "../components/ProfileSidebar";
import { useUser } from "../context/User";
import { useAuth } from "../context/Auth";

const Profile = () => {
  // Check if the user is an admin based on token
  const { user } = useUser();
  const { token } = useAuth();

  if (user.admin || token === "") {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div className="profile-container">
      <ProfileSidebar />
      <Outlet />
    </div>
  );
};

export default Profile;
