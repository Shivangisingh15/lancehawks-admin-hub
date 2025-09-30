// src/presentation/components/users/UserCard.jsx
import React, { useState } from 'react';
import { Mail, Calendar, Shield, CheckCircle, XCircle, AlertCircle, Trash2, UserX, UserCheck } from 'lucide-react';

const UserCard = ({ user, onSuspend, onActivate, onDelete }) => {
  const [showActions, setShowActions] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const getRoleBadgeColor = (roleId) => {
    switch (roleId) {
      case 1: return 'bg-blue-100 text-blue-700 border-blue-200';
      case 2: return 'bg-violet-100 text-violet-700 border-violet-200';
      case 3: return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getInitials = (email) => {
    return email.split('@')[0].slice(0, 2).toUpperCase();
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleSuspend = async () => {
    setIsProcessing(true);
    await onSuspend(user.id);
    setIsProcessing(false);
    setShowActions(false);
  };

  const handleActivate = async () => {
    setIsProcessing(true);
    await onActivate(user.id);
    setIsProcessing(false);
    setShowActions(false);
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${user.email}?`)) {
      setIsProcessing(true);
      await onDelete(user.id);
      setIsProcessing(false);
      setShowActions(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden group">
      <div className="p-6">
        {/* Header with Avatar and Status */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            {user.profile_picture_url ? (
              <img
                src={user.profile_picture_url}
                alt={user.email}
                className="w-16 h-16 rounded-full object-cover border-2 border-violet-100"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                {getInitials(user.email)}
              </div>
            )}
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {user.email.split('@')[0]}
              </h3>
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getRoleBadgeColor(user.role_id)}`}>
                  <Shield className="h-3 w-3" />
                  {user.role_name}
                </span>
                {user.is_active ? (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
                    <CheckCircle className="h-3 w-3" />
                    Active
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 border border-red-200">
                    <XCircle className="h-3 w-3" />
                    Suspended
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="relative">
            <button
              onClick={() => setShowActions(!showActions)}
              disabled={isProcessing}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="h-5 w-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="5" r="2"/>
                <circle cx="12" cy="12" r="2"/>
                <circle cx="12" cy="19" r="2"/>
              </svg>
            </button>

            {showActions && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                {user.is_active ? (
                  <button
                    onClick={handleSuspend}
                    disabled={isProcessing}
                    className="w-full px-4 py-2 text-left text-sm text-orange-600 hover:bg-orange-50 flex items-center gap-2"
                  >
                    <UserX className="h-4 w-4" />
                    Suspend User
                  </button>
                ) : (
                  <button
                    onClick={handleActivate}
                    disabled={isProcessing}
                    className="w-full px-4 py-2 text-left text-sm text-green-600 hover:bg-green-50 flex items-center gap-2"
                  >
                    <UserCheck className="h-4 w-4" />
                    Activate User
                  </button>
                )}
                <button
                  onClick={handleDelete}
                  disabled={isProcessing}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete User
                </button>
              </div>
            )}
          </div>
        </div>

        {/* User Details */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Mail className="h-4 w-4 text-violet-500" />
            <span className="truncate">{user.email}</span>
            {user.email_verified && (
              <CheckCircle className="h-4 w-4 text-green-500" />
            )}
          </div>

          {user.employee_id && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Shield className="h-4 w-4 text-violet-500" />
              <span>{user.employee_id}</span>
            </div>
          )}

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4 text-violet-500" />
            <span>Joined {formatDate(user.created_at)}</span>
          </div>

          {user.last_login && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <AlertCircle className="h-4 w-4 text-violet-500" />
              <span>Last login: {formatDate(user.last_login)}</span>
            </div>
          )}

          {user.is_admin_created && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500">
                Created by: {user.created_by_email || 'System'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer Gradient */}
      <div className="h-1 bg-gradient-to-r from-violet-500 to-purple-600"></div>
    </div>
  );
};

export default UserCard;