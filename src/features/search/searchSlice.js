import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { podcastService } from '../../services/podcastService';

// Async thunk for searching podcasts
export const fetchPodcasts = createAsyncThunk(
  'search/fetchPodcasts',
  async (query, { signal, rejectWithValue }) => {
    try {
      if (!query) return [];
      const results = await podcastService.searchPodcasts(query, signal);
      return results;
    } catch (error) {
      if (error.name === 'AbortError') {
        // Request was cancelled, no need to show error
        return rejectWithValue('aborted');
      }
      return rejectWithValue(error.message || 'Failed to fetch podcasts');
    }
  }
);

const initialState = {
  results: [],
  status: 'idle', // 'idle' | 'loading' | 'success' | 'error'
  error: null,
  query: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    clearSearch: (state) => {
      state.results = [];
      state.status = 'idle';
      state.error = null;
      state.query = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPodcasts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPodcasts.fulfilled, (state, action) => {
        state.status = 'success';
        state.results = action.payload;
      })
      .addCase(fetchPodcasts.rejected, (state, action) => {
        if (action.payload === 'aborted') return;
        state.status = 'error';
        state.error = action.payload;
      });
  },
});

export const { setQuery, clearSearch } = searchSlice.actions;

// Selectors
export const selectSearchResults = (state) => state.search.results;
export const selectSearchStatus = (state) => state.search.status;
export const selectSearchError = (state) => state.search.error;
export const selectSearchQuery = (state) => state.search.query;

export default searchSlice.reducer;
