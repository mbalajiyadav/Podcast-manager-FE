import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../services/axiosInstance'

// Call this once on app load after login
export const fetchMasterData = createAsyncThunk(
  'master/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/master-data')
      return data
    } catch (err) {
      return rejectWithValue(err.response?.data)
    }
  }
)

const masterSlice = createSlice({
  name: 'master',
  initialState: {
    categories: [],
    roles: [],
    config: {},
    status: 'idle',  // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMasterData.pending, (s) => { s.status = 'loading' })
      .addCase(fetchMasterData.fulfilled, (s, { payload }) => {
        s.status = 'succeeded'
        s.categories = payload.categories
        s.roles = payload.roles
        s.config = payload.config
      })
      .addCase(fetchMasterData.rejected, (s, { payload }) => {
        s.status = 'failed'
        s.error = payload
      })
  },
})

export default masterSlice.reducer