import React from 'react';
import { CV } from '../types';
interface CVDetailModalProps {
    cv: CV;
    onClose: () => void;
    onUpdateStatus?: (id: string, status: CV['status']) => void;
    isAdmin?: boolean;
}
declare const CVDetailModal: React.FC<CVDetailModalProps>;
export default CVDetailModal;
