import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CVProvider } from './context/CVContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import RequireAdmin from './components/RequireAdmin';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
const router = createBrowserRouter(createRoutesFromElements(_jsxs(Route, { element: _jsxs("div", { className: "flex flex-col min-h-screen", children: [_jsx(Navbar, {}), _jsx("main", { className: "flex-grow bg-gray-50", children: _jsx(Outlet, {}) }), _jsx(Footer, {})] }), children: [_jsx(Route, { index: true, element: _jsx(HomePage, {}) }), _jsx(Route, { path: "login", element: _jsx(LoginPage, {}) }), _jsx(Route, { path: "register", element: _jsx(RegisterPage, {}) }), _jsx(Route, { path: "forgot-password", element: _jsx(ForgotPasswordPage, {}) }), _jsx(Route, { path: "dashboard", element: _jsx(UserDashboard, {}) }), _jsx(Route, { path: "admin", element: _jsx(RequireAdmin, { children: _jsx(AdminDashboard, {}) }) })] })));
function App() {
    return (_jsx(AuthProvider, { children: _jsx(CVProvider, { children: _jsx(RouterProvider, { router: router }) }) }));
}
export default App;
