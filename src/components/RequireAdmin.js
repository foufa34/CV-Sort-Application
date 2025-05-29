import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const RequireAdmin = ({ children }) => {
    const { user, isLoading } = useAuth();
    const location = useLocation();
    if (isLoading)
        return null; // or a loading spinner
    if (!user || user.role !== 'admin') {
        // Redirect non-admins to the user dashboard or login
        return _jsx(Navigate, { to: user ? '/dashboard' : '/login', state: { from: location }, replace: true });
    }
    return _jsx(_Fragment, { children: children });
};
export default RequireAdmin;
