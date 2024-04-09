import { useContext } from "react";

import NotificationContext from "../context/NavbarContext";

/**
 * Renders the notification panel component.
 * @returns {JSX.Element} The notification panel component.
 */
const NotificationPanel = () => {
  // Access the successfulBookings array from the NotificationContext
  const { successfulBookings } = useContext(NotificationContext);

  // If successfulBookings is not an array, display a loading message
  if (!Array.isArray(successfulBookings)) {
    return <div className="notification-panel">Loading...</div>;
  }

  return (
    <div className="notification-panel">
      {/* If there are no successful bookings, display a message */}
      {successfulBookings.length === 0 ? (
        <h6>No successful bookings yet.</h6>
      ) : (
        <div>
          <h6>Successful Bookings</h6>
          <ul>
            {/* Iterate over each booking in the successfulBookings array and display it */}
            {successfulBookings.map((booking) => (
              <li key={booking.id} className="booking-item">
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
