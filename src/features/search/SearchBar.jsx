import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { setQuery, selectSearchQuery, clearSearch } from './searchSlice';
import { useDebounce } from '../../hooks/useDebounce';
import './Search.css';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = useSelector(selectSearchQuery);
  const inputRef = useRef(null);

  // Sync Redux state with URL on mount
  useEffect(() => {
    const urlQuery = searchParams.get('q') || '';
    if (urlQuery !== query) {
      dispatch(setQuery(urlQuery));
    }
    inputRef.current?.focus();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    dispatch(setQuery(value));
  };

  const handleClear = () => {
    dispatch(clearSearch());
    setSearchParams({});
    inputRef.current?.focus();
  };

  // Debounced effect to update URL
  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    if (debouncedQuery) {
      setSearchParams({ q: debouncedQuery });
    } else if (searchParams.has('q')) {
      setSearchParams({});
    }
  }, [debouncedQuery]);

  return (
    <div className="search-bar-container">
      <div className="search-input-wrapper">
        <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
        </svg>
        <input
          ref={inputRef}
          type="text"
          className="search-input"
          placeholder="Search for podcasts, authors, or categories..."
          value={query}
          onChange={handleChange}
          autoFocus
        />
        {query && (
          <button className="clear-btn" onClick={handleClear} aria-label="Clear search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
