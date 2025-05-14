import React from 'react';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CVProvider } from './context/CVContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import RequireAdmin from './components/RequireAdmin';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow bg-gray-50">
            <Outlet />
          </main>
          <Footer />
        </div>
      }
    >
      <Route index element={<HomePage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="forgot-password" element={<ForgotPasswordPage />} />
      <Route path="dashboard" element={<UserDashboard />} />
      <Route
        path="admin"
        element={
          <RequireAdmin>
            <AdminDashboard />
          </RequireAdmin>
        }
      />
    </Route>
  )
);

function App() {
  return (
    <AuthProvider>
      <CVProvider>
        <RouterProvider router={router} />
      </CVProvider>
    </AuthProvider>
  );
}

export default App;