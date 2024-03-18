import { createContext, useContext } from "react";
import { useToken } from "../hooks/useToken";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { accessToken } = useToken();

  return (
    <AuthContext.Provider value={accessToken}>{children}</AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
