import { AuthContextType, AuthContext } from "./AuthContext";
import { useState, ReactNode } from "react";

type AuthProviderProps = {
    children: ReactNode;
  };

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const login = () => {
    // Implement login logic here (e.g., set isLoggedIn to true after successful login)
    setIsLoggedIn(true);
  };

  const logout = () => {
    // Implement logout logic here (e.g., clear session, remove tokens, etc.)
    setIsLoggedIn(false);
  };

  const value: AuthContextType = {
    isLoggedIn,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
