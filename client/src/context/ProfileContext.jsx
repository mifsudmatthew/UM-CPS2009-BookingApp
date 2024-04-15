import { useState, createContext, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";

const ProfileContext = createContext();

export const useProfile = () => {
  return useContext(ProfileContext);
};

export const ProfileProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(
    JSON.parse(localStorage.getItem("accessToken")) || ""
  );
  // TODO: Implement functionality for refresh accessTokens
  // const [refreshToken, setRefreshToken] = useState(
  //   localStorage.getItem("accessToken") || null
  // );
  const [user, setUser] = useState(accessToken ? jwtDecode(accessToken) : {});

  const updateToken = (accessToken) => {
    localStorage.setItem("accessToken", JSON.stringify(accessToken));
    setAccessToken(accessToken);
  };

  const removeToken = () => {
    localStorage.removeItem("accessToken");
  };

  const updateUser = (user) => {
    setUser(user);
  };

  const removeUser = () => {
    setUser({});
  };

  const contextValue = {
    accessToken,
    updateToken,
    removeToken,
    user,
    updateUser,
    removeUser,
  };

  return (
    <ProfileContext.Provider value={contextValue}>
      {children}
    </ProfileContext.Provider>
  );
};

ProfileProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
