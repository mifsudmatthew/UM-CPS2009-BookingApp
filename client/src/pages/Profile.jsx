import React from 'react';
import '../styles/profile.css';
import ProfileSidebar from '../components/ProfileSidebar';
import AccountDetails from '../components/AccountDetails';
import Bookings from '../components/Bookings';
import Balance from '../components/Balance';
import { Routes, Route, Navigate } from 'react-router-dom';

const isLoggedIn = () => {
  return !!localStorage.getItem('accessToken'); // Example check
};

const Profile = () => {
  if (!isLoggedIn()) {
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
