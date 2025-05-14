import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600">
              &copy; {new Date().getFullYear()} CV Sorter. All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-blue-900 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-900 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-900 transition-colors">
              Support
            </a>
          </div>
          
          <div className="mt-4 md:mt-0">
            <p className="text-sm text-gray-600 flex items-center">
              Made with 
              <Heart className="h-4 w-4 text-red-500 mx-1" />
              by CV Sorter Team
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;