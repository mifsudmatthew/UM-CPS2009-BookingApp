import '../styles/profile.css'; 
import ProfileSidebar  from '../components/ProfileSidebar';
import AccountDetails  from '../components/AccountDetails';
import Bookings  from '../components/Bookings';
import Balance  from '../components/Balance';
import { Routes, Route } from "react-router-dom";

const Profile = () => {
  return (
    <div className="profile-container">
      <ProfileSidebar />
       <Routes>
        <Route path="/" element={<AccountDetails />}></Route>
        <Route path="/bookings" element={<Bookings />}></Route>
        <Route path="/balance" element={<Balance />}></Route>
       </Routes>
    </div>
  );
};

export default Profile;
