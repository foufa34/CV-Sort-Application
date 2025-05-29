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
import { useState, useEffect } from 'react';
import { Upload, FileText } from 'lucide-react';
import { useCV } from '../context/CVContext';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Select from '../components/ui/Select';
import FileUpload from '../components/ui/FileUpload';
import CVCard from '../components/CVCard';
import CVDetailModal from '../components/CVDetailModal';
import { useNavigate } from 'react-router-dom';
const UserDashboard = () => {
    const { user } = useAuth();
    const { cvs, uploadCV, isLoading } = useCV();
    const [selectedCV, setSelectedCV] = useState(null);
    const [uploadModalOpen, setUploadModalOpen] = useState(false);
    const navigate = useNavigate();
    // Form state
    const [file, setFile] = useState(null);
    const [specialization, setSpecialization] = useState((user === null || user === void 0 ? void 0 : user.specialization) || '');
    const [yearsOfExperience, setYearsOfExperience] = useState((user === null || user === void 0 ? void 0 : user.yearsOfExperience) ? user.yearsOfExperience.toString() : '');
    const [uploadError, setUploadError] = useState('');
    useEffect(() => {
        if (user && user.role === 'admin') {
            navigate('/admin', { replace: true });
        }
    }, [user, navigate]);
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
    const handleFileSelect = (selectedFile) => {
        setFile(selectedFile);
    };
    const handleUpload = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        setUploadError('');
        if (!file) {
            setUploadError('Please select a file to upload.');
            return;
        }
        if (!specialization) {
            setUploadError('Please select a specialization.');
            return;
        }
        if (!yearsOfExperience) {
            setUploadError('Please select years of experience.');
            return;
        }
        try {
            yield uploadCV(file, specialization, parseInt(yearsOfExperience));
            setFile(null);
            setUploadModalOpen(false);
        }
        catch (error) {
            setUploadError('Failed to upload CV. Please try again.');
        }
    });
    const handleViewCV = (cv) => {
        setSelectedCV(cv);
    };
    const closeModal = () => {
        setSelectedCV(null);
    };
    const getStatusCount = (status) => {
        return cvs.filter(cv => cv.status === status).length;
    };
    return (_jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [_jsxs("div", { className: "md:flex md:items-center md:justify-between mb-8", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "My Documents" }), _jsx("p", { className: "mt-1 text-sm text-gray-500", children: "Upload and manage your CVs and track their status" })] }), _jsx("div", { className: "mt-4 md:mt-0", children: _jsx(Button, { variant: "primary", icon: _jsx(Upload, { className: "h-5 w-5" }), onClick: () => setUploadModalOpen(true), children: "Upload New CV" }) })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6 mb-8", children: [_jsx("div", { className: "bg-white rounded-lg shadow-md p-6", children: _jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "bg-blue-100 rounded-md p-3", children: _jsx(FileText, { className: "h-6 w-6 text-blue-800" }) }), _jsxs("div", { className: "ml-4", children: [_jsx("p", { className: "text-sm font-medium text-gray-500", children: "Total Documents" }), _jsx("p", { className: "text-2xl font-semibold", children: cvs.length })] })] }) }), _jsx("div", { className: "bg-white rounded-lg shadow-md p-6", children: _jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "bg-amber-100 rounded-md p-3", children: _jsx(FileText, { className: "h-6 w-6 text-amber-800" }) }), _jsxs("div", { className: "ml-4", children: [_jsx("p", { className: "text-sm font-medium text-gray-500", children: "Pending Review" }), _jsx("p", { className: "text-2xl font-semibold", children: getStatusCount('pending') })] })] }) }), _jsx("div", { className: "bg-white rounded-lg shadow-md p-6", children: _jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "bg-teal-100 rounded-md p-3", children: _jsx(FileText, { className: "h-6 w-6 text-teal-800" }) }), _jsxs("div", { className: "ml-4", children: [_jsx("p", { className: "text-sm font-medium text-gray-500", children: "Reviewed" }), _jsx("p", { className: "text-2xl font-semibold", children: getStatusCount('reviewed') })] })] }) }), _jsx("div", { className: "bg-white rounded-lg shadow-md p-6", children: _jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "bg-green-100 rounded-md p-3", children: _jsx(FileText, { className: "h-6 w-6 text-green-800" }) }), _jsxs("div", { className: "ml-4", children: [_jsx("p", { className: "text-sm font-medium text-gray-500", children: "Selected" }), _jsx("p", { className: "text-2xl font-semibold", children: getStatusCount('selected') })] })] }) })] }), _jsxs("div", { className: "bg-white rounded-lg shadow-md overflow-hidden", children: [_jsx("div", { className: "p-6 border-b border-gray-200", children: _jsx("h2", { className: "text-lg font-medium text-gray-900", children: "Your Documents" }) }), isLoading ? (_jsxs("div", { className: "p-8 text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto" }), _jsx("p", { className: "mt-4 text-gray-500", children: "Loading your documents..." })] })) : cvs.length === 0 ? (_jsxs("div", { className: "p-8 text-center", children: [_jsx(FileText, { className: "h-12 w-12 text-gray-400 mx-auto mb-4" }), _jsx("h3", { className: "text-lg font-medium text-gray-900 mb-1", children: "No documents yet" }), _jsx("p", { className: "text-gray-500 mb-4", children: "Upload your first CV to get started" }), _jsx(Button, { variant: "primary", onClick: () => setUploadModalOpen(true), children: "Upload CV" })] })) : (_jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-6", children: cvs.map((cv) => (_jsx(CVCard, { cv: cv, onView: handleViewCV }, cv.id))) }))] }), uploadModalOpen && (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4", children: _jsxs("div", { className: "bg-white rounded-lg shadow-xl w-full max-w-md", children: [_jsxs("div", { className: "px-6 py-4 border-b border-gray-200 flex justify-between items-center", children: [_jsx("h3", { className: "text-lg font-medium text-gray-900", children: "Upload New CV" }), _jsxs("button", { onClick: () => setUploadModalOpen(false), className: "text-gray-500 hover:text-gray-700 focus:outline-none", children: [_jsx("span", { className: "sr-only", children: "Close" }), _jsx("svg", { className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 18L18 6M6 6l12 12" }) })] })] }), _jsxs("form", { onSubmit: handleUpload, className: "p-6", children: [uploadError && (_jsx("div", { className: "mb-4 bg-red-50 p-3 rounded-md", children: _jsx("p", { className: "text-sm text-red-700", children: uploadError }) })), _jsxs("div", { className: "space-y-6", children: [_jsx(FileUpload, { onFileSelect: handleFileSelect, label: "Upload your CV", accept: ".pdf,.doc,.docx", maxSizeMB: 5 }), _jsx(Select, { id: "specialization", name: "specialization", label: "Specialization", options: specializations, value: specialization, onChange: setSpecialization, required: true }), _jsx(Select, { id: "experience", name: "experience", label: "Years of experience", options: experienceOptions, value: yearsOfExperience, onChange: setYearsOfExperience, required: true }), _jsxs("div", { className: "flex justify-end space-x-3 pt-4", children: [_jsx(Button, { variant: "outline", onClick: () => setUploadModalOpen(false), children: "Cancel" }), _jsx(Button, { type: "submit", isLoading: isLoading, children: "Upload" })] })] })] })] }) })), selectedCV && (_jsx(CVDetailModal, { cv: selectedCV, onClose: closeModal }))] }));
};
export default UserDashboard;
