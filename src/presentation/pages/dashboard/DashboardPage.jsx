// src/presentation/pages/dashboard/DashboardPage.jsx
import React, { useState } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import UsersPage from './UsersPage';

const DashboardPage = ({ user, onLogout }) => {
  const [currentPage, setCurrentPage] = useState('user');

  const renderPage = () => {
    switch (currentPage) {
      case 'user':
        return <UsersPage />;
      case 'overview':
        return <div className="p-8"><h1 className="text-2xl font-bold">Overview Page - Coming Soon</h1></div>;
      case 'portfolios':
        return <div className="p-8"><h1 className="text-2xl font-bold">Portfolios Page - Coming Soon</h1></div>;
      default:
        return <UsersPage />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar user={user} onLogout={onLogout} onNavigate={setCurrentPage} />
      <main className="flex-1 overflow-y-auto">
        {renderPage()}
      </main>
    </div>
  );
};

export default DashboardPage;