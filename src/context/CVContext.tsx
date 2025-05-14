import React, { createContext, useContext, useState, useEffect } from 'react';
import { CV, FilterOption, SortOption } from '../types';
import { useAuth } from './AuthContext';

interface CVContextType {
  cvs: CV[];
  isLoading: boolean;
  uploadCV: (file: File, specialization: string, yearsOfExperience: number) => Promise<void>;
  filterCVs: (filters: FilterOption) => CV[];
  sortCVs: (sortBy: SortOption) => CV[];
  updateCVStatus: (cvId: string, status: CV['status']) => Promise<void>;
  getCV: (id: string) => CV | undefined;
}

// Mock CV data for demonstration
const MOCK_CVS: CV[] = [
  {
    id: 'cv-1',
    userId: 'user-1',
    userName: 'John Doe',
    title: 'Senior Software Engineer',
    specialization: 'Software Development',
    yearsOfExperience: 5,
    fileUrl: 'https://example.com/cv1.pdf',
    fileName: 'john_doe_cv.pdf',
    fileSize: 1024 * 1024, // 1MB
    uploadDate: new Date(2023, 5, 15),
    status: 'pending',
    metadata: {
      skills: ['JavaScript', 'React', 'Node.js', 'TypeScript'],
      education: ['Bachelor of Computer Science, MIT'],
      lastPosition: 'Mid-level Developer at Tech Corp',
    },
  },
  {
    id: 'cv-2',
    userId: 'user-2',
    userName: 'Jane Smith',
    title: 'UX Designer',
    specialization: 'Design',
    yearsOfExperience: 3,
    fileUrl: 'https://example.com/cv2.pdf',
    fileName: 'jane_smith_cv.pdf',
    fileSize: 1.5 * 1024 * 1024, // 1.5MB
    uploadDate: new Date(2023, 6, 20),
    status: 'reviewed',
    metadata: {
      skills: ['Figma', 'Adobe XD', 'UI Design', 'User Research'],
      education: ['Masters in Human-Computer Interaction, Stanford'],
      lastPosition: 'Junior Designer at Creative Agency',
    },
  },
  {
    id: 'cv-3',
    userId: 'user-3',
    userName: 'Ahmed Khan',
    title: 'Data Scientist',
    specialization: 'Data Science',
    yearsOfExperience: 7,
    fileUrl: 'https://example.com/cv3.pdf',
    fileName: 'ahmed_khan_cv.pdf',
    fileSize: 2 * 1024 * 1024, // 2MB
    uploadDate: new Date(2023, 7, 5),
    status: 'selected',
    metadata: {
      skills: ['Python', 'Machine Learning', 'TensorFlow', 'Data Analysis'],
      education: ['PhD in Statistics, Cambridge University'],
      lastPosition: 'Lead Data Analyst at Big Data Inc',
    },
  },
];

const CVContext = createContext<CVContextType>({} as CVContextType);

export const useCV = () => useContext(CVContext);

export const CVProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [cvs, setCVs] = useState<CV[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadCVs = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Load from localStorage if available, else use MOCK_CVS
        const storedCVsRaw = JSON.parse(localStorage.getItem('cvs') || 'null') || MOCK_CVS;
        const storedCVs = storedCVsRaw.map((cv: any) => ({
         ...cv,
         uploadDate: new Date(cv.uploadDate)
        }));
        const filteredCVs = user?.role === 'admin'
          ? storedCVs
          : storedCVs.filter((cv: CV) => cv.userId === user?.id);
        setCVs(filteredCVs);
      } catch (error) {
        console.error('Failed to load CVs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      loadCVs();
    } else {
      setCVs([]);
      setIsLoading(false);
    }
  }, [user]);

  const uploadCV = async (file: File, specialization: string, yearsOfExperience: number) => {
    if (!user) throw new Error('User must be logged in to upload a CV');
    
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate upload
      const newCV: CV = {
        id: `cv-${Date.now()}`,
        userId: user.id,
        userName: user.name,
        title: 'New Upload',
        specialization,
        yearsOfExperience,
        fileUrl: URL.createObjectURL(file),
        fileName: file.name,
        fileSize: file.size,
        uploadDate: new Date(),
        status: 'pending',
        metadata: {
          skills: ['Skill extraction would happen server-side'],
          education: ['Education extraction would happen server-side'],
        },
      };
      MOCK_CVS.push(newCV); // Add to shared mock data
      const updatedCVs = [...MOCK_CVS];
      localStorage.setItem('cvs', JSON.stringify(updatedCVs));
      setCVs(prevCVs => [...prevCVs, newCV]);
    } catch (error) {
      console.error('Upload failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const filterCVs = (filters: FilterOption): CV[] => {
    return cvs.filter(cv => {
      if (filters.specialization && cv.specialization !== filters.specialization) return false;
      if (filters.minExperience && cv.yearsOfExperience < filters.minExperience) return false;
      if (filters.maxExperience && cv.yearsOfExperience > filters.maxExperience) return false;
      if (filters.status && cv.status !== filters.status) return false;
      if (filters.skills && filters.skills.length > 0) {
        // Check if CV has at least one of the required skills
        const hasRequiredSkill = filters.skills.some(skill => 
          cv.metadata.skills.includes(skill)
        );
        if (!hasRequiredSkill) return false;
      }
      return true;
    });
  };

  const sortCVs = (sortBy: SortOption): CV[] => {
    return [...cvs].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return b.uploadDate.getTime() - a.uploadDate.getTime();
        case 'oldest':
          return a.uploadDate.getTime() - b.uploadDate.getTime();
        case 'experience-high':
          return b.yearsOfExperience - a.yearsOfExperience;
        case 'experience-low':
          return a.yearsOfExperience - b.yearsOfExperience;
        case 'name':
          return a.userName.localeCompare(b.userName);
        default:
          return 0;
      }
    });
  };

  const updateCVStatus = async (cvId: string, status: CV['status']) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
      setCVs(prevCVs => {
        const updated = prevCVs.map(cv => cv.id === cvId ? { ...cv, status } : cv);
        localStorage.setItem('cvs', JSON.stringify(updated));
        return updated;
      });
    } catch (error) {
      console.error('Failed to update CV status:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getCV = (id: string) => {
    return cvs.find(cv => cv.id === id);
  };

  return (
    <CVContext.Provider 
      value={{ 
        cvs, 
        isLoading, 
        uploadCV, 
        filterCVs, 
        sortCVs, 
        updateCVStatus,
        getCV,
      }}
    >
      {children}
    </CVContext.Provider>
  );
};