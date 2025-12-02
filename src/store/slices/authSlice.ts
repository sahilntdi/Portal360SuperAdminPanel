import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { loginUser } from "../../ApiService/loginService";

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

const getInitialToken = (): string | null => {
  const cookies = document.cookie.split(";");
  for (let c of cookies) {
    const [name, value] = c.trim().split("=");
    if (name === "authToken") return value;
  }
  return null;
};

const initialState: AuthState = {
  user: null,
  token: getInitialToken(),
  isLoading: false,
  error: null,
};

export const login = createAsyncThunk(
  "auth/logins",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const deviceId =
        localStorage.getItem("deviceId") ||
        `device_${Math.random().toString(36).slice(2, 9)}_${Date.now()}`;

      const response = await loginUser({
        ...credentials,
        deviceId,
      });

      // Response contains { user, token }
      return response;
    } catch (err: any) {
      return rejectWithValue(err.message || "Login failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;

      document.cookie =
        "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      localStorage.removeItem("deviceId");
    },

    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;

        const user = action.payload?.user;  // FIXED
        const token = action.payload?.token; // FIXED

        state.user = user;
        state.token = token;

        if (token) {
          document.cookie = `authToken=${token}; path=/; max-age=86400`;
        }
      })

      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
