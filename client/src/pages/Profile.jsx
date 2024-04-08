import { useEffect } from "react";
import "../styles/profile.css";
import ProfileSidebar from "../components/ProfileSidebar";
import { Outlet, Navigate } from "react-router-dom";

import { useUser } from "../context/User";
import {useAuth} from "../context/Auth";

/**
 * Renders the profile page.
 *
 * @returns {JSX.Element} The rendered profile page.
 */
const Profile = () => {

    // Check if the user is an admin based on token
    const {user, setUser} = useUser(); // Get the user and setUser from the User context
    const { token, setToken } = useAuth(); // Get the token and setToken from the Auth context

    if (user.admin || token === "") { // Redirect to the home page if the user is an admin or not logged in
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
