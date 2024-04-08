import { useEffect } from "react";
import "../styles/profile.css";
import ProfileSidebar from "../components/ProfileSidebar";
import { Outlet, Navigate } from "react-router-dom";

import { useAuth } from "../context/Auth";

const Profile = () => {
  const { token, setToken } = useAuth();

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
