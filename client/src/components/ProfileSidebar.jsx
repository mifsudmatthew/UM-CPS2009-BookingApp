import defaultProfilePic from '../assets/default-pp.jpg';
import { NavLink } from "react-router-dom";

const ProfileSidebar = () => {
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
          </ul>
        </nav>
      </aside>
      )
}

export default ProfileSidebar;