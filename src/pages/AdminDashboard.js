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
import { Filter, Users, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useCV } from '../context/CVContext';
import Button from '../components/ui/Button';
import Select from '../components/ui/Select';
import Input from '../components/ui/Input';
import CVCard from '../components/CVCard';
import CVDetailModal from '../components/CVDetailModal';
const AdminDashboard = () => {
    const { cvs, isLoading, filterCVs, sortCVs, updateCVStatus } = useCV();
    const [selectedCV, setSelectedCV] = useState(null);
    const [filterSpecialization, setFilterSpecialization] = useState('');
    const [filterMinExperience, setFilterMinExperience] = useState('');
    const [filterMaxExperience, setFilterMaxExperience] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [sortBy, setSortBy] = useState('newest');
    const [showFilters, setShowFilters] = useState(false);
    const specializations = [
        { value: '', label: 'All Specializations' },
        { value: 'Software Development', label: 'Software Development' },
        { value: 'Data Science', label: 'Data Science' },
        { value: 'Design', label: 'Design' },
        { value: 'Marketing', label: 'Marketing' },
        { value: 'Sales', label: 'Sales' },
        { value: 'Human Resources', label: 'Human Resources' },
        { value: 'Finance', label: 'Finance' },
        { value: 'Other', label: 'Other' },
    ];
    const statusOptions = [
        { value: '', label: 'All Statuses' },
        { value: 'pending', label: 'Pending Review' },
        { value: 'reviewed', label: 'Reviewed' },
        { value: 'selected', label: 'Selected' },
        { value: 'rejected', label: 'Rejected' },
    ];
    const sortOptions = [
        { value: 'newest', label: 'Newest First' },
        { value: 'oldest', label: 'Oldest First' },
        { value: 'experience-high', label: 'Most Experience' },
        { value: 'experience-low', label: 'Least Experience' },
        { value: 'name', label: 'Name (A-Z)' },
    ];
    const handleViewCV = (cv) => {
        setSelectedCV(cv);
    };
    const closeModal = () => {
        setSelectedCV(null);
    };
    const handleUpdateCVStatus = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield updateCVStatus(id, status);
            if (selectedCV && selectedCV.id === id) {
                setSelectedCV(prev => prev ? Object.assign(Object.assign({}, prev), { status }) : null);
            }
        }
        catch (error) {
            console.error('Failed to update status:', error);
        }
    });
    const getFilteredCVs = () => {
        const filters = {
            specialization: filterSpecialization || undefined,
            minExperience: filterMinExperience ? parseInt(filterMinExperience) : undefined,
            maxExperience: filterMaxExperience ? parseInt(filterMaxExperience) : undefined,
            status: filterStatus || undefined,
        };
        const filtered = filterCVs(filters);
        return sortCVs(sortBy);
    };
    const clearFilters = () => {
        setFilterSpecialization('');
        setFilterMinExperience('');
        setFilterMaxExperience('');
        setFilterStatus('');
    };
    const getStatusCount = (status) => {
        return cvs.filter(cv => cv.status === status).length;
    };
    const filteredCVs = getFilteredCVs();
    return (_jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [_jsxs("div", { className: "md:flex md:items-center md:justify-between mb-8", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Admin Dashboard" }), _jsx("p", { className: "mt-1 text-sm text-gray-500", children: "Manage and review all candidate CVs" })] }), _jsx("div", { className: "mt-4 md:mt-0", children: _jsx(Button, { variant: "outline", icon: _jsx(Filter, { className: "h-5 w-5" }), onClick: () => setShowFilters(!showFilters), children: showFilters ? 'Hide Filters' : 'Show Filters' }) })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6 mb-8", children: [_jsx("div", { className: "bg-white rounded-lg shadow-md p-6", children: _jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "bg-blue-100 rounded-md p-3", children: _jsx(Users, { className: "h-6 w-6 text-blue-800" }) }), _jsxs("div", { className: "ml-4", children: [_jsx("p", { className: "text-sm font-medium text-gray-500", children: "Total Candidates" }), _jsx("p", { className: "text-2xl font-semibold", children: cvs.length })] })] }) }), _jsx("div", { className: "bg-white rounded-lg shadow-md p-6", children: _jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "bg-amber-100 rounded-md p-3", children: _jsx(Clock, { className: "h-6 w-6 text-amber-800" }) }), _jsxs("div", { className: "ml-4", children: [_jsx("p", { className: "text-sm font-medium text-gray-500", children: "Pending Review" }), _jsx("p", { className: "text-2xl font-semibold", children: getStatusCount('pending') })] })] }) }), _jsx("div", { className: "bg-white rounded-lg shadow-md p-6", children: _jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "bg-green-100 rounded-md p-3", children: _jsx(CheckCircle, { className: "h-6 w-6 text-green-800" }) }), _jsxs("div", { className: "ml-4", children: [_jsx("p", { className: "text-sm font-medium text-gray-500", children: "Selected" }), _jsx("p", { className: "text-2xl font-semibold", children: getStatusCount('selected') })] })] }) }), _jsx("div", { className: "bg-white rounded-lg shadow-md p-6", children: _jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "bg-red-100 rounded-md p-3", children: _jsx(XCircle, { className: "h-6 w-6 text-red-800" }) }), _jsxs("div", { className: "ml-4", children: [_jsx("p", { className: "text-sm font-medium text-gray-500", children: "Rejected" }), _jsx("p", { className: "text-2xl font-semibold", children: getStatusCount('rejected') })] })] }) })] }), showFilters && (_jsxs("div", { className: "bg-white rounded-lg shadow-md p-6 mb-8", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h2", { className: "text-lg font-medium text-gray-900", children: "Filter Candidates" }), _jsx(Button, { variant: "ghost", size: "sm", onClick: clearFilters, children: "Clear Filters" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", children: [_jsx(Select, { id: "specialization", name: "specialization", label: "Specialization", options: specializations, value: filterSpecialization, onChange: setFilterSpecialization }), _jsx(Input, { id: "min-experience", name: "min-experience", type: "number", label: "Min. Experience (Years)", min: "0", value: filterMinExperience, onChange: (e) => setFilterMinExperience(e.target.value) }), _jsx(Input, { id: "max-experience", name: "max-experience", type: "number", label: "Max. Experience (Years)", min: "0", value: filterMaxExperience, onChange: (e) => setFilterMaxExperience(e.target.value) }), _jsx(Select, { id: "status", name: "status", label: "Status", options: statusOptions, value: filterStatus, onChange: setFilterStatus })] })] })), _jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsx("h2", { className: "text-lg font-medium text-gray-900", children: "Candidate CVs" }), _jsxs("div", { className: "flex items-center", children: [_jsx("span", { className: "text-sm text-gray-500 mr-2", children: "Sort by:" }), _jsx(Select, { id: "sort", name: "sort", options: sortOptions, value: sortBy, onChange: (value) => setSortBy(value), className: "w-40" })] })] }), isLoading ? (_jsxs("div", { className: "bg-white rounded-lg shadow-md p-8 text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto" }), _jsx("p", { className: "mt-4 text-gray-500", children: "Loading candidates..." })] })) : filteredCVs.length === 0 ? (_jsxs("div", { className: "bg-white rounded-lg shadow-md p-8 text-center", children: [_jsx(Users, { className: "h-12 w-12 text-gray-400 mx-auto mb-4" }), _jsx("h3", { className: "text-lg font-medium text-gray-900 mb-1", children: "No candidates found" }), _jsx("p", { className: "text-gray-500", children: "Try adjusting your filters to see more results" })] })) : (_jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: filteredCVs.map((cv) => (_jsx(CVCard, { cv: cv, onView: handleViewCV, onStatusUpdate: handleUpdateCVStatus, isAdmin: true }, cv.id))) })), selectedCV && (_jsx(CVDetailModal, { cv: selectedCV, onClose: closeModal, onUpdateStatus: handleUpdateCVStatus, isAdmin: true }))] }));
};
export default AdminDashboard;
