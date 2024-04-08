import { useState, createContext, useContext } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, _setUser] = useState(getUser());

  function getUser() {
    const _user = localStorage.getItem("user");
    return _user ? JSON.parse(_user) : {};
  }

  function setUser(user) {
    const _user = JSON.stringify(user);
    localStorage.setItem("user", _user);
    _setUser(user);
  }
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  return useContext(UserContext);
};

export { UserProvider, useUser };
