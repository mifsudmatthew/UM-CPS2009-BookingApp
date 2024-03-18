import { NavLink, useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { defaultProfilePic } from "../components/Icons";

import Auth from "../context/Auth";

const ProfileSidebar = () => {
  const { setToken } = Auth();
  const navigate = useNavigate();
  const [name, setName] = useState(""); // Initialize name state

  const logOut = () => {
    setToken("");
    navigate("/");
  };

  useEffect(() => {
    // Function to safely parse JSON from localStorage
    const getUserData = () => {
      const userJson = localStorage.getItem('user');
      try {
        const user = JSON.parse(userJson);
        return user || {}; // Return an empty object if there is no user data
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        return {}; // Return an empty object in case of an error
      }
    };
    const userData = getUserData(); // Retrieve user data when component mounts

    if (userData.name) {
      setName(userData.name); // Set name if it exists in user data
    }
  }, []); // Empty dependency array to run only on mount

  return (
    <aside className="sidebar">
      <div className="profile-picture">
        <img src={defaultProfilePic} alt="Profile" className="profile-image" />
      </div>
      <h3>Hello, {name}</h3>
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
