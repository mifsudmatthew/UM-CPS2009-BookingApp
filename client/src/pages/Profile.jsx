import "react-toastify/dist/ReactToastify.css";
import "../styles/profile.css";
import { useMemo } from "react";
import { Outlet, Navigate } from "react-router-dom";
import ProfileSidebar from "../components/profile/ProfileSidebar";
import { useProfile } from "../context/ProfileContext";
import { isAdmin } from "../utils/userFunctions";
import Authenticated from "../components/shared/Authenticated.jsx";
import { ToastContainer } from "react-toastify";

/**
 * Renders the profile page.
 *
 * @returns {JSX.Element} The rendered profile page.
 */
const Profile = () => {
  const { user } = useProfile();

  useMemo(async () => {
    if (isAdmin(user)) {
      return <Navigate to="/" replace={true} />;
    }
  }, [user]);

  return (
    <Authenticated>
      <div className="profile-container">
        <ToastContainer />
        <ProfileSidebar />
        <Outlet />
      </div>
    </Authenticated>
  );
};

export default Profile;
