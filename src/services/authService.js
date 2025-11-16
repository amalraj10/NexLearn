import axiosInstance from '@/lib/axios';

export const authService = {
  sendOTP: async (mobile) => {
    const formData = new FormData();
    formData.append('mobile', mobile);
    const response = await axiosInstance.post('/auth/send-otp', formData);
    return response.data;
  },

  verifyOTP: async (mobile, otp) => {
    const formData = new FormData();
    formData.append('mobile', mobile);
    formData.append('otp', otp);
    const response = await axiosInstance.post('/auth/verify-otp', formData);
    return response.data;
  },

  createProfile: async (mobile, name, email, qualification, profileImage) => {
    const formData = new FormData();
    formData.append('mobile', mobile);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('qualification', qualification);
    formData.append('profile_image', profileImage);
    const response = await axiosInstance.post('/auth/create-profile', formData);
    return response.data;
  },

  logout: async () => {
    const response = await axiosInstance.post('/auth/logout');
    return response.data;
  },
};
