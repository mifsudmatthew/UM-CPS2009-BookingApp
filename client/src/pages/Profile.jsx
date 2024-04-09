import "../styles/profile.css";
import { Outlet, Navigate } from "react-router-dom";
import ProfileSidebar from "../components/ProfileSidebar";
import { useUser } from "../context/User";
import { useAuth } from "../context/Auth";
import { useEffect } from "react";

/**
 * Renders the profile page.
 *
 * @returns {JSX.Element} The rendered profile page.
 */
const Profile = () => {
  // Check if the user is an admin based on token
  const { user } = useUser(); // Get the user and setUser from the User context
  const { token } = useAuth(); // Get the token and setToken from the Auth context

  if (user.admin || token === "") {
    // Redirect to the home page if the user is an admin or not logged in
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
