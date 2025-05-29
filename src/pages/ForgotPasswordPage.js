import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };
    return (_jsxs("div", { className: "min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "sm:mx-auto sm:w-full sm:max-w-md", children: [_jsx("h2", { className: "mt-6 text-center text-3xl font-extrabold text-gray-900", children: "Forgot your password?" }), _jsx("p", { className: "mt-2 text-center text-sm text-gray-600", children: "Enter your email address and we'll send you a link to reset your password." })] }), _jsx("div", { className: "mt-8 sm:mx-auto sm:w-full sm:max-w-md", children: _jsx("div", { className: "bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10", children: submitted ? (_jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-green-600 font-medium mb-4", children: "If an account with that email exists, a reset link has been sent." }), _jsx(Link, { to: "/login", className: "text-blue-900 hover:text-blue-800 font-medium", children: "Return to login" })] })) : (_jsxs("form", { className: "space-y-6", onSubmit: handleSubmit, children: [_jsx(Input, { id: "email", name: "email", type: "email", autoComplete: "email", required: true, label: "Email address", value: email, onChange: e => setEmail(e.target.value) }), _jsx(Button, { type: "submit", className: "w-full", children: "Send reset link" })] })) }) })] }));
};
export default ForgotPasswordPage;
