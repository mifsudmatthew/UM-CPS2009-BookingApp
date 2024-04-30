import { useState, createContext, useContext } from "react";
import PropTypes from "prop-types";

const NotificationContext = createContext();

export const useNotifications = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
  // State to hold the array
  const [notifications, setNotifications] = useState(() => {
    // Retrieve the array from localStorage, or initialize it if it doesn't exist
    const storedNotifications =
      JSON.parse(localStorage.getItem("notifications")) || [];
    return storedNotifications.slice(-3); // Ensure only the last 3 notifications are stored
  });

  // Function to add a notification to the array
  const storeNotification = (message) => {
    // Create a new notification object with text and time
    const newNotification = {
      text: message,
      time: new Date().toLocaleTimeString(), // Current time
    };
    // Create a new array by appending the new notification
    const updatedNotifications = [newNotification, ...notifications.slice(-2)]; // Keep the last 2 notifications
    // Update state
    setNotifications(updatedNotifications);
    // Update localStorage
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
  };

  const removeNotification = () => {};

  const contextValue = {
    notifications,
    storeNotification,
    removeNotification,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
