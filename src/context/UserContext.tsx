import { createContext, useContext, useState, ReactNode } from 'react';
import { getToken } from '../services/authService';
interface UserContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  token: string | null;
  setToken: (token: string | null) => void;
}

const UserContext = createContext<UserContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  token: null,
  setToken: () => {},
});

export const useUserContext = (): UserContextType => {
  return useContext(UserContext);
};

interface UserProviderProps {
  children: ReactNode;
}

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const initialToken = getToken();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    initialToken !== null
  );
  const [token, setToken] = useState<string | null>(initialToken);

  const value = {
    isAuthenticated,
    setIsAuthenticated,
    token,
    setToken,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
