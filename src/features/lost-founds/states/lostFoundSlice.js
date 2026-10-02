import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api/lostFoundApi';
import { showErrorDialog, showSuccessDialog } from '../../../helpers/toolsHelper';

export const asyncGetLostFounds = createAsyncThunk('lostFound/getAll', async (query, { rejectWithValue }) => {
  try {
    const response = await api.getLostFounds(query);
    return response.data.lost_founds;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const asyncGetLostFoundById = createAsyncThunk('lostFound/getById', async (id, { rejectWithValue }) => {
  try {
    const response = await api.getLostFoundById(id);
    return response.data.lost_found;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const asyncCreateLostFound = createAsyncThunk('lostFound/create', async (payload, { rejectWithValue }) => {
  try {
    const response = await api.createLostFound(payload);
    showSuccessDialog('Laporan berhasil ditambahkan!');
    return response.data;
  } catch (error) {
    showErrorDialog(error.message);
    return rejectWithValue(error.message);
  }
});

export const asyncUpdateLostFound = createAsyncThunk('lostFound/update', async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await api.updateLostFound(id, data);
    showSuccessDialog('Laporan berhasil diperbarui!');
    return response.data.lost_found;
  } catch (error) {
    showErrorDialog(error.message);
    return rejectWithValue(error.message);
  }
});

export const asyncUpdateCover = createAsyncThunk('lostFound/updateCover', async ({ id, formData }, { rejectWithValue }) => {
  try {
    const response = await api.updateLostFoundCover(id, formData);
    showSuccessDialog('Cover berhasil diperbarui!');
    return response.data;
  } catch (error) {
    showErrorDialog(error.message);
    return rejectWithValue(error.message);
  }
});

export const asyncDeleteLostFound = createAsyncThunk('lostFound/delete', async (id, { rejectWithValue }) => {
  try {
    await api.deleteLostFound(id);
    showSuccessDialog('Laporan berhasil dihapus!');
    return id;
  } catch (error) {
    showErrorDialog(error.message);
    return rejectWithValue(error.message);
  }
});

export const asyncGetStats = createAsyncThunk('lostFound/stats', async (_, { rejectWithValue }) => {
  try {
    const [daily, monthly] = await Promise.all([api.getDailyStats(), api.getMonthlyStats()]);
    return { daily: daily.data, monthly: monthly.data };
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const lostFoundSlice = createSlice({
  name: 'lostFound',
  initialState: {
    lostFounds: [],
    lostFound: null,
    stats: null,
    isLostFounds: 'idle',
    isLostFound: 'idle',
    isLostFoundAdd: 'idle',
    isLostFoundChange: 'idle',
    isLostFoundChangeCover: 'idle',
    isLostFoundDelete: 'idle',
    isStats: 'idle',
  },
  reducers: {
    resetActionStates: (state) => {
      state.isLostFoundAdd = 'idle';
      state.isLostFoundChange = 'idle';
      state.isLostFoundChangeCover = 'idle';
      state.isLostFoundDelete = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncGetLostFounds.pending, (state) => { state.isLostFounds = 'pending'; })
      .addCase(asyncGetLostFounds.fulfilled, (state, action) => { state.isLostFounds = 'success'; state.lostFounds = action.payload; })
      
      .addCase(asyncGetLostFoundById.pending, (state) => { state.isLostFound = 'pending'; })
      .addCase(asyncGetLostFoundById.fulfilled, (state, action) => { state.isLostFound = 'success'; state.lostFound = action.payload; })
      
      .addCase(asyncCreateLostFound.pending, (state) => { state.isLostFoundAdd = 'pending'; })
      .addCase(asyncCreateLostFound.fulfilled, (state) => { state.isLostFoundAdd = 'success'; })
      
      .addCase(asyncUpdateLostFound.pending, (state) => { state.isLostFoundChange = 'pending'; })
      .addCase(asyncUpdateLostFound.fulfilled, (state, action) => { state.isLostFoundChange = 'success'; state.lostFound = action.payload; })
      
      .addCase(asyncDeleteLostFound.pending, (state) => { state.isLostFoundDelete = 'pending'; })
      .addCase(asyncDeleteLostFound.fulfilled, (state) => { state.isLostFoundDelete = 'success'; })

      .addCase(asyncGetStats.fulfilled, (state, action) => { state.isStats = 'success'; state.stats = action.payload; });
  }
});

export const { resetActionStates } = lostFoundSlice.actions;
export default lostFoundSlice.reducer;