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
import { UserPlus, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Select from '../components/ui/Select';
const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [yearsOfExperience, setYearsOfExperience] = useState('');
    const [role, setRole] = useState('user');
    const [error, setError] = useState('');
    const { register, isLoading } = useAuth();
    const navigate = useNavigate();
    const specializations = [
        { value: '', label: 'Select a specialization' },
        { value: 'Software Development', label: 'Software Development' },
        { value: 'Data Science', label: 'Data Science' },
        { value: 'Design', label: 'Design' },
        { value: 'Marketing', label: 'Marketing' },
        { value: 'Sales', label: 'Sales' },
        { value: 'Human Resources', label: 'Human Resources' },
        { value: 'Finance', label: 'Finance' },
        { value: 'Other', label: 'Other' },
    ];
    const experienceOptions = [
        { value: '', label: 'Select years of experience' },
        { value: '0', label: 'Less than 1 year' },
        { value: '1', label: '1 year' },
        { value: '2', label: '2 years' },
        { value: '3', label: '3 years' },
        { value: '4', label: '4 years' },
        { value: '5', label: '5 years' },
        { value: '6', label: '6-10 years' },
        { value: '10', label: 'More than 10 years' },
    ];
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        setError('');
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        try {
            yield register(name, email, password, specialization, yearsOfExperience ? parseInt(yearsOfExperience) : undefined, role);
            navigate('/dashboard');
        }
        catch (_a) {
            setError('Registration failed. Please try again with different credentials.');
        }
    });
    return (_jsxs("div", { className: "min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "sm:mx-auto sm:w-full sm:max-w-md", children: [_jsx("div", { className: "flex justify-center", children: _jsx(UserPlus, { className: "h-12 w-12 text-blue-900" }) }), _jsx("h2", { className: "mt-6 text-center text-3xl font-extrabold text-gray-900", children: "Create a new account" }), _jsxs("p", { className: "mt-2 text-center text-sm text-gray-600", children: ["Or", ' ', _jsx(Link, { to: "/login", className: "font-medium text-blue-900 hover:text-blue-800", children: "sign in to your existing account" })] })] }), _jsx("div", { className: "mt-8 sm:mx-auto sm:w-full sm:max-w-md", children: _jsxs("div", { className: "bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10", children: [error && (_jsxs("div", { className: "mb-4 bg-red-50 p-4 rounded-md flex", children: [_jsx(AlertCircle, { className: "h-5 w-5 text-red-500 mr-2" }), _jsx("p", { className: "text-sm text-red-700", children: error })] })), _jsxs("form", { className: "space-y-6", onSubmit: handleSubmit, children: [_jsx(Input, { id: "name", name: "name", type: "text", autoComplete: "name", required: true, label: "Full name", value: name, onChange: (e) => setName(e.target.value) }), _jsx(Input, { id: "email", name: "email", type: "email", autoComplete: "email", required: true, label: "Email address", value: email, onChange: (e) => setEmail(e.target.value) }), _jsx(Input, { id: "password", name: "password", type: "password", autoComplete: "new-password", required: true, label: "Password", value: password, onChange: (e) => setPassword(e.target.value) }), _jsx(Input, { id: "confirm-password", name: "confirm-password", type: "password", autoComplete: "new-password", required: true, label: "Confirm password", value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value) }), _jsx(Select, { id: "role", name: "role", label: "Account Type", options: [
                                        { value: 'user', label: 'User' },
                                        { value: 'admin', label: 'Admin' }
                                    ], value: role, onChange: (value) => setRole(value), required: true }), _jsx(Select, { id: "specialization", name: "specialization", label: "Specialization", options: specializations, value: specialization, onChange: setSpecialization }), _jsx(Select, { id: "experience", name: "experience", label: "Years of experience", options: experienceOptions, value: yearsOfExperience, onChange: setYearsOfExperience }), _jsx(Button, { type: "submit", className: "w-full", isLoading: isLoading, children: "Register" })] }), _jsx("div", { className: "mt-6", children: _jsxs("p", { className: "text-xs text-center text-gray-500", children: ["By registering, you agree to our", ' ', _jsx("a", { href: "#", className: "text-blue-900 hover:text-blue-800", children: "Terms of Service" }), ' ', "and", ' ', _jsx("a", { href: "#", className: "text-blue-900 hover:text-blue-800", children: "Privacy Policy" })] }) })] }) })] }));
};
export default RegisterPage;
