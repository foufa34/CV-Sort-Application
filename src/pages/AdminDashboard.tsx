import React, { useState } from 'react';
import { Filter, Users, BarChart4, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useCV } from '../context/CVContext';
import Button from '../components/ui/Button';
import Select from '../components/ui/Select';
import Input from '../components/ui/Input';
import CVCard from '../components/CVCard';
import CVDetailModal from '../components/CVDetailModal';
import { CV, FilterOption, SortOption } from '../types';

const AdminDashboard: React.FC = () => {
  const { cvs, isLoading, filterCVs, sortCVs, updateCVStatus } = useCV();
  const [selectedCV, setSelectedCV] = useState<CV | null>(null);
  const [filterSpecialization, setFilterSpecialization] = useState<string>('');
  const [filterMinExperience, setFilterMinExperience] = useState<string>('');
  const [filterMaxExperience, setFilterMaxExperience] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
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

  const handleViewCV = (cv: CV) => {
    setSelectedCV(cv);
  };

  const closeModal = () => {
    setSelectedCV(null);
  };

  const handleUpdateCVStatus = async (id: string, status: CV['status']) => {
    try {
      await updateCVStatus(id, status);
      if (selectedCV && selectedCV.id === id) {
        setSelectedCV(prev => prev ? { ...prev, status } : null);
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const getFilteredCVs = () => {
    const filters: FilterOption = {
      specialization: filterSpecialization || undefined,
      minExperience: filterMinExperience ? parseInt(filterMinExperience) : undefined,
      maxExperience: filterMaxExperience ? parseInt(filterMaxExperience) : undefined,
      status: filterStatus as CV['status'] || undefined,
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

  const getStatusCount = (status: CV['status']) => {
    return cvs.filter(cv => cv.status === status).length;
  };

  const filteredCVs = getFilteredCVs();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and review all candidate CVs
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button 
            variant="outline"
            icon={<Filter className="h-5 w-5" />}
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 rounded-md p-3">
              <Users className="h-6 w-6 text-blue-800" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Candidates</p>
              <p className="text-2xl font-semibold">{cvs.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-amber-100 rounded-md p-3">
              <Clock className="h-6 w-6 text-amber-800" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Pending Review</p>
              <p className="text-2xl font-semibold">{getStatusCount('pending')}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-green-100 rounded-md p-3">
              <CheckCircle className="h-6 w-6 text-green-800" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Selected</p>
              <p className="text-2xl font-semibold">{getStatusCount('selected')}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-red-100 rounded-md p-3">
              <XCircle className="h-6 w-6 text-red-800" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Rejected</p>
              <p className="text-2xl font-semibold">{getStatusCount('rejected')}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Filters */}
      {showFilters && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Filter Candidates</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearFilters}
            >
              Clear Filters
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select
              id="specialization"
              name="specialization"
              label="Specialization"
              options={specializations}
              value={filterSpecialization}
              onChange={setFilterSpecialization}
            />
            
            <Input
              id="min-experience"
              name="min-experience"
              type="number"
              label="Min. Experience (Years)"
              min="0"
              value={filterMinExperience}
              onChange={(e) => setFilterMinExperience(e.target.value)}
            />
            
            <Input
              id="max-experience"
              name="max-experience"
              type="number"
              label="Max. Experience (Years)"
              min="0"
              value={filterMaxExperience}
              onChange={(e) => setFilterMaxExperience(e.target.value)}
            />
            
            <Select
              id="status"
              name="status"
              label="Status"
              options={statusOptions}
              value={filterStatus}
              onChange={setFilterStatus}
            />
          </div>
        </div>
      )}
      
      {/* Sorting */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900">Candidate CVs</h2>
        <div className="flex items-center">
          <span className="text-sm text-gray-500 mr-2">Sort by:</span>
          <Select
            id="sort"
            name="sort"
            options={sortOptions}
            value={sortBy}
            onChange={(value) => setSortBy(value as SortOption)}
            className="w-40"
          />
        </div>
      </div>
      
      {/* CV List */}
      {isLoading ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading candidates...</p>
        </div>
      ) : filteredCVs.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No candidates found</h3>
          <p className="text-gray-500">
            Try adjusting your filters to see more results
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCVs.map((cv) => (
            <CVCard
              key={cv.id}
              cv={cv}
              onView={handleViewCV}
              onStatusUpdate={handleUpdateCVStatus}
              isAdmin={true}
            />
          ))}
        </div>
      )}
      
      {/* CV Detail Modal */}
      {selectedCV && (
        <CVDetailModal
          cv={selectedCV}
          onClose={closeModal}
          onUpdateStatus={handleUpdateCVStatus}
          isAdmin={true}
        />
      )}
    </div>
  );
};

export default AdminDashboard;