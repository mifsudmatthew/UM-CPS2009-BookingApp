import { useState } from "react";

export function useUser() {
  const [user, _setUser] = useState(getUser());

  function getUser() {
    return localStorage.getItem("user") || "";
  }

  function setUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
    _setUser(user.accessToken);
  }

  return {
    setUser,
    user,
  };
}
