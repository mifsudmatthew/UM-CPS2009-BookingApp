import { useState } from "react";

export function useUser() {
  const [user, _setUser] = useState(getUser());

  function getUser() {
    let user = JSON.parse(localStorage.getItem("user"));
    return user || {};
  }

  function setUser(user) {
    let _user = JSON.stringify(user);
    localStorage.setItem("user", _user);
    _setUser(_user);
  }

  return {
    setUser,
    user,
  };
}
