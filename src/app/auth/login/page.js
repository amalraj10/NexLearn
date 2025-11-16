'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/authService';
import { AuthLayout, AuthHeader, PhoneInput, AuthButton, ErrorMessage } from '@/components/auth';

export default function LoginPage() {
  useEffect(() => {
    document.title = "Login | NexLearn";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Login to NexLearn with your phone number to access online examinations and tests');
    }
  }, []);
  const router = useRouter();
  const [countryCode, setCountryCode] = useState('+91');
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!mobile || mobile.length < 10) {
      setError('Please enter a valid mobile number');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const fullMobile = `${countryCode}${mobile}`;
      const response = await authService.sendOTP(fullMobile);
      if (response.success) {
        localStorage.setItem('temp_mobile', fullMobile);
        localStorage.setItem('temp_country_code', countryCode);
        router.push('/auth/verify-otp');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div>
        <AuthHeader 
          title="Enter your phone number"
          description="We use your mobile number to identify your account"
        />
        
        <PhoneInput
          countryCode={countryCode}
          setCountryCode={setCountryCode}
          mobile={mobile}
          setMobile={setMobile}
          disabled={loading}
        />

        <ErrorMessage message={error} />

        <p style={{
          fontSize: '0.8125rem',
          color: '#9ca3af',
          lineHeight: '1.5'
        }}>
          By tapping Get Started, you agree to the{' '}
          <span style={{ 
            color: '#3b82f6', 
            cursor: 'pointer',
            textDecoration: 'underline'
          }}>
            Terms & Conditions
          </span>
        </p>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <AuthButton
          onClick={handleSubmit}
          disabled={loading || mobile.length < 10}
          loading={loading}
          loadingText="Sending OTP..."
        >
          Get Started
        </AuthButton>
      </div>
    </AuthLayout>
  );
}
