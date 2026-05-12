import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../features/search/SearchBar';
import SearchResults from '../features/search/SearchResults';
import { fetchPodcasts } from '../features/search/searchSlice';

const SearchPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  useEffect(() => {
    // Dispatch search when URL query changes
    const promise = dispatch(fetchPodcasts(query));

    // Cleanup: Cancel the request if the component unmounts or query changes
    return () => {
      promise.abort();
    };
  }, [dispatch, query]);

  return (
    <div className="search-page-container">
      <header className="search-header">
        <h1 className="search-page-title">Explore Podcasts</h1>
        <SearchBar />
      </header>
      <main className="search-content">
        <SearchResults />
      </main>
    </div>
  );
};

export default SearchPage;
