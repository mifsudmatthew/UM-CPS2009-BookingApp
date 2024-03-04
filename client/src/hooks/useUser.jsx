import { useState } from "react";

export function useUser() {
  const getUser = () => {
    const user = localStorage.getItem("user");

    if (user == null) {
      return {};
    } else {
      return user;
    }
  };

  const [user, setUser] = useState(getUser());

  const saveUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user.email));
    setUser(user.accessToken);
  };

  return {
    setUser: saveUser,
    user: user,
  };
}
