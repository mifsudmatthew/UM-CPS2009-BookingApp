import { useState } from "react";

export function useToken() {
  const [accessToken, _setAccessToken] = useState(getAccessToken());

  function getAccessToken() {
    let _token = JSON.parse(localStorage.getItem("accessToken"));
    return _token || "";
  }

  function setAccessToken(accessToken) {
    let _token = JSON.stringify(accessToken);
    localStorage.setItem("accessToken", _token);
    _setAccessToken(_token);
  }

  return {
    setAccessToken,
    accessToken,
  };
}
