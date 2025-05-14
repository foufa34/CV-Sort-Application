import React from 'react';
import { Calendar, Briefcase, Award, FileText } from 'lucide-react';
import { CV } from '../types';
import Badge from './ui/Badge';
import Button from './ui/Button';

interface CVCardProps {
  cv: CV;
  onView: (cv: CV) => void;
  onStatusUpdate?: (id: string, status: CV['status']) => void;
  isAdmin?: boolean;
}

const CVCard: React.FC<CVCardProps> = ({ cv, onView, onStatusUpdate, isAdmin = false }) => {
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

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{cv.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{cv.userName}</p>
          </div>
          {getStatusBadge(cv.status)}
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <Briefcase className="h-4 w-4 mr-2 text-gray-500" />
            <span>{cv.specialization}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Award className="h-4 w-4 mr-2 text-gray-500" />
            <span>{cv.yearsOfExperience} {cv.yearsOfExperience === 1 ? 'year' : 'years'} of experience</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
            <span>Uploaded on {formatDate(cv.uploadDate)}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <FileText className="h-4 w-4 mr-2 text-gray-500" />
            <span>{cv.fileName}</span>
          </div>
        </div>
        
        {cv.metadata.skills.length > 0 && (
          <div className="mt-4">
            <p className="text-xs font-medium text-gray-500 mb-2">Skills</p>
            <div className="flex flex-wrap gap-1">
              {cv.metadata.skills.slice(0, 4).map((skill, index) => (
                <Badge key={index} variant="default" size="sm">
                  {skill}
                </Badge>
              ))}
              {cv.metadata.skills.length > 4 && (
                <Badge variant="default" size="sm">
                  +{cv.metadata.skills.length - 4}
                </Badge>
              )}
            </div>
          </div>
        )}
      </div>
      
      <div className="px-5 py-3 bg-gray-50 border-t border-gray-200 flex justify-between">
        <Button variant="outline" size="sm" onClick={() => onView(cv)}>
          View Details
        </Button>
        
        {isAdmin && onStatusUpdate && (
          <div className="flex items-center space-x-2">
            {cv.status === 'pending' && (
              <>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  onClick={() => onStatusUpdate(cv.id, 'reviewed')}
                >
                  Mark Reviewed
                </Button>
                <Button 
                  variant="primary" 
                  size="sm" 
                  onClick={() => onStatusUpdate(cv.id, 'selected')}
                >
                  Select
                </Button>
              </>
            )}
            {cv.status === 'reviewed' && (
              <>
                <Button 
                  variant="primary" 
                  size="sm" 
                  onClick={() => onStatusUpdate(cv.id, 'selected')}
                >
                  Select
                </Button>
                <Button 
                  variant="danger" 
                  size="sm" 
                  onClick={() => onStatusUpdate(cv.id, 'rejected')}
                >
                  Reject
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CVCard;