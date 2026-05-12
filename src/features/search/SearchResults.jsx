import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { 
  selectSearchResults, 
  selectSearchStatus, 
  selectSearchError, 
  fetchPodcasts 
} from './searchSlice';
import './Search.css';

const SearchResults = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const results = useSelector(selectSearchResults);
  const status = useSelector(selectSearchStatus);
  const error = useSelector(selectSearchError);
  const query = searchParams.get('q') || '';

  const handleRetry = () => {
    dispatch(fetchPodcasts(query));
  };

  if (status === 'loading') {
    return (
      <div className="search-status-container">
        <div className="skeleton-container">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="skeleton-card">
              <div className="skeleton-img"></div>
              <div className="skeleton-text-title"></div>
              <div className="skeleton-text-sub"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="search-status-container">
        <div className="error-message">
          <p>{error}</p>
          <button className="retry-btn" onClick={handleRetry}>Retry</button>
        </div>
      </div>
    );
  }

  if (!query) {
    return (
      <div className="search-status-container">
        <div className="empty-state">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M11 8v6"/><path d="M8 11h6"/>
          </svg>
          <p>Start searching for podcasts...</p>
        </div>
      </div>
    );
  }

  if (status === 'success' && results.length === 0) {
    return (
      <div className="search-status-container">
        <div className="empty-state">
          <p>No results found for "{query}"</p>
          <span className="empty-sub">Try searching for something else</span>
        </div>
      </div>
    );
  }

  return (
    <div className="search-results-grid">
      {results.map((podcast) => (
        <div key={podcast.id} className="podcast-card">
          <div className="podcast-img-wrap">
            <img src={podcast.imageUrl} alt={podcast.title} loading="lazy" />
            <div className="podcast-rating">
              <span>★</span> {podcast.rating}
            </div>
          </div>
          <div className="podcast-info">
            <h3 className="podcast-title">{podcast.title}</h3>
            <p className="podcast-author">{podcast.author}</p>
            <div className="podcast-meta">
              <span className="podcast-category">{podcast.category}</span>
              <span className="dot">•</span>
              <span className="podcast-episodes">{podcast.episodeCount} episodes</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
