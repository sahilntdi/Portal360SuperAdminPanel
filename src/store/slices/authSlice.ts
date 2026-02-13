// src/store/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { loginUser } from "../../ApiService/loginService";
import { initializeFCMToken, cleanupFCMToken } from "../../utils/fcm.service";

/* ================= TYPES ================= */

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

/* ================= HELPERS ================= */

// 🔍 Read token from cookie
const getInitialToken = (): string | null => {
  const cookies = document.cookie.split(";");
  for (let c of cookies) {
    const [name, value] = c.trim().split("=");
    if (name === "authToken") {
      return value;
    }
  }
  return null;
};

// 🔍 Read user from localStorage
const getInitialUser = (): User | null => {
  try {
    const stored = localStorage.getItem("authUser");
    if (stored) {
      return JSON.parse(stored);
    }
    return null;
  } catch (err) {
    console.error("❌ Failed to parse authUser:", err);
    return null;
  }
};

/* ================= INITIAL STATE ================= */

const initialState: AuthState = {
  user: getInitialUser(),
  token: getInitialToken(),
  isLoading: false,
  error: null,
};

console.log("🟢 Auth initialState:", initialState);

/* ================= ASYNC THUNK ================= */

export const login = createAsyncThunk(
  "auth/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const deviceId =
        localStorage.getItem("deviceId") ||
        `device_${Math.random().toString(36).slice(2, 9)}_${Date.now()}`;

      localStorage.setItem("deviceId", deviceId);

      const response = await loginUser({
        ...credentials,
        deviceId,
      });

      console.log("✅ Login API response:", response);

      return response;
    } catch (err: any) {
      console.error("❌ Login error:", err);
      return rejectWithValue(err.error || "Login failed");
    }
  }
);

/* ================= SLICE ================= */

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logout: (state) => {
      console.log("🚪 Logout triggered");

      state.user = null;
      state.token = null;
      state.error = null;

      cleanupFCMToken().catch(console.error);

      document.cookie =
        "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      localStorage.removeItem("deviceId");
      localStorage.removeItem("authUser");

    },

    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        console.log("⏳ Login pending...");
        state.isLoading = true;
        state.error = null;
      })

      .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {

        state.isLoading = false;

        const user = action.payload?.user ?? null;
        const token = action.payload?.token ?? null;

        state.user = user;
        state.token = token;

        if (token) {
          document.cookie = `authToken=${token}; path=/; max-age=86400`;
        }

        if (user) {
          localStorage.setItem("authUser", JSON.stringify(user));
        }

        initializeFCMToken()
          .then((success) => {
            if (success) {
              console.log("FCM token initialized successfully");
            } else {
              console.log("ℹFCM token initialization skipped");
            }
          })
          .catch((error) => {
            console.error("FCM initialization error:", error);
          });
      })

      .addCase(login.rejected, (state, action) => {
        console.error("❌ Login rejected:", action.payload);
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

/* ================= EXPORTS ================= */

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;