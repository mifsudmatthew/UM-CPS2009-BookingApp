/**
 * @file AdminPage.jsx
 * @desc Renders the admin page.
 */

import "../styles/profile.css";

import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";

import ProfileContext from "../context/ProfileContext.jsx";

import { AdminSidebar } from "../components/admin/AdminSidebar";

/**
 * Renders the admin page.
 * @category Front-end
 * @returns {JSX.Element} The rendered admin page.
 */
const AdminPage = () => {
  const { isAdmin, isAuthenticated } = useContext(ProfileContext);
  return (
    <>
      {isAuthenticated && isAdmin ? (
        <div className="profile-container">
          <AdminSidebar />
          <Outlet />
        </div>
      ) : (
        <Navigate to="/" replace={true} />
      )}
    </>
  );
};

export default AdminPage;
