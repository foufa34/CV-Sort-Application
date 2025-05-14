import React from 'react';
import { X, Download, FileText, User, Calendar, Briefcase, Award, School } from 'lucide-react';
import { CV } from '../types';
import Button from './ui/Button';
import Badge from './ui/Badge';

interface CVDetailModalProps {
  cv: CV;
  onClose: () => void;
  onUpdateStatus?: (id: string, status: CV['status']) => void;
  isAdmin?: boolean;
}

const CVDetailModal: React.FC<CVDetailModalProps> = ({ 
  cv, 
  onClose, 
  onUpdateStatus,
  isAdmin = false 
}) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusBadge = (status: CV['status']) => {
    const variants: Record<CV['status'], React.ComponentProps<typeof Badge>['variant']> = {
      pending: 'warning',
      reviewed: 'secondary',
      selected: 'success',
      rejected: 'danger',
    };
    
    const labels: Record<CV['status'], string> = {
      pending: 'Pending Review',
      reviewed: 'Reviewed',
      selected: 'Selected',
      rejected: 'Rejected',
    };
    
    return (
      <Badge variant={variants[status]}>
        {labels[status]}
      </Badge>
    );
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' bytes';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleDownload = () => {
    // In a real application, this would download the actual file
    window.open(cv.fileUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <FileText className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">CV Details</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-grow overflow-y-auto p-6">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            {/* Left column */}
            <div className="flex-1">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-900">{cv.title}</h3>
                {getStatusBadge(cv.status)}
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center text-gray-700">
                  <User className="h-5 w-5 mr-2 text-gray-500" />
                  <span>{cv.userName}</span>
                </div>
                
                <div className="flex items-center text-gray-700">
                  <Briefcase className="h-5 w-5 mr-2 text-gray-500" />
                  <span>{cv.specialization}</span>
                </div>
                
                <div className="flex items-center text-gray-700">
                  <Award className="h-5 w-5 mr-2 text-gray-500" />
                  <span>{cv.yearsOfExperience} {cv.yearsOfExperience === 1 ? 'year' : 'years'} of experience</span>
                </div>
                
                <div className="flex items-center text-gray-700">
                  <Calendar className="h-5 w-5 mr-2 text-gray-500" />
                  <span>Uploaded on {formatDate(cv.uploadDate)}</span>
                </div>
              </div>
              
              {cv.metadata.lastPosition && (
                <div className="mt-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Last Position</h4>
                  <p className="text-gray-700">{cv.metadata.lastPosition}</p>
                </div>
              )}
              
              {cv.metadata.education && cv.metadata.education.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Education</h4>
                  <ul className="space-y-2">
                    {cv.metadata.education.map((edu, index) => (
                      <li key={index} className="flex items-start">
                        <School className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                        <span className="text-gray-700">{edu}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            {/* Right column */}
            <div className="w-full md:w-64">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Document Info</h4>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500">Filename</p>
                    <p className="text-sm font-medium text-gray-700 truncate">{cv.fileName}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500">File Size</p>
                    <p className="text-sm font-medium text-gray-700">{formatFileSize(cv.fileSize)}</p>
                  </div>
                  
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleDownload}
                    className="w-full mt-2"
                    icon={<Download className="h-4 w-4" />}
                  >
                    Download CV
                  </Button>
                </div>
              </div>
              
              {cv.metadata.skills && cv.metadata.skills.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {cv.metadata.skills.map((skill, index) => (
                      <Badge key={index} variant="default" size="sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-between">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          
          {isAdmin && onUpdateStatus && (
            <div className="flex space-x-2">
              {cv.status === 'pending' && (
                <>
                  <Button 
                    variant="secondary" 
                    onClick={() => onUpdateStatus(cv.id, 'reviewed')}
                  >
                    Mark as Reviewed
                  </Button>
                  <Button 
                    variant="primary" 
                    onClick={() => onUpdateStatus(cv.id, 'selected')}
                  >
                    Select Candidate
                  </Button>
                </>
              )}
              
              {cv.status === 'reviewed' && (
                <>
                  <Button 
                    variant="danger" 
                    onClick={() => onUpdateStatus(cv.id, 'rejected')}
                  >
                    Reject
                  </Button>
                  <Button 
                    variant="primary" 
                    onClick={() => onUpdateStatus(cv.id, 'selected')}
                  >
                    Select Candidate
                  </Button>
                </>
              )}
              
              {cv.status === 'selected' && (
                <Button 
                  variant="secondary" 
                  onClick={() => onUpdateStatus(cv.id, 'reviewed')}
                >
                  Move Back to Review
                </Button>
              )}
              
              {cv.status === 'rejected' && (
                <Button 
                  variant="secondary" 
                  onClick={() => onUpdateStatus(cv.id, 'reviewed')}
                >
                  Reconsider
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CVDetailModal;