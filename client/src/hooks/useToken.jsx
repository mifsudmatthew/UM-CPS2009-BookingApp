import { useState } from "react";

export function useToken() {
  const getToken = () => {
    console.log("Retrieving token from localStorage");
    const token = localStorage.getItem("token");

    if (token == null) {
      return "";
    } else {
      return token;
    }
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    console.log("Setting token in localStorage");

    localStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken.accessToken);
  };

  return {
    setToken: saveToken,
    token,
  };
}
