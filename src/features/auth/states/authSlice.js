import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, register } from '../api/authApi';
import { putAccessToken, getAccessToken } from '../../../helpers/apiHelper';
import { showErrorDialog } from '../../../helpers/toolsHelper';

// Async Thunks
export const asyncAuthLogin = createAsyncThunk(
  'auth/login',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await login(payload);
      putAccessToken(response.data.token);
      return response.data;
    } catch (error) {
      showErrorDialog(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const asyncAuthRegister = createAsyncThunk(
  'auth/register',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await register(payload);
      return response.data;
    } catch (error) {
      showErrorDialog(error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authUser: getAccessToken() ? true : null, // Sederhana: jika ada token, anggap login
    isAuthLogin: 'idle', // idle | pending | success | failed
    isAuthRegister: 'idle',
    isAuthLogout: 'idle',
  },
  reducers: {
    authLogout: (state) => {
      putAccessToken(null);
      state.authUser = null;
      state.isAuthLogout = 'success';
    },
    resetAuthStates: (state) => {
      state.isAuthLogin = 'idle';
      state.isAuthRegister = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(asyncAuthLogin.pending, (state) => { state.isAuthLogin = 'pending'; })
      .addCase(asyncAuthLogin.fulfilled, (state, action) => {
        state.isAuthLogin = 'success';
        state.authUser = true;
      })
      .addCase(asyncAuthLogin.rejected, (state) => { state.isAuthLogin = 'failed'; })
      // Register
      .addCase(asyncAuthRegister.pending, (state) => { state.isAuthRegister = 'pending'; })
      .addCase(asyncAuthRegister.fulfilled, (state) => { state.isAuthRegister = 'success'; })
      .addCase(asyncAuthRegister.rejected, (state) => { state.isAuthRegister = 'failed'; });
  }
});

export const { authLogout, resetAuthStates } = authSlice.actions;
export default authSlice.reducer;