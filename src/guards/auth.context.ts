import { createContext } from "react";

export type AuthContextType = {
  token: string;
};

export const AuthContext = createContext<AuthContextType>(null!);
