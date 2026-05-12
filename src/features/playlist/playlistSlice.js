import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Full playlist items
  status: 'idle',
  activeCategory: 'All',
  sortByLatest: false,
};

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    setPlaylistItems: (state, action) => {
      state.items = action.payload;
    },
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
    toggleSortByLatest: (state) => {
      state.sortByLatest = !state.sortByLatest;
    },
    incrementPlayCount: (state, action) => {
      const podcastId = action.payload;
      const podcast = state.items.find(item => item.id === podcastId);
      if (podcast) {
        podcast.playCount = (podcast.playCount || 0) + 1;
      }
    },
    resetFilters: (state) => {
      state.activeCategory = 'All';
      state.sortByLatest = false;
    }
  }
});

export const { 
  setPlaylistItems, 
  setActiveCategory, 
  toggleSortByLatest, 
  incrementPlayCount,
  resetFilters 
} = playlistSlice.actions;

// Selectors
export const selectPlaylistItems = (state) => state.playlist.items;
export const selectActiveCategory = (state) => state.playlist.activeCategory;
export const selectSortByLatest = (state) => state.playlist.sortByLatest;

// Memoized Selector for filtered and sorted playlist
export const selectFilteredPlaylist = createSelector(
  [selectPlaylistItems, selectActiveCategory, selectSortByLatest],
  (items, activeCategory, sortByLatest) => {
    let filteredList = [...items];

    // 1. Filter by category
    if (activeCategory !== 'All') {
      filteredList = filteredList.filter(item => item.category === activeCategory);
    }

    // 2. Sort by latest (addedAt)
    if (sortByLatest) {
      filteredList.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
    }

    return filteredList;
  }
);

// Selector for unique categories in current playlist
export const selectPlaylistCategories = createSelector(
  [selectPlaylistItems],
  (items) => {
    const categories = items.map(item => item.category);
    return ['All', ...new Set(categories)];
  }
);

export default playlistSlice.reducer;
