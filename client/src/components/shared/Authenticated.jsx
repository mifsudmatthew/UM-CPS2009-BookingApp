import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

import { useProfile } from "../../context/ProfileContext";

// Creating an authenticated component that checks if the user is authenticated
const Authenticated = ({ children, fallback }) => {
  const { accessToken } = useProfile(); // Get the access token from the ProfileContext

  // Creating a state to store the authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  // Check if the user is authenticated every time the access token changes
  useEffect(() => {
    // Function to check if the user is authenticated
    const checkAuthentication = async () => {
      // If the access token is not defined or null, set the authentication status to false
      if (!accessToken) {
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

    checkAuthentication(); // Call the function to check the authentication status
  }, [accessToken]);

  // If the authentication status is null, return a loading message
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  // If the user is authenticated, return the children, else return the fallback
  return isAuthenticated ? <>{children}</> : <>{fallback}</>;
};

// Prop types for the Authenticated component
Authenticated.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.node,
};
// Default props for the Authenticated component
Authenticated.defaultProps = {
  fallback: <Navigate to={"/"} replace />,
};

export default Authenticated; // Export the Authenticated component
