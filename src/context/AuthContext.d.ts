import React from 'react';
import { User } from '../types';
interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string, specialization?: string, yearsOfExperience?: number, role?: 'user' | 'admin') => Promise<void>;
    logout: () => void;
}
export declare const useAuth: () => AuthContextType;
export declare const AuthProvider: React.FC<{
    children: React.ReactNode;
}>;
export {};
