// src/presentation/pages/dashboard/DashboardPage.jsx
import React from 'react';
import Sidebar from '@/presentation/components/layout/Sidebar';
import { Sparkles, Calendar, Users, BarChart3 } from 'lucide-react';

const DashboardPage = ({ user, onLogout }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar user={user} onLogout={onLogout} />
      
      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.getDisplayName()}!</h1>
              <p className="text-gray-600">Here's what's happening with your projects today.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Last login</p>
                <p className="text-sm font-medium text-gray-900">{user?.getLastLoginFormatted()}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-violet-500 flex items-center justify-center text-white font-semibold">
                {user?.getInitials()}
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6">
          {/* Coming Soon Card */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-3xl p-8 lg:p-12 text-center border border-violet-100">
              <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Sparkles className="h-10 w-10 text-white" />
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Dashboard Coming Soon
              </h2>
              
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                We're building something amazing! Your comprehensive project management dashboard 
                will be available soon with real-time analytics, team insights, and powerful tools.
              </p>

              {/* Feature Preview */}
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="h-6 w-6 text-violet-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Real-time Analytics</h3>
                  <p className="text-gray-600 text-sm">Track project progress with live data and insights</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Team Management</h3>
                  <p className="text-gray-600 text-sm">Manage your team members and their permissions</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Project Timeline</h3>
                  <p className="text-gray-600 text-sm">Visualize deadlines and project milestones</p>
                </div>
              </div>

              {/* Status */}
              <div className="mt-12 inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full border border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Development in Progress</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;