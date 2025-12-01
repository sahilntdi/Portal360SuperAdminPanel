import axios from "axios";

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

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000",
  timeout: 12000,
  headers: { "Content-Type": "application/json" },
});

instance.interceptors.request.use(
  (config) => {
    const token = getCookie("authToken");
    const deviceId =
      localStorage.getItem("deviceId") ||
      `device_${Math.random().toString(36).slice(2, 9)}_${Date.now()}`;

    if (!localStorage.getItem("deviceId")) {
      localStorage.setItem("deviceId", deviceId);
    }

    if (token) config.headers.Authorization = token;
    config.headers["x-device-id"] = deviceId;

    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      document.cookie =
        "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.href = "/auth";
    }
    return Promise.reject(error);
  }
);

export default instance;
