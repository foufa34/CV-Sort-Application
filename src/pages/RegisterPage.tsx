import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Select from '../components/ui/Select';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [specialization, setSpecialization] = useState<string>('');
  const [yearsOfExperience, setYearsOfExperience] = useState<string>('');
  const [role, setRole] = useState<'user' | 'admin'>('user');
  const [error, setError] = useState<string>('');
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    
    try {
      await register(
        name, 
        email, 
        password, 
        specialization,
        yearsOfExperience ? parseInt(yearsOfExperience) : undefined,
        role
      );
      navigate('/dashboard');
    } catch {
      setError('Registration failed. Please try again with different credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <UserPlus className="h-12 w-12 text-blue-900" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create a new account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link to="/login" className="font-medium text-blue-900 hover:text-blue-800">
            sign in to your existing account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 p-4 rounded-md flex">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              label="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              label="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Input
              id="confirm-password"
              name="confirm-password"
              type="password"
              autoComplete="new-password"
              required
              label="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Select
              id="role"
              name="role"
              label="Account Type"
              options={[
                { value: 'user', label: 'User' },
                { value: 'admin', label: 'Admin' }
              ]}
              value={role}
              onChange={(value) => setRole(value as 'user' | 'admin')}
              required
            />

            <Select
              id="specialization"
              name="specialization"
              label="Specialization"
              options={specializations}
              value={specialization}
              onChange={setSpecialization}
            />

            <Select
              id="experience"
              name="experience"
              label="Years of experience"
              options={experienceOptions}
              value={yearsOfExperience}
              onChange={setYearsOfExperience}
            />

            <Button
              type="submit"
              className="w-full"
              isLoading={isLoading}
            >
              Register
            </Button>
          </form>
          
          <div className="mt-6">
            <p className="text-xs text-center text-gray-500">
              By registering, you agree to our{' '}
              <a href="#" className="text-blue-900 hover:text-blue-800">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-blue-900 hover:text-blue-800">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;