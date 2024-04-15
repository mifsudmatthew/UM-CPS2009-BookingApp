import { useState, createContext, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";

const UserContext = createContext();

const useUser = () => {
  return useContext(UserContext);
};

const UserProvider = ({ children }) => {
  const [user, _setUser] = useState(getUser());

  function getUser() {
    const accessToken = JSON.parse(localStorage.getItem("accessToken"));
    return accessToken ? jwtDecode(accessToken) : {};
  }

  function setUser(user) {
    _setUser(user);
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { UserProvider, useUser };
