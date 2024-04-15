import "../styles/profile.css";
import { Outlet, Navigate } from "react-router-dom";
import ProfileSidebar from "../components/profile/ProfileSidebar";
import { useProfile } from "../context/ProfileContext";
import { isAuthenticated, isAdmin } from "../utils/userFunctions";

/**
 * Renders the profile page.
 *
 * @returns {JSX.Element} The rendered profile page.
 */
const Profile = () => {
  // Check if the user is an admin based on accessToken
  const { user, accessToken } = useProfile();

  if (!isAuthenticated(accessToken) || isAdmin(user)) {
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
