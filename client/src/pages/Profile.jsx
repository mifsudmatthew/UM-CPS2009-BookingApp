import { useEffect } from "react";
import "../styles/profile.css";
import ProfileSidebar from "../components/ProfileSidebar";
import { Outlet, Navigate } from "react-router-dom";

import Auth from "../context/Auth";

const Profile = () => {
  const { useAuth } = Auth();
  const token = useAuth();

  useEffect(() => {}, [token]);
  if (token == "") {
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <div className="profile-container">
      <ProfileSidebar />
      <Outlet />
    </div>
  );
};

export default Profile;
