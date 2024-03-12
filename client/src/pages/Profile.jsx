import React from 'react';
import '../styles/profile.css';
import ProfileSidebar from '../components/ProfileSidebar';
import AccountDetails from '../components/AccountDetails';
import Bookings from '../components/Bookings';
import Balance from '../components/Balance';
import { Routes, Route, Navigate } from 'react-router-dom';

import { useToken } from "../hooks/useToken";


const Profile = () => {
  const { accessToken } = useToken()

  if (accessToken == "") {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="profile-container">
      <ProfileSidebar />
      <Routes>
        <Route path="/" element={<AccountDetails />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/balance" element={<Balance />} />
      </Routes>
    </div>
  );
};

export default Profile;
