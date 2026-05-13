import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../features/auth/authSlice';
import './Landing.css';

import { podcastService } from '../../services/podcastService';
import { adminService } from '../../services/adminService';

const Landing = () => {
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const [stats, setStats] = useState({
    episodes: '0',
    hosts: '0',
    listeners: '0'
  });

  const [categories, setCategories] = useState([
    { id: 1, name: 'Music & DJ Mixes', count: '...', icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg> },
    { id: 2, name: 'News & Affairs', count: '...', icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" /><path d="M18 14h-8" /><path d="M15 18h-5" /><path d="M10 6h8v4h-8V6Z" /></svg> },
    { id: 3, name: 'Business', count: '...', icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg> },
    { id: 4, name: 'Health & Wellness', count: '...', icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg> }
  ]);

  const [trendingEpisodes, setTrendingEpisodes] = useState([]);

  useEffect(() => {
    const fetchLandingData = async () => {
      try {
        const statsData = await adminService.getPlatformStats();
        setStats({
          episodes: `${statsData.totalEpisodes}+`,
          hosts: `${statsData.activeHosts}+`,
          listeners: `${statsData.listeners}+`
        });

        const podcasts = await podcastService.searchPodcasts('');
        setTrendingEpisodes(podcasts.slice(0, 3).map(p => ({
          id: p.id,
          category: p.category,
          title: p.title,
          host: p.author,
          plays: p.playCount.toLocaleString(),
          artColor: '#713600'
        })));
      } catch (error) {
        console.error('Error fetching landing data:', error);
      }
    };
    fetchLandingData();
  }, []);

  const handleEpisodeClick = (e, epId) => {
    if (!isAuth) {
      e.preventDefault();
      navigate('/login');
    }
  };

  return (
    <div className="landing-page">
      <nav className="nav">
        <Link to="/" className="logo">pod<span>cast</span></Link>
        <div className="nav-links">
          <a className="nav-link" href="#browse">Browse</a>
          <a className="nav-link" href="#categories">Categories</a>
          <a className="nav-link" href="#trending">Trending</a>
          <Link to="/login" className="nav-btn-ghost">Log in</Link>
          <Link to="/register" className="nav-btn">Get started</Link>
        </div>
      </nav>

      <div className="hero">
        <div className="hero-left">
          <div className="hero-tag">Your audio universe</div>
          <h1 className="hero-h1">Discover stories<br />that move <span>you.</span></h1>
          <p className="hero-sub">Stream thousands of podcast episodes across every genre. Hosted by creators who care, curated by an admin who approves only the best.</p>
          <div className="hero-btns">
            <Link to="/dashboard" className="btn-primary">Start listening</Link>
            <Link to="/register" className="btn-secondary">Become a host</Link>
          </div>
          <div className="stats-row">
            <div className="stat">
              <div className="stat-n">{stats.episodes}</div>
              <div className="stat-l">Episodes live</div>
            </div>
            <div className="stat">
              <div className="stat-n">{stats.hosts}</div>
              <div className="stat-l">Active hosts</div>
            </div>
            <div className="stat">
              <div className="stat-n">{stats.listeners}</div>
              <div className="stat-l">Listeners</div>
            </div>
          </div>
        </div>
      </div>

      <div id="categories" className="categories">
        <div className="section-header">
          <div className="section-title">Browse by category</div>
          <div className="section-sub">Jump into what you love most</div>
        </div>
        <div className="cat-grid">
          {categories.map(cat => (
            <div key={cat.id} className="cat-card">
              <div className="cat-icon" style={{ marginBottom: '16px', display: 'block' }}>{cat.icon}</div>
              <div className="cat-name">{cat.name}</div>
              <div className="cat-count">{cat.count}</div>
            </div>
          ))}
        </div>
      </div>

      <div id="trending" className="episodes">
        <div className="section-header">
          <div className="section-title">Trending episodes</div>
          <div className="section-sub">Most played this week</div>
        </div>
        <div className="ep-grid">
          {trendingEpisodes.map(ep => (
            <Link
              to={`/episode/${ep.id}`}
              key={ep.id}
              className="ep-card"
              style={{ textDecoration: 'none' }}
              onClick={(e) => handleEpisodeClick(e, ep.id)}
            >
              <div className="ep-art" style={{ backgroundColor: ep.artColor }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" x2="12" y1="19" y2="22" /></svg>
              </div>
              <div className="ep-body">
                <div className="ep-cat">{ep.category}</div>
                <div className="ep-card-title">{ep.title}</div>
                <div className="ep-card-host">{ep.host}</div>
                <div className="ep-card-footer">
                  <div className="ep-plays">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '4px' }}><polygon points="5 3 19 12 5 21 5 3" /></svg>
                    {ep.plays} plays
                  </div>
                  <div className="ep-play-btn">Play</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Landing;
