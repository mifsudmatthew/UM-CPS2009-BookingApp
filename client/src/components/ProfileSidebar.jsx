import { useEffect } from "react";
import { NavLink, Navigate } from "react-router-dom";
import { defaultProfilePic } from "../components/Icons";

import { useAuth } from "../context/Auth";
import { useUser } from "../context/User";

function toRoot() {
  return <Navigate to="/" replace={true} />;
}

const ProfileSidebar = () => {
  const { token, setToken } = useAuth();
  const { user, setUser } = useUser();

  const logOut = () => {
    setToken("");
    setUser({});
    toRoot();
  };

  return (
    <aside className="sidebar">
      <div className="profile-picture">
        <img src={defaultProfilePic} alt="Profile" className="profile-image" />
      </div>
      <h3>Hello, {user.name ? user.name : "#Undefined#"}</h3>
      <nav>
        <ul>
          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li>
          <li>
            <NavLink to="/profile/bookings">Bookings</NavLink>
          </li>
          <li>
            <NavLink to="/profile/balance">Balance</NavLink>
          </li>
          <li>
            <NavLink to="/profile/topup">Top Up</NavLink>
          </li>
          <li>
            <NavLink to="/booking">Book Court</NavLink>
          </li>
          <li>
            <NavLink to="/profile/changepassword">Change Password</NavLink>
          </li>
          <li>
            <button onClick={logOut}>Log Out</button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default ProfileSidebar;
