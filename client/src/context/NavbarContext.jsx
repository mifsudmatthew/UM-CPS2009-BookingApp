import { createContext, useState } from 'react';

// Create a new context called NotificationContext
const NotificationContext = createContext();

// Create a provider component called NotificationProvider
/**
 * Provides notification context to its children components.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components.
 * @returns {ReactNode} The rendered component.
 */
export const NotificationProvider = ({ children }) => {
  // Define state variables using the useState hook
  const [notification, setNotification] = useState(false);
  const [successfulBookings, setSuccessfulBookings] = useState([]);

  /**
   * Adds a successful booking to the state.
   *
   * @param {Object} booking - The booking object to be added.
   */
  const addSuccessfulBooking = (booking) => {
    // Update the successfulBookings state by adding the new booking
    setSuccessfulBookings(prevBookings => [...prevBookings, booking]);
  };

  // Render the NotificationProvider component with the context value and children components
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

// Export the NotificationContext as the default export of the module
export default NotificationContext;