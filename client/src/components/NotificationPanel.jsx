
import {React, useContext } from 'react';

import NotificationContext from '../context/NavbarContext';

const NotificationPanel = () => {
    const { successfulBookings } = useContext(NotificationContext);

    if (!Array.isArray(successfulBookings)) {
        return <div className="notification-panel">Loading...</div>;
      }
  return (
    <div>
      {successfulBookings.length === 0 ? (
        <h6>No successful bookings yet.</h6>
      ) : (
        <div>
            <h6>Successful Bookings</h6>
        <ul>
          {successfulBookings.map((booking) => (
            <li key={booking.id} >
              <div>
                <strong>Date:</strong> {booking.date}
              </div>
              <div>
                <strong>Time:</strong> {booking.time}
              </div>
              <div>
                <strong>Court:</strong> {booking.court}
              </div>
            </li>
          ))}
        </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;