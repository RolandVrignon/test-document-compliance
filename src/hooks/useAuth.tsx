import { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>({
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
  });

  const login = async (email: string, password: string) => {
    // Mock login logic
    setUser({
      id: '1',
      name: 'Admin User',
      email,
      role: 'admin',
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}