import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, specialization?: string, yearsOfExperience?: number, role?: 'user' | 'admin') => Promise<void>;
  logout: () => void;
}

// Mock user data for demonstration
const MOCK_ADMIN: User = {
  id: 'admin-1',
  email: 'admin@example.com',
  name: 'Admin User',
  role: 'admin',
  createdAt: new Date(),
};

const MOCK_USERS: User[] = [
  {
    id: 'user-1',
    email: 'user@example.com',
    name: 'John Doe',
    role: 'user',
    specialization: 'Software Development',
    yearsOfExperience: 5,
    createdAt: new Date(),
  },
];

const getStoredUsers = (): User[] => {
  const stored = localStorage.getItem('users');
  if (stored) {
    // Parse dates
    return (JSON.parse(stored) as User[]).map((u) => ({ ...u, createdAt: new Date(u.createdAt) }));
  }
  // If nothing in storage, return mock users (including admin)
  return [MOCK_ADMIN, ...MOCK_USERS];
};

const saveUsers = (users: User[]) => {
  localStorage.setItem('users', JSON.stringify(users));
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check for saved user in localStorage (simulating persistence)
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      const users = getStoredUsers();
      const foundUser = users.find(u => u.email === email);
      if (foundUser && foundUser.password === password) {
        setUser(foundUser);
        localStorage.setItem('currentUser', JSON.stringify(foundUser));
        return;
      }
      throw new Error('Invalid credentials');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    name: string, 
    email: string, 
    password: string, 
    specialization?: string, 
    yearsOfExperience?: number,
    role: 'user' | 'admin' = 'user'
  ) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      const users = getStoredUsers();
      if (users.some(u => u.email === email)) {
        throw new Error('Email already registered');
      }
      const newUser: User = {
        id: `user-${Date.now()}`,
        email,
        name,
        role,
        password,
        specialization,
        yearsOfExperience,
        createdAt: new Date(),
      };
      users.push(newUser);
      saveUsers(users);
      setUser(newUser);
      localStorage.setItem('currentUser', JSON.stringify(newUser));
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoading, 
        isAuthenticated: !!user,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};