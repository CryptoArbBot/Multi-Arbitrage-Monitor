import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User, Alert } from '../types';
import { mockUser, mockAlerts } from '../utils/mockData';

interface UserContextType {
  user: User | null;
  alerts: Alert[];
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  markAlertAsRead: (id: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(mockUser);
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  const login = async (email: string, password: string): Promise<void> => {
    // Simulating API call
    return new Promise((resolve) => {
      setTimeout(() => {
        setUser(mockUser);
        setIsLoggedIn(true);
        resolve();
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  const markAlertAsRead = (id: string) => {
    setAlerts(prevAlerts => 
      prevAlerts.map(alert => 
        alert.id === id ? { ...alert, read: true } : alert
      )
    );
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      alerts, 
      isLoggedIn, 
      login, 
      logout, 
      markAlertAsRead 
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};