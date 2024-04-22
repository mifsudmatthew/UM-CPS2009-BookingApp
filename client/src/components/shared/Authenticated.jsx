import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

import { useProfile } from "../../context/ProfileContext";

const Authenticated = ({ children, fallback }) => {
  const { accessToken } = useProfile();

  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
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
    };

    checkAuthentication();
  }, [accessToken]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <>{children}</> : <>{fallback}</>;
};

Authenticated.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.node,
};

Authenticated.defaultProps = {
  fallback: <Navigate to={"/"} replace />,
};

export default Authenticated;
