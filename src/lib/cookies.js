// Cookie utility functions for client-side cookie management

export const setCookie = (name, value, days = 7) => {
  const maxAge = days * 24 * 60 * 60; // Convert days to seconds
  document.cookie = `${name}=${value}; path=/; max-age=${maxAge}; SameSite=Lax`;
};

export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

export const deleteCookie = (name) => {
  document.cookie = `${name}=; path=/; max-age=0`;
};

export const setAuthTokens = (accessToken, refreshToken) => {
  // Store in localStorage
  localStorage.setItem('access_token', accessToken);
  localStorage.setItem('refresh_token', refreshToken);
  
  // Store in cookies for middleware
  setCookie('access_token', accessToken, 7);
  if (refreshToken) {
    setCookie('refresh_token', refreshToken, 30);
  }
};

export const clearAuthTokens = () => {
  // Clear localStorage
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  
  // Clear cookies
  deleteCookie('access_token');
  deleteCookie('refresh_token');
};
