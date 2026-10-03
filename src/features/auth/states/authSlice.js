import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi, registerApi } from '../api/authApi';

export const asyncRegister = createAsyncThunk(
  'auth/asyncRegister',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await registerApi(payload);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Registrasi gagal.');
    }
  }
);

export const asyncLogin = createAsyncThunk(
  'auth/asyncLogin',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await loginApi(credentials);
      // Ekstrak token dari berbagai kemungkinan struktur respon API
      const token =
        response?.data?.token ||
        response?.data?.accessToken ||
        response?.token ||
        response?.accessToken;

      if (token) {
        localStorage.setItem('token', token);
      }
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Login gagal.');
    }
  }
);

export const asyncAuthRegister = asyncRegister;
export const asyncAuthLogin = asyncLogin;

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      state.user = null;
      state.token = null;
    },
    clearAuthStatus: (state) => {
      state.error = null;
      state.successMessage = null;
    },
    resetAuthStates: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message || 'Registrasi berhasil!';
      })
      .addCase(asyncRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(asyncLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncLogin.fulfilled, (state, action) => {
        state.loading = false;
        const token =
          action.payload?.data?.token ||
          action.payload?.data?.accessToken ||
          action.payload?.token;
        state.token = token || null;
        state.user = action.payload?.data?.user || null;
      })
      .addCase(asyncLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearAuthStatus, resetAuthStates } = authSlice.actions;
export const authLogout = logout;
export default authSlice.reducer;