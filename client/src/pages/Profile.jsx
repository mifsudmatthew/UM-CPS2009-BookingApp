import '../styles/profile.css'; 
import ProfileSidebar  from '../components/ProfileSidebar';
import AccountDetails  from '../components/AccountDetails';

const Profile = () => {
  return (
    <div className="profile-container">
      <ProfileSidebar />
      <AccountDetails />
    </div>
  );
};

export default Profile;
