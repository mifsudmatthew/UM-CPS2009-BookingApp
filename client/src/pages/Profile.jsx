import "../styles/profile.css";
import ProfileSidebar from "../components/ProfileSidebar";
import { Outlet, Navigate } from "react-router-dom";

import { useAuth } from "../context/Authenication";

const Profile = () => {
  const auth = useAuth();

  if (auth == "") {
    setTimeout(1000);
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="profile-container">
      <ProfileSidebar />
      <Outlet />
    </div>
  );
};

export default Profile;
