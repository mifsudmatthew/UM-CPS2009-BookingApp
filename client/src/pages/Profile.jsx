import "../styles/profile.css";
import { Outlet, Navigate } from "react-router-dom";
import ProfileSidebar from "../components/profile/ProfileSidebar";
import { useUser } from "../context/UserContext";
import { useAuth } from "../context/AuthContext";

const isAuthenticated = (accessToken) => {
  if (!accessToken) return false;

  return fetch("/api/authenticate", {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
  })
    .then((response) => {
      if (response.ok) {
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      return false;
    });
};

const isAdmin = (user) => {
  return user.isAdmin ? true : false;
};

/**
 * Renders the profile page.
 *
 * @returns {JSX.Element} The rendered profile page.
 */
const Profile = () => {
  // Check if the user is an admin based on accessToken
  const { user } = useUser(); // Get the user and setUser from the User context
  const { accessToken } = useAuth(); // Get the accessToken and updateToken from the Auth context
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
