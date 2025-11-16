'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/authService';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/slices/authSlice';
import { AuthLayout, AuthHeader, OTPInput, AuthButton, ErrorMessage } from '@/components/auth';

export default function VerifyOTPPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendLoading, setResendLoading] = useState(false);

  useEffect(() => {
    document.title = "Verify OTP | NexLearn";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Verify the OTP sent to your mobile number to continue with NexLearn');
    }

    const tempMobile = localStorage.getItem('temp_mobile');
    if (!tempMobile) {
      router.push('/auth/login');
    } else {
      setMobile(tempMobile);
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join('');
    
    if (otpString.length !== 6) {
      setError('Please enter complete OTP');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await authService.verifyOTP(mobile, otpString);
      
      if (response.success) {
        router.push('/auth/create-profile');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP');
      setOtp(['', '', '', '', '', '']);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    setError('');
    try {
      await authService.sendOTP(mobile);
      alert('OTP resent successfully!');
    } catch (err) {
      setError('Failed to resend OTP');
    } finally {
      setResendLoading(false);
    }
  };

  const maskMobile = (num) => {
    if (!num) return num;
    const countryCode = num.match(/^\+\d+/)?.[0] || '';
    const numberPart = num.replace(countryCode, '');
    if (numberPart.length < 4) return num;
    return `${countryCode} ${'*'.repeat(numberPart.length - 2)}${numberPart.slice(-2)}`;
  };

  return (
    <AuthLayout>
      <div>
        <AuthHeader 
          title="Enter the code we texted you"
          description={`We've sent an SMS to ${maskMobile(mobile)}`}
        />

        <OTPInput
          otp={otp}
          setOtp={setOtp}
          disabled={loading}
        />

        <ErrorMessage message={error} />

        <button
          onClick={handleResend}
          disabled={resendLoading}
          style={{
            background: 'none',
            border: 'none',
            color: '#3b82f6',
            fontSize: '0.875rem',
            fontWeight: '600',
            cursor: 'pointer',
            textDecoration: 'underline',
            padding: 0
          }}
        >
          {resendLoading ? 'Sending...' : 'Resend code'}
        </button>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <AuthButton
          onClick={handleSubmit}
          disabled={loading || otp.join('').length !== 6}
          loading={loading}
          loadingText="Verifying..."
        >
          Verify & Continue
        </AuthButton>
      </div>
    </AuthLayout>
  );
}
