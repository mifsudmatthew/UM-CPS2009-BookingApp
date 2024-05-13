import "../styles/profile.css";

import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";

import ProfileSidebar from "../components/profile/ProfileSidebar";

import ProfileContext from "../context/ProfileContext";

/**
 * Renders the profile page.
 * @category Front-end
 * @returns {JSX.Element} The rendered profile page.
 */
const Profile = () => {
  const { isAdmin, isAuthenticated } = useContext(ProfileContext);
  return (
    <>
      {isAuthenticated ? (
        <>
          {isAdmin ? (
            <Navigate to="/" replace={true} />
          ) : (
            <div className="profile-container">
              <ProfileSidebar />
              <Outlet />
            </div>
          )}
        </>
      ) : (
        <Navigate to="/" replace={true} />
      )}
    </>
  );
};

export default Profile;
