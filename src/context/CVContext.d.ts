import React from 'react';
import { CV, FilterOption, SortOption } from '../types';
interface CVContextType {
    cvs: CV[];
    isLoading: boolean;
    uploadCV: (file: File, specialization: string, yearsOfExperience: number) => Promise<void>;
    filterCVs: (filters: FilterOption) => CV[];
    sortCVs: (sortBy: SortOption) => CV[];
    updateCVStatus: (cvId: string, status: CV['status']) => Promise<void>;
    getCV: (id: string) => CV | undefined;
}
export declare const useCV: () => CVContextType;
export declare const CVProvider: React.FC<{
    children: React.ReactNode;
}>;
export {};
