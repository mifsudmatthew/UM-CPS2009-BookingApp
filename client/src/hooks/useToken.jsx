import { useState } from "react";

export function useToken() {
  const getToken = () => {
    const token = localStorage.getItem("token");

    if (token == null) {
      return "";
    } else {
      return token;
    }
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (accessToken, refreshToken) => {
    console.log("Setting token in localStorage");

    localStorage.setItem("accessToken", JSON.stringify(accessToken));
    localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
    setToken(accessToken);
  };

  return {
    setToken: saveToken,
    token,
  };
}
