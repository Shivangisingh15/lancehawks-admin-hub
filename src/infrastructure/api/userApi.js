// src/infrastructure/api/userApi.js
import { BaseApi } from './baseApi';

export class UserApi extends BaseApi {
  static async getAllUsers(params = {}) {
    try {
      const data = await this.get('/admin/users', params);
      return {
        success: true,
        users: data.data.users || [],
        pagination: data.data.pagination || {},
        filters: data.data.filters || {}
      };
    } catch (error) {
      return {
        success: false,
        message: this.handleError(error),
        users: [],
        pagination: {},
        filters: {}
      };
    }
  }

  static async getUserStats() {
    try {
      const data = await this.get('/admin/stats');
      return {
        success: true,
        stats: data.data.statistics || {}
      };
    } catch (error) {
      return {
        success: false,
        message: this.handleError(error),
        stats: {}
      };
    }
  }

  static async createUser(userData) {
    try {
      const data = await this.post('/admin/users/create', userData);
      return {
        success: true,
        message: data.message || 'User created successfully',
        user: data.data.user
      };
    } catch (error) {
      return {
        success: false,
        message: this.handleError(error)
      };
    }
  }

  static async updateUserStatus(userId, isActive) {
    try {
      const data = await this.put(`/admin/users/${userId}/status`, {
        is_active: isActive
      });
      return {
        success: true,
        message: data.message || 'User status updated successfully',
        user: data.data.user
      };
    } catch (error) {
      return {
        success: false,
        message: this.handleError(error)
      };
    }
  }

  static async deleteUser(userId) {
    try {
      const data = await this.delete(`/admin/users/${userId}`);
      return {
        success: true,
        message: data.message || 'User deleted successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: this.handleError(error)
      };
    }
  }

  static async getUserById(userId) {
    try {
      const data = await this.get(`/admin/users/${userId}`);
      return {
        success: true,
        user: data.data.user
      };
    } catch (error) {
      return {
        success: false,
        message: this.handleError(error)
      };
    }
  }
}