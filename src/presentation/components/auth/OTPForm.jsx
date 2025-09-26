// src/presentation/components/auth/OTPForm.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Shield, ArrowLeft, Loader2 } from 'lucide-react';

const OTPForm = ({ email, onSubmit, onBack, onResend, isLoading, error }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [resendCooldown, setResendCooldown] = useState(0);
  const inputRefs = useRef([]);

  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '');
    
    if (pastedData.length === 6) {
      const newOtp = pastedData.split('');
      setOtp(newOtp);
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpCode = otp.join('');
    if (otpCode.length === 6) {
      onSubmit(email, otp);
    }
  };

  const handleResend = () => {
    setResendCooldown(60);
    onResend(email);
  };

  const isOtpComplete = otp.every(digit => digit !== '');

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
        <button 
          onClick={onBack}
          disabled={isLoading}
          className="absolute top-6 left-6 p-2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        
        <div className="text-center mb-8 mt-8">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Code</h2>
          <p className="text-gray-600 mb-4">
            Enter the 6-digit code sent to
          </p>
          <p className="text-sm font-medium text-violet-600">{email}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
              Enter Verification Code
            </label>
            <div className="flex justify-center gap-3 mb-4" onPaste={handlePaste}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={el => inputRefs.current[index] = el}
                  type="text"
                  inputMode="numeric"
                  pattern="\d*"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
                  aria-label={`Digit ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || !isOtpComplete}
            className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Verifying...
              </>
            ) : (
              'Verify & Login'
            )}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={handleResend}
              disabled={isLoading || resendCooldown > 0}
              className="text-sm text-violet-600 hover:text-violet-700 font-medium disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {resendCooldown > 0 
                ? `Resend code in ${resendCooldown}s` 
                : "Didn't receive code? Resend"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OTPForm;