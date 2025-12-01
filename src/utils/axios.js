import axios from "axios";

/* ---------------- COOKIE READER ---------------- */
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

/* ---------------- AXIOS INSTANCE ---------------- */
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json"
  },
});

/* ---------------- REQUEST INTERCEPTOR ---------------- */
instance.interceptors.request.use(
  (config) => {
    const token = getCookie("authToken");

    // DEVICE ID
    const deviceId =
      localStorage.getItem("deviceId") ||
      `device_${Math.random().toString(36).slice(2, 9)}_${Date.now()}`;
    if (!localStorage.getItem("deviceId")) {
      localStorage.setItem("deviceId", deviceId);
    }
    config.headers["x-device-id"] = deviceId;

    /* =====================
       VERY IMPORTANT FIX
       ===================== */

    if (config.method === "get") {
      // GET MUST USE PUBLIC KEY
      config.headers["x-public-key"] = import.meta.env.VITE_SAAS_ADMIN_API_KEY;


      // GET MUST NOT USE Authorization
      delete config.headers.Authorization;
    } else {
      // POST/PUT/DELETE use Authorization token
      if (token) {
        config.headers.Authorization = token;
      }
      // remove x-public-key for POST
      delete config.headers["x-public-key"];
    }
    console.log("GET headers:", config.headers);

    return config;
  },
  (error) => Promise.reject(error)
);

/* ---------------- RESPONSE INTERCEPTOR ---------------- */
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only logout if token is invalid AND request was not GET
    if (
      error.response?.status === 401 &&
      error.config?.method !== "get"
    ) {
      document.cookie =
        "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.href = "/auth";
    }

    return Promise.reject(error);
  }
);

export default instance;
