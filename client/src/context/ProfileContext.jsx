/**
 * ProfileContext.jsx
 * Stores the user's data and tokens
 */

import PropTypes from "prop-types"; // Importing prop-types for typechecking
import { useState, createContext, useContext } from "react"; // Importing hooks from react
import { jwtDecode } from "jwt-decode"; // Importing jwt-decode to decode the JWT token

const ProfileContext = createContext(); // Creating a context to hold the user profile

// Using the context in a component
export const useProfile = () => {
  return useContext(ProfileContext);
};

// Exporting a provider component so that the context is available to all the components in the application that are wrapped by the provider component.
export const ProfileProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(
    JSON.parse(localStorage.getItem("accessToken")) || "" // Retrieve the accessToken from localStorage
  );

  // TODO: Implement functionality for refresh accessTokens
  // const [refreshToken, setRefreshToken] = useState(
  //   localStorage.getItem("accessToken") || null
  // );

  // Decode the accessToken to get the user details
  const [user, setUser] = useState(accessToken ? jwtDecode(accessToken) : {});

  // Function to update the accessToken in localStorage, state and user state.
  const updateToken = (accessToken) => {
    localStorage.setItem("accessToken", JSON.stringify(accessToken)); // Store the accessToken in localStorage
    setAccessToken(accessToken); // Update the accessToken state
    setUser(accessToken ? jwtDecode(accessToken) : {}); // Update the user state
  };

  // Function to update the user state
  const updateUser = (user) => {
    setUser(user);
  };

  const logout = () => {
    setUser({});
    setAccessToken("");
    localStorage.removeItem("accessToken");
  };

  const contextValue = {
    accessToken,
    updateToken,
    user,
    updateUser,
    logout,
  };

  return (
    <ProfileContext.Provider value={contextValue}>
      {children /*Providing the context to the children */}
    </ProfileContext.Provider>
  );
};
// Ensure that the children prop is passed to the provider component
ProfileProvider.propTypes = {
  children: PropTypes.node.isRequired, // Children must be a node
};
