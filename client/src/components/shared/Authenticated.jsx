import { useEffect, useState, useCallback } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

import { useProfile } from "../../context/ProfileContext";

const Authenticated = ({ children }) => {
  const { accessToken } = useProfile();

  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const checkAuthentication = useCallback(async () => {
    if (!accessToken) {
      setIsAuthenticated(false);
      return;
    }

    const url = "/api/authenticate";
    const options = {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}` },
    };

    try {
      const response = await fetch(url, options);
      setIsAuthenticated(response.ok);
    } catch (error) {
      console.error("Error attempting to authenticate the user:", error);
      setIsAuthenticated(false);
    }
  }, [accessToken]);

  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to={"/"} replace />;
};

Authenticated.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Authenticated;
