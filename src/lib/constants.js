// API Configuration
export const API_BASE_URL = 'https://nexlearn.noviindusdemosites.in';

// Storage Keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  TEMP_MOBILE: 'temp_mobile',
  TEMP_COUNTRY_CODE: 'temp_country_code',
};

// Country Codes
export const COUNTRY_CODES = [
  { code: '+91', flag: '🇮🇳', country: 'India' },
  { code: '+1', flag: '🇺🇸', country: 'USA' },
  { code: '+44', flag: '🇬🇧', country: 'UK' },
  { code: '+971', flag: '🇦🇪', country: 'UAE' },
];

// Question Status
export const QUESTION_STATUS = {
  ANSWERED: 'answered',
  NOT_ATTENDED: 'not-attended',
  MARKED: 'marked',
  MARKED_ANSWERED: 'marked-answered',
};

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/auth/login',
  VERIFY_OTP: '/auth/verify-otp',
  CREATE_PROFILE: '/auth/create-profile',
  EXAM: '/exam',
  EXAM_TEST: '/exam/test',
  EXAM_RESULTS: '/exam/results',
};
