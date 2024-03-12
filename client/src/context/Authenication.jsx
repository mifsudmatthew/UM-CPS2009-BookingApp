import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(getAccessToken());

  function getAccessToken() {
    return localStorage.getItem("accessToken") || "";
  }

  function updateAccessToken(newAccessToken) {
    localStorage.setItem("accessToken", newAccessToken);
    setAccessToken(newAccessToken);
  }

  return (
    <AuthContext.Provider value={{ accessToken, updateAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

