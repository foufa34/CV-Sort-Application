var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect } from 'react';
// Mock user data for demonstration
const MOCK_ADMIN = {
    id: 'admin-1',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin',
    createdAt: new Date(),
};
const MOCK_USERS = [
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
const getStoredUsers = () => {
    const stored = localStorage.getItem('users');
    if (stored) {
        // Parse dates
        return JSON.parse(stored).map((u) => (Object.assign(Object.assign({}, u), { createdAt: new Date(u.createdAt) })));
    }
    // If nothing in storage, return mock users (including admin)
    return [MOCK_ADMIN, ...MOCK_USERS];
};
const saveUsers = (users) => {
    localStorage.setItem('users', JSON.stringify(users));
};
const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        // Check for saved user in localStorage (simulating persistence)
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setIsLoading(false);
    }, []);
    const login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
        setIsLoading(true);
        try {
            yield new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
            const users = getStoredUsers();
            const foundUser = users.find(u => u.email === email);
            if (foundUser && foundUser.password === password) {
                setUser(foundUser);
                localStorage.setItem('currentUser', JSON.stringify(foundUser));
                return;
            }
            throw new Error('Invalid credentials');
        }
        catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
        finally {
            setIsLoading(false);
        }
    });
    const register = (name_1, email_1, password_1, specialization_1, yearsOfExperience_1, ...args_1) => __awaiter(void 0, [name_1, email_1, password_1, specialization_1, yearsOfExperience_1, ...args_1], void 0, function* (name, email, password, specialization, yearsOfExperience, role = 'user') {
        setIsLoading(true);
        try {
            yield new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
            const users = getStoredUsers();
            if (users.some(u => u.email === email)) {
                throw new Error('Email already registered');
            }
            const newUser = {
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
        }
        catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
        finally {
            setIsLoading(false);
        }
    });
    const logout = () => {
        setUser(null);
        localStorage.removeItem('currentUser');
    };
    return (_jsx(AuthContext.Provider, { value: {
            user,
            isLoading,
            isAuthenticated: !!user,
            login,
            register,
            logout
        }, children: children }));
};
