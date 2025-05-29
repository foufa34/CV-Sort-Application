import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { X, Download, FileText, User, Calendar, Briefcase, Award, School } from 'lucide-react';
import Button from './ui/Button';
import Badge from './ui/Badge';
const CVDetailModal = ({ cv, onClose, onUpdateStatus, isAdmin = false }) => {
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
    const formatFileSize = (bytes) => {
        if (bytes < 1024)
            return bytes + ' bytes';
        if (bytes < 1024 * 1024)
            return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };
    const handleDownload = () => {
        // In a real application, this would download the actual file
        window.open(cv.fileUrl, '_blank');
    };
    return (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4", children: _jsxs("div", { className: "bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col", children: [_jsxs("div", { className: "px-6 py-4 border-b border-gray-200 flex justify-between items-center", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(FileText, { className: "h-6 w-6 text-blue-600" }), _jsx("h2", { className: "text-xl font-semibold text-gray-900", children: "CV Details" })] }), _jsx("button", { onClick: onClose, className: "text-gray-500 hover:text-gray-700 focus:outline-none", children: _jsx(X, { className: "h-5 w-5" }) })] }), _jsx("div", { className: "flex-grow overflow-y-auto p-6", children: _jsxs("div", { className: "flex flex-col md:flex-row md:items-start gap-6", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex justify-between items-start mb-4", children: [_jsx("h3", { className: "text-xl font-bold text-gray-900", children: cv.title }), getStatusBadge(cv.status)] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center text-gray-700", children: [_jsx(User, { className: "h-5 w-5 mr-2 text-gray-500" }), _jsx("span", { children: cv.userName })] }), _jsxs("div", { className: "flex items-center text-gray-700", children: [_jsx(Briefcase, { className: "h-5 w-5 mr-2 text-gray-500" }), _jsx("span", { children: cv.specialization })] }), _jsxs("div", { className: "flex items-center text-gray-700", children: [_jsx(Award, { className: "h-5 w-5 mr-2 text-gray-500" }), _jsxs("span", { children: [cv.yearsOfExperience, " ", cv.yearsOfExperience === 1 ? 'year' : 'years', " of experience"] })] }), _jsxs("div", { className: "flex items-center text-gray-700", children: [_jsx(Calendar, { className: "h-5 w-5 mr-2 text-gray-500" }), _jsxs("span", { children: ["Uploaded on ", formatDate(cv.uploadDate)] })] })] }), cv.metadata.lastPosition && (_jsxs("div", { className: "mt-6", children: [_jsx("h4", { className: "text-sm font-semibold text-gray-700 mb-2", children: "Last Position" }), _jsx("p", { className: "text-gray-700", children: cv.metadata.lastPosition })] })), cv.metadata.education && cv.metadata.education.length > 0 && (_jsxs("div", { className: "mt-6", children: [_jsx("h4", { className: "text-sm font-semibold text-gray-700 mb-2", children: "Education" }), _jsx("ul", { className: "space-y-2", children: cv.metadata.education.map((edu, index) => (_jsxs("li", { className: "flex items-start", children: [_jsx(School, { className: "h-5 w-5 mr-2 text-gray-500 mt-0.5" }), _jsx("span", { className: "text-gray-700", children: edu })] }, index))) })] }))] }), _jsxs("div", { className: "w-full md:w-64", children: [_jsxs("div", { className: "bg-gray-50 rounded-lg p-4 border border-gray-200", children: [_jsx("h4", { className: "text-sm font-semibold text-gray-700 mb-3", children: "Document Info" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xs text-gray-500", children: "Filename" }), _jsx("p", { className: "text-sm font-medium text-gray-700 truncate", children: cv.fileName })] }), _jsxs("div", { children: [_jsx("p", { className: "text-xs text-gray-500", children: "File Size" }), _jsx("p", { className: "text-sm font-medium text-gray-700", children: formatFileSize(cv.fileSize) })] }), _jsx(Button, { variant: "primary", size: "sm", onClick: handleDownload, className: "w-full mt-2", icon: _jsx(Download, { className: "h-4 w-4" }), children: "Download CV" })] })] }), cv.metadata.skills && cv.metadata.skills.length > 0 && (_jsxs("div", { className: "mt-4", children: [_jsx("h4", { className: "text-sm font-semibold text-gray-700 mb-2", children: "Skills" }), _jsx("div", { className: "flex flex-wrap gap-2", children: cv.metadata.skills.map((skill, index) => (_jsx(Badge, { variant: "default", size: "sm", children: skill }, index))) })] }))] })] }) }), _jsxs("div", { className: "px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-between", children: [_jsx(Button, { variant: "outline", onClick: onClose, children: "Close" }), isAdmin && onUpdateStatus && (_jsxs("div", { className: "flex space-x-2", children: [cv.status === 'pending' && (_jsxs(_Fragment, { children: [_jsx(Button, { variant: "secondary", onClick: () => onUpdateStatus(cv.id, 'reviewed'), children: "Mark as Reviewed" }), _jsx(Button, { variant: "primary", onClick: () => onUpdateStatus(cv.id, 'selected'), children: "Select Candidate" })] })), cv.status === 'reviewed' && (_jsxs(_Fragment, { children: [_jsx(Button, { variant: "danger", onClick: () => onUpdateStatus(cv.id, 'rejected'), children: "Reject" }), _jsx(Button, { variant: "primary", onClick: () => onUpdateStatus(cv.id, 'selected'), children: "Select Candidate" })] })), cv.status === 'selected' && (_jsx(Button, { variant: "secondary", onClick: () => onUpdateStatus(cv.id, 'reviewed'), children: "Move Back to Review" })), cv.status === 'rejected' && (_jsx(Button, { variant: "secondary", onClick: () => onUpdateStatus(cv.id, 'reviewed'), children: "Reconsider" }))] }))] })] }) }));
};
export default CVDetailModal;
