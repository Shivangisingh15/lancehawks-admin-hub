// src/application/hooks/useUsers.js
import { useState, useCallback, useEffect } from 'react';
import { UserApi } from '../../infrastructure/api/userApi';

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [pagination, setPagination] = useState({});
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    role_id: null,
    is_active: null,
    search: null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const params = {};
      if (filters.page) params.page = filters.page;
      if (filters.limit) params.limit = filters.limit;
      if (filters.role_id) params.role_id = filters.role_id;
      if (filters.is_active !== null) params.is_active = filters.is_active;
      if (filters.search) params.search = filters.search;

      const result = await UserApi.getAllUsers(params);
      
      if (result.success) {
        setUsers(result.users);
        setPagination(result.pagination);
      } else {
        setError(result.message);
        setUsers([]);
      }
    } catch {
      setError('Failed to fetch users');
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  const fetchStats = useCallback(async () => {
    try {
      const result = await UserApi.getUserStats();
      if (result.success) {
        setStats(result.stats);
      }
    } catch {
      console.error('Failed to fetch stats');
    }
  }, []);

  const createUser = useCallback(async (userData) => {
    setIsLoading(true);
    setError('');
    
    try {
      const result = await UserApi.createUser(userData);
      
      if (result.success) {
        await fetchUsers();
        await fetchStats();
        return { success: true, message: result.message };
      } else {
        setError(result.message);
        return { success: false, message: result.message };
      }
    } catch {
      const message = 'Failed to create user';
      setError(message);
      return { success: false, message };
    } finally {
      setIsLoading(false);
    }
  }, [fetchUsers, fetchStats]);

  const suspendUser = useCallback(async (userId) => {
    setIsLoading(true);
    setError('');
    
    try {
      const result = await UserApi.updateUserStatus(userId, false);
      
      if (result.success) {
        await fetchUsers();
        await fetchStats();
        return { success: true, message: result.message };
      } else {
        setError(result.message);
        return { success: false, message: result.message };
      }
    } catch {
      const message = 'Failed to suspend user';
      setError(message);
      return { success: false, message };
    } finally {
      setIsLoading(false);
    }
  }, [fetchUsers, fetchStats]);

  const activateUser = useCallback(async (userId) => {
    setIsLoading(true);
    setError('');
    
    try {
      const result = await UserApi.updateUserStatus(userId, true);
      
      if (result.success) {
        await fetchUsers();
        await fetchStats();
        return { success: true, message: result.message };
      } else {
        setError(result.message);
        return { success: false, message: result.message };
      }
    } catch {
      const message = 'Failed to activate user';
      setError(message);
      return { success: false, message };
    } finally {
      setIsLoading(false);
    }
  }, [fetchUsers, fetchStats]);

  const deleteUser = useCallback(async (userId) => {
    setIsLoading(true);
    setError('');
    
    try {
      const result = await UserApi.deleteUser(userId);
      
      if (result.success) {
        await fetchUsers();
        await fetchStats();
        return { success: true, message: result.message };
      } else {
        setError(result.message);
        return { success: false, message: result.message };
      }
    } catch {
      const message = 'Failed to delete user';
      setError(message);
      return { success: false, message };
    } finally {
      setIsLoading(false);
    }
  }, [fetchUsers, fetchStats]);

  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: 1 }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      page: 1,
      limit: 10,
      role_id: null,
      is_active: null,
      search: null
    });
  }, []);

  const changePage = useCallback((newPage) => {
    setFilters(prev => ({ ...prev, page: newPage }));
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    users,
    stats,
    pagination,
    filters,
    isLoading,
    error,
    createUser,
    suspendUser,
    activateUser,
    deleteUser,
    updateFilters,
    clearFilters,
    changePage,
    refreshUsers: fetchUsers
  };
};

export default useUsers;