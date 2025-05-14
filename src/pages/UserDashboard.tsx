import React, { useState, useEffect } from 'react';
import { Upload, FileText, Filter } from 'lucide-react';
import { useCV } from '../context/CVContext';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import FileUpload from '../components/ui/FileUpload';
import CVCard from '../components/CVCard';
import CVDetailModal from '../components/CVDetailModal';
import { CV } from '../types';
import { useNavigate } from 'react-router-dom';

const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const { cvs, uploadCV, isLoading } = useCV();
  const [selectedCV, setSelectedCV] = useState<CV | null>(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const navigate = useNavigate();
  
  // Form state
  const [file, setFile] = useState<File | null>(null);
  const [specialization, setSpecialization] = useState<string>(user?.specialization || '');
  const [yearsOfExperience, setYearsOfExperience] = useState<string>(
    user?.yearsOfExperience ? user.yearsOfExperience.toString() : ''
  );
  const [uploadError, setUploadError] = useState<string>('');

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

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
  };

  const handleUpload = async (e: React.FormEvent) => {
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
      await uploadCV(file, specialization, parseInt(yearsOfExperience));
      setFile(null);
      setUploadModalOpen(false);
    } catch (error) {
      setUploadError('Failed to upload CV. Please try again.');
    }
  };

  const handleViewCV = (cv: CV) => {
    setSelectedCV(cv);
  };

  const closeModal = () => {
    setSelectedCV(null);
  };

  const getStatusCount = (status: CV['status']) => {
    return cvs.filter(cv => cv.status === status).length;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Documents</h1>
          <p className="mt-1 text-sm text-gray-500">
            Upload and manage your CVs and track their status
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button 
            variant="primary"
            icon={<Upload className="h-5 w-5" />}
            onClick={() => setUploadModalOpen(true)}
          >
            Upload New CV
          </Button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 rounded-md p-3">
              <FileText className="h-6 w-6 text-blue-800" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Documents</p>
              <p className="text-2xl font-semibold">{cvs.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-amber-100 rounded-md p-3">
              <FileText className="h-6 w-6 text-amber-800" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Pending Review</p>
              <p className="text-2xl font-semibold">{getStatusCount('pending')}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-teal-100 rounded-md p-3">
              <FileText className="h-6 w-6 text-teal-800" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Reviewed</p>
              <p className="text-2xl font-semibold">{getStatusCount('reviewed')}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-green-100 rounded-md p-3">
              <FileText className="h-6 w-6 text-green-800" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Selected</p>
              <p className="text-2xl font-semibold">{getStatusCount('selected')}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Document List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Your Documents</h2>
        </div>
        
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto"></div>
            <p className="mt-4 text-gray-500">Loading your documents...</p>
          </div>
        ) : cvs.length === 0 ? (
          <div className="p-8 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No documents yet</h3>
            <p className="text-gray-500 mb-4">
              Upload your first CV to get started
            </p>
            <Button 
              variant="primary"
              onClick={() => setUploadModalOpen(true)}
            >
              Upload CV
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {cvs.map((cv) => (
              <CVCard
                key={cv.id}
                cv={cv}
                onView={handleViewCV}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Upload Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Upload New CV</h3>
              <button 
                onClick={() => setUploadModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleUpload} className="p-6">
              {uploadError && (
                <div className="mb-4 bg-red-50 p-3 rounded-md">
                  <p className="text-sm text-red-700">{uploadError}</p>
                </div>
              )}
              
              <div className="space-y-6">
                <FileUpload
                  onFileSelect={handleFileSelect}
                  label="Upload your CV"
                  accept=".pdf,.doc,.docx"
                  maxSizeMB={5}
                />
                
                <Select
                  id="specialization"
                  name="specialization"
                  label="Specialization"
                  options={specializations}
                  value={specialization}
                  onChange={setSpecialization}
                  required
                />
                
                <Select
                  id="experience"
                  name="experience"
                  label="Years of experience"
                  options={experienceOptions}
                  value={yearsOfExperience}
                  onChange={setYearsOfExperience}
                  required
                />
                
                <div className="flex justify-end space-x-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setUploadModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    isLoading={isLoading}
                  >
                    Upload
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* CV Detail Modal */}
      {selectedCV && (
        <CVDetailModal
          cv={selectedCV}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default UserDashboard;