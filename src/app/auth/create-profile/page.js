'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/authService';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/slices/authSlice';
import { TextField } from '@mui/material';
import { AuthLayout, AuthHeader, AuthButton, ErrorMessage } from '@/components/auth';
import { setAuthTokens } from '@/lib/cookies';

export default function CreateProfilePage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [mobile, setMobile] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    qualification: '',
  });
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const tempMobile = localStorage.getItem('temp_mobile');
    if (!tempMobile) {
      router.push('/auth/login');
    } else {
      setMobile(tempMobile);
    }
  }, [router]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!profileImage) {
      setError('Please upload a profile image');
      return;
    }

    setLoading(true);

    try {
      const response = await authService.createProfile(
        mobile,
        formData.name,
        formData.email,
        formData.qualification,
        profileImage
      );

      if (response.success) {
        // Store tokens in both localStorage and cookies
        setAuthTokens(response.access_token, response.refresh_token);
        
        // Clean up temp data
        localStorage.removeItem('temp_mobile');
        localStorage.removeItem('temp_country_code');
        
        // Update Redux state
        dispatch(setUser(response.user));
        
        // Navigate to exam instructions
        router.push('/exam');
      } else {
        setError(response.message || 'Profile creation failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to create profile');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = formData.name && formData.email && formData.qualification && profileImage;

  return (
    <AuthLayout>
      <div>
        <AuthHeader 
          title="Add Your Details"
          description="Complete your profile to get started"
        />

        <form onSubmit={handleSubmit}>
          {/* Profile Image Upload */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <div
              onClick={() => fileInputRef.current?.click()}
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                border: '2px dashed #d1d5db',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                overflow: 'hidden',
                backgroundColor: '#f9fafb'
              }}
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <svg style={{ width: '2.5rem', height: '2.5rem', color: '#9ca3af' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          </div>

          <TextField
            fullWidth
            label="Name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter your Full Name"
            disabled={loading}
            sx={{
              marginBottom: '1.25rem',
              '& .MuiOutlinedInput-root': { borderRadius: '8px' },
              '& .MuiInputLabel-root': { fontSize: '0.875rem' },
            }}
          />

          <TextField
            fullWidth
            label="Email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Enter your Email Address"
            disabled={loading}
            sx={{
              marginBottom: '1.25rem',
              '& .MuiOutlinedInput-root': { borderRadius: '8px' },
              '& .MuiInputLabel-root': { fontSize: '0.875rem' },
            }}
          />

          <TextField
            fullWidth
            label="Your qualification"
            required
            value={formData.qualification}
            onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
            placeholder="Enter your qualification"
            disabled={loading}
            sx={{
              marginBottom: '1.5rem',
              '& .MuiOutlinedInput-root': { borderRadius: '8px' },
              '& .MuiInputLabel-root': { fontSize: '0.875rem' },
            }}
          />

          <ErrorMessage message={error} />
        </form>
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <AuthButton
          onClick={handleSubmit}
          disabled={loading || !isFormValid}
          loading={loading}
          loadingText="Creating Profile..."
        >
          Get Started
        </AuthButton>
      </div>
    </AuthLayout>
  );
}
