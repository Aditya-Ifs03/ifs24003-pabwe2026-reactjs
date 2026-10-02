import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllUsers, getProfile, updateProfile, updateProfilePhoto, updatePassword } from '../api/userApi';
import { showSuccessDialog, showErrorDialog } from '../../../helpers/toolsHelper';

export const asyncGetAllUsers = createAsyncThunk('users/getAll', async (_, { rejectWithValue }) => {
  try {
    const response = await getAllUsers();
    return response.data.users; // Sesuaikan dengan struktur respons API Delcom
  } catch (error) {
    showErrorDialog(error.message);
    return rejectWithValue(error.message);
  }
});

export const asyncGetProfile = createAsyncThunk('users/getProfile', async (_, { rejectWithValue }) => {
  try {
    const response = await getProfile();
    return response.data.user;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const asyncUpdateProfile = createAsyncThunk('users/updateProfile', async (payload, { rejectWithValue }) => {
  try {
    const response = await updateProfile(payload);
    showSuccessDialog('Profil berhasil diperbarui!');
    return response.data.user;
  } catch (error) {
    showErrorDialog(error.message);
    return rejectWithValue(error.message);
  }
});

export const asyncUpdateProfilePhoto = createAsyncThunk('users/updatePhoto', async (formData, { rejectWithValue }) => {
  try {
    const response = await updateProfilePhoto(formData);
    showSuccessDialog('Foto profil berhasil diperbarui!');
    return response.data.user;
  } catch (error) {
    showErrorDialog(error.message);
    return rejectWithValue(error.message);
  }
});

export const asyncUpdatePassword = createAsyncThunk('users/updatePassword', async (payload, { rejectWithValue }) => {
  try {
    await updatePassword(payload);
    showSuccessDialog('Kata sandi berhasil diubah!');
    return true;
  } catch (error) {
    showErrorDialog(error.message);
    return rejectWithValue(error.message);
  }
});

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    profile: null,
    isUsers: 'idle', // idle | pending | success | failed
    isProfile: 'idle',
    isChangeProfile: 'idle',
    isChangeProfilePhoto: 'idle',
    isChangeProfilePassword: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get All Users
      .addCase(asyncGetAllUsers.pending, (state) => { state.isUsers = 'pending'; })
      .addCase(asyncGetAllUsers.fulfilled, (state, action) => {
        state.isUsers = 'success';
        state.users = action.payload;
      })
      .addCase(asyncGetAllUsers.rejected, (state) => { state.isUsers = 'failed'; })
      // Get Profile
      .addCase(asyncGetProfile.pending, (state) => { state.isProfile = 'pending'; })
      .addCase(asyncGetProfile.fulfilled, (state, action) => {
        state.isProfile = 'success';
        state.profile = action.payload;
      })
      .addCase(asyncGetProfile.rejected, (state) => { state.isProfile = 'failed'; })
      // Update Profile
      .addCase(asyncUpdateProfile.pending, (state) => { state.isChangeProfile = 'pending'; })
      .addCase(asyncUpdateProfile.fulfilled, (state, action) => {
        state.isChangeProfile = 'success';
        state.profile = action.payload;
      })
      .addCase(asyncUpdateProfile.rejected, (state) => { state.isChangeProfile = 'failed'; })
      // Update Photo
      .addCase(asyncUpdateProfilePhoto.pending, (state) => { state.isChangeProfilePhoto = 'pending'; })
      .addCase(asyncUpdateProfilePhoto.fulfilled, (state, action) => {
        state.isChangeProfilePhoto = 'success';
        state.profile = action.payload;
      })
      .addCase(asyncUpdateProfilePhoto.rejected, (state) => { state.isChangeProfilePhoto = 'failed'; })
      // Update Password
      .addCase(asyncUpdatePassword.pending, (state) => { state.isChangeProfilePassword = 'pending'; })
      .addCase(asyncUpdatePassword.fulfilled, (state) => { state.isChangeProfilePassword = 'success'; })
      .addCase(asyncUpdatePassword.rejected, (state) => { state.isChangeProfilePassword = 'failed'; });
  }
});

export default userSlice.reducer;