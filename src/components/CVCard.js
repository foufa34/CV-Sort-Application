import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Calendar, Briefcase, Award, FileText } from 'lucide-react';
import Badge from './ui/Badge';
import Button from './ui/Button';
const CVCard = ({ cv, onView, onStatusUpdate, isAdmin = false }) => {
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };
    const getStatusBadge = (status) => {
        const variants = {
            pending: 'warning',
            reviewed: 'secondary',
            selected: 'success',
            rejected: 'danger',
        };
        const labels = {
            pending: 'Pending Review',
            reviewed: 'Reviewed',
            selected: 'Selected',
            rejected: 'Rejected',
        };
        return (_jsx(Badge, { variant: variants[status], children: labels[status] }));
    };
    return (_jsxs("div", { className: "bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300", children: [_jsxs("div", { className: "p-5", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900", children: cv.title }), _jsx("p", { className: "text-sm text-gray-600 mt-1", children: cv.userName })] }), getStatusBadge(cv.status)] }), _jsxs("div", { className: "mt-4 space-y-2", children: [_jsxs("div", { className: "flex items-center text-sm text-gray-600", children: [_jsx(Briefcase, { className: "h-4 w-4 mr-2 text-gray-500" }), _jsx("span", { children: cv.specialization })] }), _jsxs("div", { className: "flex items-center text-sm text-gray-600", children: [_jsx(Award, { className: "h-4 w-4 mr-2 text-gray-500" }), _jsxs("span", { children: [cv.yearsOfExperience, " ", cv.yearsOfExperience === 1 ? 'year' : 'years', " of experience"] })] }), _jsxs("div", { className: "flex items-center text-sm text-gray-600", children: [_jsx(Calendar, { className: "h-4 w-4 mr-2 text-gray-500" }), _jsxs("span", { children: ["Uploaded on ", formatDate(cv.uploadDate)] })] }), _jsxs("div", { className: "flex items-center text-sm text-gray-600", children: [_jsx(FileText, { className: "h-4 w-4 mr-2 text-gray-500" }), _jsx("span", { children: cv.fileName })] })] }), cv.metadata.skills.length > 0 && (_jsxs("div", { className: "mt-4", children: [_jsx("p", { className: "text-xs font-medium text-gray-500 mb-2", children: "Skills" }), _jsxs("div", { className: "flex flex-wrap gap-1", children: [cv.metadata.skills.slice(0, 4).map((skill, index) => (_jsx(Badge, { variant: "default", size: "sm", children: skill }, index))), cv.metadata.skills.length > 4 && (_jsxs(Badge, { variant: "default", size: "sm", children: ["+", cv.metadata.skills.length - 4] }))] })] }))] }), _jsxs("div", { className: "px-5 py-3 bg-gray-50 border-t border-gray-200 flex justify-between", children: [_jsx(Button, { variant: "outline", size: "sm", onClick: () => onView(cv), children: "View Details" }), isAdmin && onStatusUpdate && (_jsxs("div", { className: "flex items-center space-x-2", children: [cv.status === 'pending' && (_jsxs(_Fragment, { children: [_jsx(Button, { variant: "secondary", size: "sm", onClick: () => onStatusUpdate(cv.id, 'reviewed'), children: "Mark Reviewed" }), _jsx(Button, { variant: "primary", size: "sm", onClick: () => onStatusUpdate(cv.id, 'selected'), children: "Select" })] })), cv.status === 'reviewed' && (_jsxs(_Fragment, { children: [_jsx(Button, { variant: "primary", size: "sm", onClick: () => onStatusUpdate(cv.id, 'selected'), children: "Select" }), _jsx(Button, { variant: "danger", size: "sm", onClick: () => onStatusUpdate(cv.id, 'rejected'), children: "Reject" })] }))] }))] })] }));
};
export default CVCard;
