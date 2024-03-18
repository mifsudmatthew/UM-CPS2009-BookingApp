import { createContext, useContext } from "react";
import { useUser } from "../hooks/useUser";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { user } = useUser();

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export function useUserContext() {
  return useContext(UserContext);
}
