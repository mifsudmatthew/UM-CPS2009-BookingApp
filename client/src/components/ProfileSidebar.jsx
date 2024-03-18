import { NavLink, useNavigate } from "react-router-dom";

import { defaultProfilePic } from "../components/Icons";

import { useToken } from "../hooks/useToken";

const ProfileSidebar = () => {
  const { setAccessToken } = useToken();
  const navigate = useNavigate();

  const logOut = () => {
    setAccessToken("");
    navigate("/");
  };

  return (
    <aside className="sidebar">
      <div className="profile-picture">
        <img src={defaultProfilePic} alt="Profile" className="profile-image" />
      </div>
      <h3>Hello, Name!</h3>
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
