import React, { createContext, useState, ReactNode, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { UserRole } from "../enums/userRole";

interface AuthContextType {
  token: string | null;
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  user: null,
  login: () => {},
  logout: () => {},
});

export interface JwtPayload {
  ["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]: string;
  ["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"]: string;
  ["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]: string;
  ["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]: string;
  exp: number;
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [user, setUser] = useState<User | null>(null);

  /**
   * Effect to decode the token and extract user information.
   * If the token is expired or invalid, the user is logged out.
   */
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        const currentTime = Date.now() / 1000;

        // Check if the token has expired
        if (decoded.exp < currentTime) {
          logout();
        } else {
          // Map the decoded role to the UserRole enum
          const roleString = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

          const roleMap: { [key: string]: UserRole } = {
            "0": UserRole.User,
            "1": UserRole.Technician,
            "2": UserRole.Administrator
          };
          
          const role = roleMap[roleString];

          // Set user information in state
          setUser({
            email: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
            role: role,
            id: parseInt(decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]),
            name: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]
          });
        }
      } catch (error) {
        // If decoding fails, log the user out
        logout();
      }
    } else {
      setUser(null);
    }
  }, [token]);

  /**
   * Handles user login by setting the token in localStorage and state.
   */
  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  /**
   * Handles user logout by clearing the token and user state.
   * Redirects to the login page.
   */
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
