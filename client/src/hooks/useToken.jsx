import { useState } from "react";

export function useToken() {
  const [accessToken, _setAccessToken] = useState(getAccessToken());
  const [refreshToken, _setRefreshToken] = useState(getRefreshToken());

  function getAccessToken() {
    return localStorage.getItem("accessToken") || "";
  }

  function getRefreshToken() {
    return localStorage.getItem("refreshToken") || "";
  }

  function setTokens(accessToken, refreshToken) {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    _setAccessToken(accessToken);
    _setRefreshToken(refreshToken);
  }

  return {
    setTokens,
    accessToken,
    refreshToken,
  };
}
