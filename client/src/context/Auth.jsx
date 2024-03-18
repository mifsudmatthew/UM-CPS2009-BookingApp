import { useState, createContext, useContext } from "react";

export default function Auth() {
  const AuthContext = createContext("");
  const [accessToken, _setAccessToken] = useState(getAccessToken());

  function getAccessToken() {
    const _token = JSON.parse(localStorage.getItem("accessToken"));
    return _token || "";
  }

  function setToken(accessToken) {
    const _token = JSON.stringify(accessToken);
    localStorage.setItem("accessToken", _token);
    _setAccessToken(_token);
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
