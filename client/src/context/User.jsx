import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(getUser());

  function getUser() {
    return JSON.parse(localStorage.getItem("user")) || {};
  }

  function updateUser(newUser) {
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
  }

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

