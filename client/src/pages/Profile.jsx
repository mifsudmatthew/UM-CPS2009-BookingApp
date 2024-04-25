import "../styles/profile.css";

import { Outlet, Navigate } from "react-router-dom";

import ProfileSidebar from "../components/profile/ProfileSidebar";
import Authenticated from "../components/shared/Authenticated.jsx";
import Admin from "../components/shared/Admin.jsx";

/**
 * Renders the profile page.
 *
 * @returns {JSX.Element} The rendered profile page.
 */
const Profile = () => {
  return (
    <Authenticated>
      <Admin fallback={<></>}>
        <Navigate to="/" replace={true} />
      </Admin>
      <div className="profile-container">
        <ProfileSidebar />
        <Outlet />
      </div>
    </Authenticated>
  );
};

export default Profile;
