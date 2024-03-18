import { useState, createContext, useContext } from "react";

const AuthContext = createContext("");

export default function Auth() {
  const [accessToken, _setAccessToken] = useState(getAccessToken);

  function getAccessToken() {
    return localStorage.getItem("accessToken") || "";
  }

  function setToken(token) {
    localStorage.setItem("accessToken", JSON.stringify(token));
    _setAccessToken(token);
  }

  const AuthProvider = ({ children }) => {
    return (
      <AuthContext.Provider value={accessToken}>
        {children}
      </AuthContext.Provider>
    );
  };

  const useAuth = () => {
    return useContext(AuthContext);
  };

  return { AuthProvider, useAuth, setToken };
}
