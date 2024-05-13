/**
 * @file NotificationProvider.jsx
 * @desc A provider component that holds all functions that modify the notification context.
 */

import PropTypes from "prop-types"; // Importing prop-types for typechecking
import { useState } from "react"; // Importing hooks from react

import NotificationContext from "./NotificationContext";

// Exporting a provider component so that the context is available to all the components in the application that are wrapped by the provider component.
const NotificationProvider = ({ children }) => {
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
    const updatedNotifications = [newNotification, ...notifications.slice(-2)]; // Adding the new notification to the front of the array and keeping only the last 2 notifications after that.

    // Update state
    setNotifications(updatedNotifications);

    // Update localStorage
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
  };

  // Clear the 'notifications' array in localStorage
  const clearNotifications = () => {
    setNotifications([]);
    localStorage.removeItem("notifications");
  };

  // Store the notifications array and the storeNotification function in the context
  const contextValue = {
    notifications,
    storeNotification,
    clearNotifications,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children /*Providing the context to the children */}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;

// Ensure that the children prop is passed to the provider component
NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired, // Children must be a node
};
