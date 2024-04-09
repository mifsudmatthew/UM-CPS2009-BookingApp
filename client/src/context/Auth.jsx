import { useState, createContext, useContext } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, _setToken] = useState(getAccessToken());

  function getAccessToken() {
    return localStorage.getItem("accessToken") || "";
  }

  function setToken(token) {
    localStorage.setItem("accessToken", JSON.stringify(token));
    _setToken(token);
  }
  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthProvider, useAuth };
