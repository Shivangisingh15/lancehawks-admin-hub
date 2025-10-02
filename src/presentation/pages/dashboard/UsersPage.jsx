// src/presentation/pages/dashboard/UsersPage.jsx
import React, { useState } from 'react';
import { Users, Search, Filter, Plus, RefreshCw, UserCheck, UserX } from 'lucide-react';
import useUsers from '../../../application/hooks/useUsers';
import UserCard from "../../../presentation/components/users/UserCard";
import CreateUserModal from "../../../presentation/components/users/CreateUserModal";

const UsersPage = () => {
  const {
    users,
    stats,
    pagination,
    // filters,
    isLoading,
    error,
    createUser,
    suspendUser,
    activateUser,
    deleteUser,
    updateFilters,
    clearFilters,
    changePage,
    refreshUsers
  } = useUsers();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    updateFilters({ search: value || null });
  };

  const handleStatusFilter = (status) => {
    setActiveFilter(status);
    if (status === 'all') {
      updateFilters({ is_active: null });
    } else if (status === 'active') {
      updateFilters({ is_active: true });
    } else if (status === 'suspended') {
      updateFilters({ is_active: false });
    }
  };

  const handleRoleFilter = (role) => {
    setRoleFilter(role);
    if (role === 'all') {
      updateFilters({ role_id: null });
    } else {
      updateFilters({ role_id: parseInt(role) });
    }
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setActiveFilter('all');
    setRoleFilter('all');
    clearFilters();
  };

  const handleCreateUser = async (userData) => {
    return await createUser(userData);
  };

  const handleSuspendUser = async (userId) => {
    return await suspendUser(userId);
  };

  const handleActivateUser = async (userId) => {
    return await activateUser(userId);
  };

  const handleDeleteUser = async (userId) => {
    return await deleteUser(userId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
              <p className="text-gray-600">Manage and monitor all system users</p>
            </div>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
            >
              <Plus className="h-5 w-5" />
              Create User
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Users</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {(stats.active_users || 0) + (stats.inactive_users || 0)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Active Users</p>
                  <p className="text-3xl font-bold text-green-600">{stats.active_users || 0}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <UserCheck className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Suspended</p>
                  <p className="text-3xl font-bold text-orange-600">{stats.inactive_users || 0}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                  <UserX className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="Search by email or employee ID..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="flex gap-2">
              <button
                onClick={() => handleStatusFilter('all')}
                className={`px-4 py-3 rounded-xl font-medium transition-all ${
                  activeFilter === 'all'
                    ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => handleStatusFilter('active')}
                className={`px-4 py-3 rounded-xl font-medium transition-all ${
                  activeFilter === 'active'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Active
              </button>
              <button
                onClick={() => handleStatusFilter('suspended')}
                className={`px-4 py-3 rounded-xl font-medium transition-all ${
                  activeFilter === 'suspended'
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Suspended
              </button>
            </div>

            {/* Role Filter */}
            <select
              value={roleFilter}
              onChange={(e) => handleRoleFilter(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:outline-none bg-white"
            >
              <option value="all">All Roles</option>
              <option value="1">User</option>
              <option value="2">Admin</option>
              <option value="3">Moderator</option>
            </select>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={handleClearFilters}
                className="px-4 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-all inline-flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Clear
              </button>
              <button
                onClick={refreshUsers}
                disabled={isLoading}
                className="px-4 py-3 rounded-xl border-2 border-violet-300 text-violet-700 font-medium hover:bg-violet-50 transition-all inline-flex items-center gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700">
            {error}
          </div>
        </div>
      )}

      {/* Users Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-6">
        {isLoading && users.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl animate-pulse mx-auto mb-4"></div>
              <p className="text-gray-600">Loading users...</p>
            </div>
          </div>
        ) : users.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No users found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters or create a new user</p>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2 shadow-lg transition-all"
            >
              <Plus className="h-5 w-5" />
              Create First User
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  onSuspend={handleSuspendUser}
                  onActivate={handleActivateUser}
                  onDelete={handleDeleteUser}
                />
              ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <button
                  onClick={() => changePage(pagination.currentPage - 1)}
                  disabled={!pagination.hasPrev}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-all"
                >
                  Previous
                </button>
                
                <div className="flex items-center gap-2">
                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => changePage(page)}
                      className={`w-10 h-10 rounded-lg font-medium transition-all ${
                        page === pagination.currentPage
                          ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-md'
                          : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => changePage(pagination.currentPage + 1)}
                  disabled={!pagination.hasNext}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-all"
                >
                  Next
                </button>
              </div>
            )}

            {/* Results Info */}
            <div className="mt-4 text-center text-sm text-gray-600">
              Showing {users.length} of {pagination.totalUsers} users
            </div>
          </>
        )}
      </div>

      {/* Create User Modal */}
      <CreateUserModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateUser}
        isLoading={isLoading}
      />
    </div>
  );
};

export default UsersPage;