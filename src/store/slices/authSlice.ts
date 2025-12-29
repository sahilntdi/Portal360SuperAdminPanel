import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { loginUser } from "../../ApiService/loginService";

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
      console.log("🍪 authToken found in cookie:", value);
      return value;
    }
  }
  console.log("🍪 authToken NOT found in cookie");
  return null;
};

// 🔍 Read user from localStorage
const getInitialUser = (): User | null => {
  try {
    const stored = localStorage.getItem("authUser");
    if (stored) {
      // console.log("💾 authUser found in localStorage:", JSON.parse(stored));
      return JSON.parse(stored);
    }
    console.log("💾 authUser NOT found in localStorage");
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
      // console.log("➡️ Login payload:", credentials);

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
      return rejectWithValue(err.message || "Login failed");
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

      document.cookie =
        "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      localStorage.removeItem("deviceId");
      localStorage.removeItem("authUser");

      // console.log("🧹 Cleared auth state, cookie & localStorage");
    },

    clearError: (state) => {
      // console.log("🧼 Clearing auth error");
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
        // console.log("🎉 Login fulfilled payload:", action.payload);

        state.isLoading = false;

        const user = action.payload?.user ?? null;
        const token = action.payload?.token ?? null;

        // console.log("👤 User set to:", user);
        // console.log("🔑 Token set to:", token);

        state.user = user;
        state.token = token;

        if (token) {
          document.cookie = `authToken=${token}; path=/; max-age=86400`;
          // console.log("🍪 authToken saved to cookie");
        }

        if (user) {
          localStorage.setItem("authUser", JSON.stringify(user));
          // console.log("💾 authUser saved to localStorage");
        }
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
