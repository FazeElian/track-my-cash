import { createContext, useContext } from "react";
import type { User } from "../../lib/types/services/user.type";

interface UserContextType {
  user: User | null;
}

export const UserContext = createContext<UserContextType>({
  user: null,
});

export const useUser = () => useContext(UserContext);