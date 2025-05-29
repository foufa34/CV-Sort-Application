var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, isLoading } = useAuth();
    const navigate = useNavigate();
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        setError('');
        try {
            yield login(email, password);
            navigate('/dashboard');
        }
        catch (_a) {
            setError('Invalid email or password. Please try again.');
        }
    });
    return (_jsxs("div", { className: "min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "sm:mx-auto sm:w-full sm:max-w-md", children: [_jsx("div", { className: "flex justify-center", children: _jsx(LogIn, { className: "h-12 w-12 text-blue-900" }) }), _jsx("h2", { className: "mt-6 text-center text-3xl font-extrabold text-gray-900", children: "Sign in to your account" }), _jsxs("p", { className: "mt-2 text-center text-sm text-gray-600", children: ["Or", ' ', _jsx(Link, { to: "/register", className: "font-medium text-blue-900 hover:text-blue-800", children: "create a new account" })] })] }), _jsx("div", { className: "mt-8 sm:mx-auto sm:w-full sm:max-w-md", children: _jsxs("div", { className: "bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10", children: [error && (_jsxs("div", { className: "mb-4 bg-red-50 p-4 rounded-md flex", children: [_jsx(AlertCircle, { className: "h-5 w-5 text-red-500 mr-2" }), _jsx("p", { className: "text-sm text-red-700", children: error })] })), _jsxs("form", { className: "space-y-6", onSubmit: handleSubmit, children: [_jsx(Input, { id: "email", name: "email", type: "email", autoComplete: "email", required: true, label: "Email address", value: email, onChange: (e) => setEmail(e.target.value) }), _jsx(Input, { id: "password", name: "password", type: "password", autoComplete: "current-password", required: true, label: "Password", value: password, onChange: (e) => setPassword(e.target.value) }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center", children: [_jsx("input", { id: "remember-me", name: "remember-me", type: "checkbox", className: "h-4 w-4 text-blue-900 focus:ring-blue-500 border-gray-300 rounded" }), _jsx("label", { htmlFor: "remember-me", className: "ml-2 block text-sm text-gray-900", children: "Remember me" })] }), _jsx("div", { className: "text-sm", children: _jsx(Link, { to: "/forgot-password", className: "font-medium text-blue-900 hover:text-blue-800", children: "Forgot your password?" }) })] }), _jsx(Button, { type: "submit", className: "w-full", isLoading: isLoading, children: "Sign in" })] }), _jsxs("div", { className: "mt-6", children: [_jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-0 flex items-center", children: _jsx("div", { className: "w-full border-t border-gray-300" }) }), _jsx("div", { className: "relative flex justify-center text-sm", children: _jsx("span", { className: "px-2 bg-white text-gray-500", children: "Demo accounts" }) })] }), _jsx("div", { className: "mt-6 grid grid-cols-1 gap-3", children: _jsxs("div", { className: "bg-gray-50 p-3 rounded-md text-sm", children: [_jsxs("p", { children: [_jsx("strong", { children: "Admin:" }), " admin@example.com / password"] }), _jsxs("p", { children: [_jsx("strong", { children: "User:" }), " user@example.com / password"] }), _jsx("p", { className: "text-xs text-gray-500 mt-2", children: "Note: No actual authentication occurs in this demo app" })] }) })] })] }) })] }));
};
export default LoginPage;
