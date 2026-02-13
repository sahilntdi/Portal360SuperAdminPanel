export const isAuthenticated = (): boolean => {
  // Check cookie
  const cookieToken = document.cookie.split('; ').find(row => row.startsWith('authToken='));
  if (cookieToken) return true;
  
  // Check localStorage (fallback)
  const localStorageToken = localStorage.getItem('authToken');
  return !!localStorageToken;
};

export const getAuthToken = (): string | null => {
  // Try cookie first
  const cookieMatch = document.cookie.match(/authToken=([^;]+)/);
  if (cookieMatch) return cookieMatch[1];
  
  // Fallback to localStorage
  return localStorage.getItem('authToken');
};