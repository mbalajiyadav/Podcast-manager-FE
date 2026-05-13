import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentEpisode } from '../../features/player/playerSlice';
import { playlistService } from '../../services/playlistService';
import { podcastService } from '../../services/podcastService';
import './Browse.css';

const Browse = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [featuredEpisodes, setFeaturedEpisodes] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [categories] = useState([
    'All', 'Music', 'True Crime', 'Business', 'Comedy', 'Wellness', 'News', 'Sports'
  ]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEpisodes = async () => {
      setIsLoading(true);
      try {
        const data = await podcastService.searchPodcasts('');
        setFeaturedEpisodes(data.slice(0, 3));
        setNewArrivals(data.slice(3, 9));
      } catch (error) {
        console.error('Error fetching episodes:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEpisodes();
  }, []);

  const filterEpisodes = (episodes) => {
    return episodes.filter(ep => {
      const matchesCategory = activeCategory === 'All' || ep.category === activeCategory;
      const matchesSearch = ep.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           ep.author.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  };

  const handlePlay = (e, ep) => {
    e.stopPropagation();
    dispatch(setCurrentEpisode({
      id: ep.id,
      title: ep.title,
      host: ep.author,
      audioUrl: ep.audioUrl,
      imageUrl: ep.imageUrl
    }));
  };

  const handleSave = async (e, ep) => {
    e.stopPropagation();
    try {
      await playlistService.addToPlaylist(ep.id);
      alert('Added to playlist!');
    } catch (err) {
      alert('Failed to save');
    }
  };

  const filteredFeatured = filterEpisodes(featuredEpisodes);
  const filteredNewArrivals = filterEpisodes(newArrivals);
  const hasResults = filteredFeatured.length > 0 || filteredNewArrivals.length > 0;

  // Icons
  const icons = {
    search: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
    filter: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="12" x2="12" y1="18" y2="22"/></svg>,
    play: <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
    bookmark: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>,
    mic: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>,
    brain: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><circle cx="12" cy="11" r="3"/><path d="M12 8v3"/><path d="M12 14v.01"/></svg>,
    music: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
  };

  const EpCard = ({ ep }) => (
    <div className="b-ep-card" onClick={() => navigate(`/episode/${ep.id}`)}>
      <div className="b-ep-art" style={{ backgroundColor: ep.artColor || '#713600' }}>
        {ep.imageUrl ? (
          <img src={ep.imageUrl} alt={ep.title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} />
        ) : (
          ep.category === 'True Crime' || ep.category === 'Sports' ? icons.mic : 
          ep.category === 'Self-improvement' ? icons.brain : icons.music
        )}
      </div>
      <div className="b-ep-body">
        <div className="b-ep-cat">{ep.category}</div>
        <div className="b-ep-title">{ep.title}</div>
        <div className="b-ep-host">{ep.author} · {ep.duration || '0 min'}</div>
        <div className="b-ep-footer">
          <div className="b-ep-plays">{icons.play} {ep.playCount || ep.plays || 0}</div>
          <div className="b-ep-actions">
            <button className="b-ep-save" onClick={(e) => handleSave(e, ep)}>{icons.bookmark}</button>
            <button className="b-ep-play-btn" onClick={(e) => handlePlay(e, ep)}>Play</button>
          </div>
        </div>
      </div>
    </div>
  );

  if (isLoading) return <div className="b-loading">Loading episodes...</div>;

  return (
    <>
      <div className="b-search-row">
        <div className="b-search-wrap">
          <i>{icons.search}</i>
          <input 
            className="b-search-input" 
            placeholder="Search episodes or hosts…" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="b-filter-btn">{icons.filter} Filter</button>
      </div>

      <div className="b-categories-row">
        {categories.map(cat => (
          <div 
            key={cat} 
            className={`b-cat-pill ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </div>
        ))}
      </div>

      {!hasResults && (
        <div className="b-no-results">
          No episodes found matching "{searchQuery}" in {activeCategory}
        </div>
      )}

      {filteredFeatured.length > 0 && (
        <>
          <div className="b-section-head">
            <div className="b-section-title">Featured episodes</div>
            <div className="b-see-all">See all →</div>
          </div>
          <div className="b-ep-grid">
            {filteredFeatured.map(ep => <EpCard key={ep.id} ep={ep} />)}
          </div>
        </>
      )}

      {filteredNewArrivals.length > 0 && (
        <>
          <div className="b-section-head">
            <div className="b-section-title">New arrivals</div>
            <div className="b-see-all">See all →</div>
          </div>
          <div className="b-ep-grid">
            {filteredNewArrivals.map(ep => <EpCard key={ep.id} ep={ep} />)}
          </div>
        </>
      )}
    </>
  );
};

export default Browse;
