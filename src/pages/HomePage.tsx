import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Users, Search, Shield, BarChart, Upload } from 'lucide-react';
import Button from '../components/ui/Button';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 mt-0">
                Find the perfect candidates with our CV Sorting System
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Streamline your recruitment process with our advanced CV management 
                and sorting platform. Upload, organize, and find the right talent 
                based on experience and specialization.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/register">
                  <Button size="lg" variant="secondary">
                    Get Started
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-800">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-400 to-amber-300 rounded-lg blur opacity-75"></div>
                <div className="relative bg-white p-6 rounded-lg shadow-xl">
                  <FileText className="h-64 w-64 text-blue-900 mx-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mt-0 mb-4">
              Powerful features for efficient CV management
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform provides everything you need to streamline your 
              recruitment and CV sorting process.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Upload className="h-12 w-12 text-teal-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2 mt-0">Easy CV Upload</h3>
              <p className="text-gray-600">
                Quick and secure document uploading with automatic metadata extraction.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Search className="h-12 w-12 text-teal-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2 mt-0">Smart Filtering</h3>
              <p className="text-gray-600">
                Find candidates by specialization, experience level, or specific skills.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Users className="h-12 w-12 text-teal-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2 mt-0">Candidate Management</h3>
              <p className="text-gray-600">
                Track candidate status from initial application through selection.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Shield className="h-12 w-12 text-teal-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2 mt-0">Secure Storage</h3>
              <p className="text-gray-600">
                Keep all documents and personal data safe with our secure cloud storage.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <BarChart className="h-12 w-12 text-teal-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2 mt-0">Analytics Dashboard</h3>
              <p className="text-gray-600">
                Get insights into your candidate pool with our comprehensive statistics.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <FileText className="h-12 w-12 text-teal-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2 mt-0">Document Preview</h3>
              <p className="text-gray-600">
                View and analyze CVs directly in the browser without downloading.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4 mt-0">
            Ready to streamline your recruitment process?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of recruiters and HR professionals who are already 
            using our platform to find the best candidates efficiently.
          </p>
          <Link to="/register">
            <Button 
              size="lg" 
              className="bg-white text-teal-700 hover:bg-gray-100"
            >
              Get Started for Free
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;