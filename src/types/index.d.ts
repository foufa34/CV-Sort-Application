export interface User {
    id: string;
    email: string;
    name: string;
    role: 'user' | 'admin';
    specialization?: string;
    yearsOfExperience?: number;
    createdAt: Date;
    password?: string;
}
export interface CV {
    id: string;
    userId: string;
    userName: string;
    title: string;
    specialization: string;
    yearsOfExperience: number;
    fileUrl: string;
    fileName: string;
    fileSize: number;
    uploadDate: Date;
    status: 'pending' | 'reviewed' | 'selected' | 'rejected';
    metadata: {
        skills: string[];
        education: string[];
        lastPosition?: string;
        [key: string]: any;
    };
}
export type SortOption = 'newest' | 'oldest' | 'experience-high' | 'experience-low' | 'name';
export type FilterOption = {
    specialization?: string;
    minExperience?: number;
    maxExperience?: number;
    skills?: string[];
    status?: CV['status'];
};
