import axios from "axios";

/* ====== READ COOKIE FUNCTION ====== */
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      const trimmed = cookie.trim();
      if (trimmed.startsWith(name + "=")) {
        cookieValue = trimmed.substring(name.length + 1);
        break;
      }
    }
  }
  return cookieValue;
}

/* ====== AXIOS INSTANCE ====== */
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 150000,
  withCredentials: true,
});

/* ===== REQUEST INTERCEPTOR ===== */
instance.interceptors.request.use((config) => {
  const token = getCookie("authToken");

  console.log("🍪 Cookie Read:", document.cookie);
  console.log("🔑 Token:", token);

  // device-id
  const deviceId =
    localStorage.getItem("deviceId") ||
    `device_${Math.random().toString(36).slice(2, 9)}_${Date.now()}`;

  localStorage.setItem("deviceId", deviceId);
  config.headers["x-device-id"] = deviceId;

  // ✨ ALWAYS SEND TOKEN
  if (token) config.headers.Authorization = `Bearer ${token}`;

  // GET me bhi x-public-key bhejni hai
  if (config.method === "get") {
    config.headers["x-public-key"] = import.meta.env.VITE_SAAS_ADMIN_API_KEY;
  }

  return config;
});

/* ===== RESPONSE INTERCEPTOR ===== */
instance.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error.response?.status;

    console.log("❌ API ERROR:", status);

    if (status === 401) {
      document.cookie =
        "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.href = "/auth";
    }

    return Promise.reject(error);
  }
);

export default instance;
