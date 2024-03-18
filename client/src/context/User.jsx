import { useState, useEffect, createContext, useContext } from "react";

export default function User() {
  const UserContext = createContext();
  const [user, setUser] = useState({});

  useEffect(() => {
    const _user = JSON.parse(localStorage.getItem("user"));
    setUser(_user);
    console.log("Empty Dependency useEffect ran");
  }, []);

  useEffect(() => {
    const _user = JSON.stringify(user);
    localStorage.setItem("user", _user);
    setUser(_user);
    console.log("User Dependency useEffect ran");
  }, [user]);

  const UserProvider = ({ children }) => {
    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
  };

  const useUser = () => {
    return useContext(UserContext);
  };

  return { UserProvider, useUser, setUser };
}
