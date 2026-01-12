// src/utils/axios.js
import axios from "axios";

let isTokenExpiredModalShown = false;

/* ====== GET TOKEN ====== */
function getAuthToken() {
  // Priority: Cookie > localStorage
  const cookieMatch = document.cookie.match(/authToken=([^;]+)/);
  return cookieMatch ? cookieMatch[1] : localStorage.getItem('authToken');
}

/* ====== SET TOKEN ====== */
function setAuthToken(token) {
  // Set in cookie (primary)
  const maxAge = 60 * 60 * 24 * 7; // 7 days
  document.cookie = `authToken=${token}; path=/; max-age=${maxAge}; SameSite=Strict`;
  
  // Also set in localStorage (backup)
  localStorage.setItem('authToken', token);
}

/* ====== REMOVE TOKENS ====== */
function removeAuthTokens() {
  // Remove from cookie
  document.cookie = "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  document.cookie = "authToken=; path=/admin; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  
  // Remove from localStorage
  localStorage.removeItem('authToken');
  localStorage.removeItem('deviceId');
  
  // Clear session storage
  sessionStorage.clear();
  
  // Trigger logout event
  localStorage.setItem('logout', Date.now().toString());
  window.dispatchEvent(new Event('storage'));
}

/* ====== CHECK AUTHENTICATION ====== */
function isAuthenticated() {
  const token = getAuthToken();
  if (!token) return false;
  
  // Check if token is valid JWT format
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    
    // Check expiration if token has payload
    const payload = JSON.parse(atob(parts[1]));
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      removeAuthTokens();
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
}

/* ====== SHOW EXPIRATION MODAL ====== */
function showTokenExpiredModal() {
  if (isTokenExpiredModalShown || document.getElementById('token-expired-modal')) return;
  isTokenExpiredModalShown = true;

  const modal = document.createElement('div');
  modal.id = 'token-expired-modal';
  modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4';
  modal.innerHTML = `
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-6 animate-zoom-in border border-gray-200 dark:border-gray-700">
      <div class="flex flex-col items-center text-center space-y-5">
        <div class="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center animate-pulse-subtle">
          <svg class="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>
        
        <div class="space-y-2 animate-fade-in-up">
          <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100">Session Expired</h3>
          <p class="text-gray-600 dark:text-gray-300">Your login session has expired for security reasons.</p>
          <p class="text-sm text-gray-500 dark:text-gray-400">Please login again to continue.</p>
        </div>
        
        <div class="flex flex-col gap-3 w-full pt-2 animate-slide-up">
          <button id="logoutBtn" class="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all duration-200 hover:shadow-lg active:scale-[0.98] animate-pulse-subtle">
            Logout Now
          </button>
          <button id="autoLogoutBtn" class="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg font-medium transition-all duration-200 hover:shadow active:scale-[0.98]">
            Auto Redirect in <span id="countdown" class="font-bold animate-countdown-pulse">4</span>s
          </button>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';

  const logoutBtn = modal.querySelector('#logoutBtn');
  const autoLogoutBtn = modal.querySelector('#autoLogoutBtn');
  const countSpan = autoLogoutBtn.querySelector('#countdown');

  // Manual logout
  logoutBtn.addEventListener('click', () => {
    removeAuthTokens();
    window.location.href = '/auth';
  });

  // Auto logout with countdown
  let countdown = 4;
  const countdownInterval = setInterval(() => {
    countdown--;
    countSpan.textContent = countdown.toString();
    
    if (countdown <= 0) {
      clearInterval(countdownInterval);
      removeAuthTokens();
      window.location.href = '/auth';
    }
  }, 1000);

  // Auto trigger after 5 seconds
  setTimeout(() => {
    if (document.body.contains(modal)) {
      logoutBtn.click();
    }
  }, 5000);

  // Cleanup function
  modal._cleanup = () => {
    clearInterval(countdownInterval);
    if (modal.parentNode) {
      modal.parentNode.removeChild(modal);
    }
    isTokenExpiredModalShown = false;
    document.body.style.overflow = '';
  };
}

/* ====== AXIOS INSTANCE ====== */
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 150000,
  withCredentials: true,
});

/* ===== REQUEST INTERCEPTOR ===== */
instance.interceptors.request.use((config) => {
  // Get device ID
  let deviceId = localStorage.getItem("deviceId");
  if (!deviceId) {
    deviceId = `device_${Math.random().toString(36).slice(2, 9)}_${Date.now()}`;
    localStorage.setItem("deviceId", deviceId);
  }
  config.headers["x-device-id"] = deviceId;

  // Add auth token if available
  const token = getAuthToken();
  if (token && !config._skipAuth) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Add public key for public endpoints
  if (config.method === "get" && !config._skipAuth) {
    config.headers["x-public-key"] = import.meta.env.VITE_SAAS_ADMIN_API_KEY;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

/* ===== RESPONSE INTERCEPTOR ===== */
instance.interceptors.response.use(
  (response) => {
    // Update token if new one received
    if (response.data?.token) {
      setAuthToken(response.data.token);
    }
    
    // Cleanup any expired modal on successful response
    const modal = document.getElementById('token-expired-modal');
    if (modal && modal._cleanup) {
      modal._cleanup();
    }
    
    return response;
  },
  (error) => {
    const status = error.response?.status;
    const config = error.config;

    if (status === 401) {
      // Skip if already retrying or on auth page
      if (!config?._retry && !window.location.pathname.includes('/auth')) {
        config._retry = true;
        
        // Check if user was actually authenticated
        if (isAuthenticated()) {
          showTokenExpiredModal();
        } else {
          removeAuthTokens();
          window.location.href = '/auth';
        }
      }
    } else if (status === 403) {
      console.warn('Access forbidden. Check user permissions.');
    }

    return Promise.reject(error);
  }
);

// Export functions
export { getAuthToken, setAuthToken, removeAuthTokens, isAuthenticated };
export default instance;