/**
 * @file ProfileProvider.jsx
 * @desc A provider component that holds all functions that modify the profile context.
 */

import PropTypes from "prop-types"; // Importing prop-types for typechecking
import { useState, useMemo, useEffect } from "react"; // Importing hooks from react
import { jwtDecode } from "jwt-decode"; // Importing jwt-decode to decode the JWT token

import ProfileContext from "./ProfileContext";

// Exporting a provider component so that the context is available to all the components in the application that are wrapped by the provider component.
const ProfileProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(
    JSON.parse(localStorage.getItem("accessToken")) || "" // Retrieve the accessToken from localStorage
  );

  // Decode the accessToken to get the user details
  const [user, setUser] = useState(accessToken ? jwtDecode(accessToken) : {});

  const [isAuthenticated, setIsAuthenticated] = useState(true);

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

  const isAdmin = useMemo(() => {
    // Function to check if the user is an admin
    if (
      // If the user is not defined or null or admin is not defined or null
      user == undefined ||
      user == null ||
      user.admin == undefined ||
      user.admin == null
    ) {
      return false; // Set the admin status to false
    }

    return user.admin; // Set the admin status to the user's admin status
  }, [user]);

  useEffect(() => {
    const fetchAuthenticationStatus = async () => {
      // If the access token is not defined or null, set the authentication status to false
      if (!accessToken || accessToken === "") {
        setIsAuthenticated(false);
        return;
      }

      // Otherwise, make prepare the request to authenticate the user
      const url = "/api/authenticate";
      const options = {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}` },
      };

      try {
        // Make a request to the server to authenticate the user
        const response = await fetch(url, options);
        // Set the authentication status to the response status
        setIsAuthenticated(response.ok);
      } catch (error) {
        // If there is an error, log the error and set the authentication status to false
        console.error("Error attempting to authenticate the user:", error);
        setIsAuthenticated(false);
      }
    };

    fetchAuthenticationStatus();
  }, [accessToken]);

  const contextValue = {
    accessToken,
    updateToken,
    user,
    updateUser,
    logout,
    isAdmin,
    isAuthenticated,
  };

  return (
    <ProfileContext.Provider value={contextValue}>
      {children /*Providing the context to the children */}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;

// Ensure that the children prop is passed to the provider component
ProfileProvider.propTypes = {
  children: PropTypes.node.isRequired, // Children must be a node
};
