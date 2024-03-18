import { useState, createContext, useContext } from "react";

const UserContext = createContext();

export default function User() {
  const [user, _setUser] = useState(getUser());

  function getUser() {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : {};
  }

  function setUser(userData) {
    const _user = JSON.stringify(userData);
    localStorage.setItem("user", _user);
    _setUser(_user);
  }

  const UserProvider = ({ children }) => {
    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
  };

  const useUser = () => {
    return useContext(UserContext);
  };

  return { UserProvider, useUser, setUser };
}
