import React from 'react';
import { CV } from '../types';
interface CVCardProps {
    cv: CV;
    onView: (cv: CV) => void;
    onStatusUpdate?: (id: string, status: CV['status']) => void;
    isAdmin?: boolean;
}
declare const CVCard: React.FC<CVCardProps>;
export default CVCard;
