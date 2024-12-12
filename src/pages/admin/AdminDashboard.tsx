import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../../components/admin/layout/AdminLayout';
import AdminOverview from './dashboard/AdminOverview';
import AdminApplications from './applications/AdminApplications';
import AdminQueue from './queue/AdminQueue';
import AdminUsers from './users/AdminUsers';
import AdminReports from './reports/AdminReports';
import AdminSettings from './settings/AdminSettings';

const AdminDashboard: React.FC = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route index element={<AdminOverview />} />
        <Route path="applications" element={<AdminApplications />} />
        <Route path="queue" element={<AdminQueue />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="settings" element={<AdminSettings />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminDashboard;