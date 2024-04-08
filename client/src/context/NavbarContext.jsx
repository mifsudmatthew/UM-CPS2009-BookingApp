import { createContext, useState } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(false);
  const [successfulBookings, setSuccessfulBookings] = useState([]);

  const addSuccessfulBooking = (booking) => {

    setSuccessfulBookings(prevBookings => [...prevBookings, booking]);
    
  };

  

  return (
    <NotificationContext.Provider
      value={{
        notification,
        setNotification,
        successfulBookings,
        addSuccessfulBooking,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;