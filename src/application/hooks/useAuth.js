// src/application/hooks/useAuth.js
import { useState, useCallback, useEffect } from 'react';
import { AuthService } from '../services/AuthService';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = () => {
      const authStatus = AuthService.isAuthenticated();
      setIsAuthenticated(authStatus);
    };
    checkAuth();
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email || !email.trim()) {
      return { isValid: false, error: 'Please enter your email address' };
    }
    
    if (!emailRegex.test(email.trim())) {
      return { isValid: false, error: 'Please enter a valid email address' };
    }
    
    return { isValid: true, error: null };
  };

  const validateOTP = (otp) => {
    const otpCode = Array.isArray(otp) ? otp.join('') : otp;
    
    if (!otpCode || otpCode.length !== 6) {
      return { isValid: false, error: 'Please enter the complete 6-digit OTP' };
    }
    
    if (!/^\d{6}$/.test(otpCode)) {
      return { isValid: false, error: 'OTP must contain only numbers' };
    }
    
    return { isValid: true, error: null };
  };

  const sendOTP = useCallback(async (email) => {
    const validation = validateEmail(email);
    if (!validation.isValid) {
      setError(validation.error);
      return { success: false, error: validation.error };
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await AuthService.sendOTP(email);
      
      if (!result.success) {
        setError(result.message);
      }

      return result;
    } catch {
      const errorMessage = 'Failed to send OTP. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const verifyOTP = useCallback(async (email, otp) => {
    const validation = validateOTP(otp);
    if (!validation.isValid) {
      setError(validation.error);
      return { success: false, error: validation.error };
    }

    setIsLoading(true);
    setError('');

    try {
      const otpCode = Array.isArray(otp) ? otp.join('') : otp;
      const result = await AuthService.verifyOTP(email, otpCode);
      
      if (result.success && result.user) {
        setUser(result.user);
        setIsAuthenticated(true);
      } else {
        setError(result.message);
      }

      return result;
    } catch {
      const errorMessage = 'Failed to verify OTP. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    
    try {
      await AuthService.logout();
      setUser(null);
      setError('');
      setIsAuthenticated(false);
      return { success: true };
    } catch {
      return { success: false, error: 'Logout failed' };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const verifyMasterOTP = useCallback(async (email, masterCode) => {
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      setError(emailValidation.error);
      return { success: false, error: emailValidation.error };
    }

    const otpValidation = validateOTP(masterCode);
    if (!otpValidation.isValid) {
      setError(otpValidation.error);
      return { success: false, error: otpValidation.error };
    }

    setIsLoading(true);
    setError('');

    try {
      const masterCodeString = Array.isArray(masterCode) ? masterCode.join('') : masterCode;
      const result = await AuthService.verifyMasterOTP(email, masterCodeString);

      if (result.success && result.user) {
        setUser(result.user);
        setIsAuthenticated(true);
      } else {
        setError(result.message);
      }

      return result;
    } catch {
      const errorMessage = 'Failed to verify master code. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError('');
  }, []);

  return {
    user,
    isLoading,
    error,
    isAuthenticated,
    sendOTP,
    verifyOTP,
    verifyMasterOTP,
    logout,
    clearError,
    validateEmail,
    validateOTP
  };
};

export default useAuth;