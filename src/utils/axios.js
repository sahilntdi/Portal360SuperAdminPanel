import axios from "axios";

/* ---------------- COOKIE READER ---------------- */
function getCookie(name) {
  console.log("🍪 document.cookie:", document.cookie); // Debug

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

/* ---------------- AXIOS INSTANCE ---------------- */
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000,
  withCredentials: true, // REQUIRED for cookies
});

/* ---------------- REQUEST INTERCEPTOR ---------------- */
instance.interceptors.request.use(
  (config) => {
    const token = getCookie("authToken");

    console.log("🔑 Token from cookie:", token); // Debug

    // DEVICE ID
    const deviceId =
      localStorage.getItem("deviceId") ||
      `device_${Math.random().toString(36).slice(2, 9)}_${Date.now()}`;
    if (!localStorage.getItem("deviceId")) {
      localStorage.setItem("deviceId", deviceId);
    }
    config.headers["x-device-id"] = deviceId;

    if (config.method === "get") {
      config.headers["x-public-key"] = import.meta.env.VITE_SAAS_ADMIN_API_KEY;
      delete config.headers.Authorization;
    } else {
      if (token) {
        config.headers.Authorization = token;
      }
      delete config.headers["x-public-key"];
    }

    console.log("➡️ Final Headers:", config.headers); // Debug

    return config;
  },
  (error) => Promise.reject(error)
);

/* ---------------- RESPONSE INTERCEPTOR ---------------- */
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("❌ API ERROR:", error.response?.status, error.response?.data);

    if (error.response?.status === 401 && error.config?.method !== "get") {
      document.cookie =
        "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.href = "/auth";
    }

    return Promise.reject(error);
  }
);

export default instance;
