// src/utils/logout.ts
import { removeAuthTokens } from './axios';

export const logoutUser = (message?: string): void => {
  // Clear all tokens
  removeAuthTokens();
  
  // Clear query cache if using React Query
  if (window.queryClient) {
    window.queryClient.clear();
  }
  
  // Optional: Show logout message
  if (message) {
    console.log('Logout:', message);
  }
  
  // Redirect to login immediately
  window.location.href = '/auth';
};

// Global access
declare global {
  interface Window {
    logoutUser?: () => void;
    queryClient?: any;
  }
}

if (typeof window !== 'undefined') {
  window.logoutUser = () => logoutUser('Manual logout');
}