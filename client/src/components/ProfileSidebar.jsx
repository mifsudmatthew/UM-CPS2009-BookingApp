import defaultProfilePic from '../assets/default-pp.jpg';

const ProfileSidebar = () => {
    return (
      <aside className="sidebar">
      <div className="profile-picture">
              <img src={defaultProfilePic} alt="Profile" className="profile-image" />
            </div>
            <h3>Hello, Name!</h3>
        <nav>
          <ul>
            <li>Account</li>
            <li>Bookings</li>
            <li>Balance</li>
          </ul>
        </nav>
      </aside>
      )
}

export default ProfileSidebar;