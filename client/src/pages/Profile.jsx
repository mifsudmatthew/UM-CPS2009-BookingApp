import "../styles/profile.css";
import ProfileSidebar from "../components/ProfileSidebar";
import { Outlet, useNavigate } from "react-router-dom";

import Auth from "../context/Auth";

const Profile = () => {
  const navigate = useNavigate();
  const { useAuth } = Auth();
  const auth = useAuth();

  console.log(`Auth: '${auth}'`);

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
