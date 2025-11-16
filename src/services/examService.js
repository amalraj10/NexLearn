import axiosInstance from '@/lib/axios';

export const examService = {
  getQuestions: async () => {
    const response = await axiosInstance.get('/question/list');
    return response.data;
  },

  submitAnswers: async (answers) => {
    // The API expects FormData with 'answers' field containing JSON string
    const formData = new FormData();
    formData.append('answers', JSON.stringify(answers));
    
    const response = await axiosInstance.post('/answers/submit', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    
    return response.data;
  },
};
