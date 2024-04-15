import { createContext, useContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(
    JSON.parse(localStorage.getItem("accessToken")) || ""
  );
  // TODO: Implement functionality for refresh accessTokens
  // const [refreshToken, setRefreshToken] = useState(
  //   localStorage.getItem("accessToken") || null
  // );

  const updateToken = (accessToken) => {
    localStorage.setItem("accessToken", JSON.stringify(accessToken));
    setAccessToken(accessToken);
  };

  const contextValue = useMemo(
    () => ({ accessToken, updateToken }),
    [accessToken]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
