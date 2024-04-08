import { useEffect } from "react";
import "../styles/profile.css";
import ProfileSidebar from "../components/ProfileSidebar";
import { Outlet, Navigate } from "react-router-dom";

import { useUser } from "../context/User";
import {useAuth} from "../context/Auth";

const Profile = () => {

    // Check if the user is an admin based on token
    const {user, setUser} = useUser();
    const { token, setToken } = useAuth();

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
