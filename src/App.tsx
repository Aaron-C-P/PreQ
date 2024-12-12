import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AuthPage from './components/Auth/AuthPage';
import AdminAuthPage from './components/Auth/admin/AdminAuthPage';
import CsoAuthPage from './components/Auth/cso/CsoAuthPage';
import DashboardLayout from './components/dashboard/DashboardLayout';
import DashboardHome from './pages/DashboardHome';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import ApplicationForm from './pages/ApplicationForm';
import AdminDashboard from './pages/admin/AdminDashboard';
import CsoPage from './components/cso/CsoPage';
import AuthGuard from './components/Auth/AuthGuard';
import AuthRedirect from './components/Auth/AuthRedirect';
import NotificationsPage from './pages/NotificationsPage';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={
            <AuthRedirect>
              <AuthPage isSignup={false} />
            </AuthRedirect>
          }
        />
        <Route
          path="/admin/login"
          element={
            <AuthRedirect>
              <AdminAuthPage />
            </AuthRedirect>
          }
        />
        <Route
          path="/cso/login"
          element={
            <AuthRedirect>
              <CsoAuthPage />
            </AuthRedirect>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthRedirect>
              <AuthPage isSignup={true} />
            </AuthRedirect>
          }
        />

        {/* Protected user routes */}
        <Route
          path="/dashboard"
          element={
            <AuthGuard>
              <DashboardLayout />
            </AuthGuard>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="apply" element={<ApplicationForm />} />
        </Route>

        {/* Protected admin routes */}
        <Route
          path="/admin/*"
          element={
            <AuthGuard requireAdmin>
              <AdminDashboard />
            </AuthGuard>
          }
        />

        {/* Protected CSO routes */}
        <Route
          path="/cso/*"
          element={
            <AuthGuard requireCso>
              <CsoPage />
            </AuthGuard>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;