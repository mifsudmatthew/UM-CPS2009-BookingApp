/**
 * @file Profile.jsx
 * @desc Renders the profile page component.
 */

import "../styles/profile.css";

import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";

import ProfileContext from "../context/ProfileContext";

import ProfileSidebar from "../components/profile/ProfileSidebar";

/**
 * Renders the profile page.
 * @category Front-end
 * @returns {JSX.Element} The rendered profile page.
 */
const Profile = () => {
  const { isAdmin, isAuthenticated } = useContext(ProfileContext);
  return (
    <>
      {isAuthenticated && !isAdmin ? (
        <div className="profile-container">
          <ProfileSidebar />
          <Outlet />
        </div>
      ) : (
        <Navigate to="/" replace={true} />
      )}
    </>
  );
};

export default Profile;
