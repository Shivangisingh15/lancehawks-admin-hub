// src/infrastructure/api/baseApi.js
export class BaseApi {
  static BASE_URL = 'https://projectmanagement-backend.vercel.app/api/v1';
  static TIMEOUT = 15000;

  static getAuthHeaders() {
    const token = localStorage.getItem('accessToken');
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }

  static async request(endpoint, options = {}) {
    try {
      const url = `${this.BASE_URL}${endpoint}`;
      
      const config = {
        ...options,
        headers: {
          ...this.getAuthHeaders(),
          ...options.headers
        },
        signal: AbortSignal.timeout(this.TIMEOUT)
      };

      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        if (response.status === 401) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/';
          throw new Error('Session expired. Please login again.');
        }

        throw new Error(errorData.message || `Request failed with status ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  static async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    
    return this.request(url, {
      method: 'GET'
    });
  }

  static async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  static async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  static async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE'
    });
  }

  static handleError(error) {
    if (error.name === 'AbortError' || error.message?.includes('timeout')) {
      return 'Request timeout. Please check your connection.';
    }
    return error.message || 'Something went wrong. Please try again.';
  }
}