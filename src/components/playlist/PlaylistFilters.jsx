import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  setActiveCategory, 
  toggleSortByLatest, 
  selectActiveCategory, 
  selectSortByLatest,
  selectPlaylistCategories 
} from '../../features/playlist/playlistSlice';
import './PlaylistFilters.css';

const PlaylistFilters = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectPlaylistCategories);
  const activeCategory = useSelector(selectActiveCategory);
  const sortByLatest = useSelector(selectSortByLatest);

  const handleCategoryClick = (category) => {
    dispatch(setActiveCategory(category));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSortToggle = () => {
    dispatch(toggleSortByLatest());
  };

  return (
    <div className="playlist-filters">
      <div className="filter-scroll">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-chip ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => handleCategoryClick(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="filter-divider"></div>
      <button 
        className={`sort-latest-btn ${sortByLatest ? 'active' : ''}`}
        onClick={handleSortToggle}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-3 3-3-3"/><path d="M12 3v18"/><path d="m9 6 3-3 3 3"/>
        </svg>
        Latest
      </button>
    </div>
  );
};

export default PlaylistFilters;
