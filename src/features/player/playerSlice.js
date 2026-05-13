import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentEpisode: null, // { id, title, host, audioUrl, imageUrl }
  isPlaying: false,
  volume: 1.0,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setCurrentEpisode: (state, action) => {
      state.currentEpisode = action.payload;
      state.isPlaying = true;
    },
    togglePlay: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    setPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    setVolume: (state, action) => {
      state.volume = action.payload;
    },
  },
});

export const { 
  setCurrentEpisode, 
  togglePlay, 
  setPlaying, 
  setVolume 
} = playerSlice.actions;

export const selectCurrentEpisode = (state) => state.player.currentEpisode;
export const selectIsPlaying = (state) => state.player.isPlaying;
export const selectVolume = (state) => state.player.volume;

export default playerSlice.reducer;
