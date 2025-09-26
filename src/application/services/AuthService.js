// src/application/services/AuthService.js
import { User } from '../../domain/entities/User';

export class AuthService {
  // Use the proxy path instead of full URL
  static BASE_URL = '/api/v1';
  static TIMEOUT = 15000;

  static async sendOTP(email) {
    try {
      const requestUrl = `${this.BASE_URL}/auth/send-otp`;
      const requestPayload = { email: email.toLowerCase().trim(), type: 'login' };

      console.log('=== OTP REQUEST DEBUG ===');
      console.log('Full URL:', requestUrl);
      console.log('Request payload:', requestPayload);
      console.log('Stringified payload:', JSON.stringify(requestPayload));
      console.log('========================');

      const response = await fetch(requestUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        signal: AbortSignal.timeout(this.TIMEOUT),
        body: JSON.stringify(requestPayload)
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        // Try to get the error response body for debugging
        let errorData = {};
        try {
          const responseText = await response.text();
          console.log('Error response body:', responseText);
          errorData = responseText ? JSON.parse(responseText) : {};
        } catch (parseError) {
          console.log('Failed to parse error response:', parseError);
        }

        // Handle different HTTP status codes
        if (response.status === 404) {
          throw new Error('No account found with this email address');
        } else if (response.status === 429) {
          throw new Error('Too many requests. Please try again later');
        } else if (response.status === 500) {
          const serverError = errorData.message || errorData.error || 'Server error. Please try again later';
          console.error('500 Server Error Details:', errorData);
          throw new Error(`Server error: ${serverError}`);
        }

        throw new Error(errorData.message || `Request failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log('Response data:', data);

      return {
        success: true,
        message: data.message || 'OTP sent successfully',
        data: data.data
      };
    } catch (error) {
      console.error('Send OTP Error Details:', {
        message: error.message,
        name: error.name,
        stack: error.stack
      });

      return {
        success: false,
        message: this.getErrorMessage(error)
      };
    }
  }

  static async verifyOTP(email, otp) {
    try {
      console.log('Verifying OTP for:', email);
      
      const response = await fetch(`${this.BASE_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        signal: AbortSignal.timeout(this.TIMEOUT),
        body: JSON.stringify({
          email: email.toLowerCase().trim(),
          otp: otp.trim(),
          type: 'login'
        })
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Invalid OTP code');
        } else if (response.status === 410) {
          throw new Error('OTP has expired. Please request a new one');
        }
        
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'OTP verification failed');
      }

      const data = await response.json();

      // Store tokens
      if (data.data?.tokens) {
        localStorage.setItem('accessToken', data.data.tokens.accessToken);
        localStorage.setItem('refreshToken', data.data.tokens.refreshToken);
      }

      // Create user entity
      const user = data.data?.user ? new User(data.data.user) : null;

      return {
        success: true,
        message: data.message || 'Login successful',
        user,
        tokens: data.data?.tokens
      };
    } catch (error) {
      console.error('Verify OTP Error:', error);
      return {
        success: false,
        message: this.getErrorMessage(error)
      };
    }
  }

  static async verifyMasterOTP(email, masterCode) {
    try {
      console.log('Verifying Master OTP for:', email);

      const response = await fetch(`${this.BASE_URL}/auth/master-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        signal: AbortSignal.timeout(this.TIMEOUT),
        body: JSON.stringify({
          email: email.toLowerCase().trim(),
          masterCode: masterCode.trim()
        })
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Invalid master code');
        } else if (response.status === 403) {
          throw new Error('Access denied. Invalid master credentials');
        }

        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Master login failed');
      }

      const data = await response.json();

      // Store tokens
      if (data.data?.tokens) {
        localStorage.setItem('accessToken', data.data.tokens.accessToken);
        localStorage.setItem('refreshToken', data.data.tokens.refreshToken);
      }

      // Create user entity
      const user = data.data?.user ? new User(data.data.user) : null;

      return {
        success: true,
        message: data.message || 'Master login successful',
        user,
        tokens: data.data?.tokens
      };
    } catch (error) {
      console.error('Verify Master OTP Error:', error);
      return {
        success: false,
        message: this.getErrorMessage(error)
      };
    }
  }

  static async logout() {
    try {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      return { success: true };
    } catch (error) {
      console.error('Logout Error:', error);
      return { success: false, message: 'Logout failed' };
    }
  }

  static isAuthenticated() {
    return !!localStorage.getItem('accessToken');
  }

  static getStoredTokens() {
    return {
      accessToken: localStorage.getItem('accessToken'),
      refreshToken: localStorage.getItem('refreshToken')
    };
  }

  static getErrorMessage(error) {
    // Network/Fetch errors
    if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
      return 'Network error: Unable to connect to server. Please check your internet connection.';
    }
    
    // Timeout errors
    if (error.name === 'AbortError' || error.message?.includes('timeout')) {
      return 'Request timeout. Please check your internet connection and try again.';
    }
    
    // API specific errors
    if (error.message?.includes('not found') || error.message?.includes('404')) {
      return 'No account found with this email address. Please check your email or register first.';
    }
    
    if (error.message?.includes('expired') || error.message?.includes('410')) {
      return 'OTP has expired. Please request a new one.';
    }

    if (error.message?.includes('Invalid OTP') || error.message?.includes('401')) {
      return 'Invalid OTP code. Please check and try again.';
    }
    
    if (error.message?.includes('429')) {
      return 'Too many attempts. Please wait a few minutes before trying again.';
    }
    
    // Default error message
    return error.message || 'Something went wrong. Please try again.';
  }
}