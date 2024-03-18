import "../styles/profile.css";
import ProfileSidebar from "../components/ProfileSidebar";
import { Outlet, useNavigate } from "react-router-dom";

import { useAuth } from "../context/Auth";

const Profile = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  if (auth == "") {
    navigate("/login");
  }

  return (
    <div className="profile-container">
      <ProfileSidebar />
      <Outlet />
    </div>
  );
};

export default Profile;
