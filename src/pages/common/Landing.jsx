import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  // Mock data states - these can be easily replaced by API calls later
  const [stats, setStats] = useState({
    episodes: '2.4k+',
    hosts: '180+',
    listeners: '12k+'
  });

  const [categories, setCategories] = useState([
    { id: 1, name: 'Music & DJ Mixes', count: '312 episodes', icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg> },
    { id: 2, name: 'News & Affairs', count: '198 episodes', icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/></svg> },
    { id: 3, name: 'Business', count: '245 episodes', icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg> },
    { id: 4, name: 'Health & Wellness', count: '167 episodes', icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg> }
  ]);

  const [trendingEpisodes, setTrendingEpisodes] = useState([
    { 
      id: 1, 
      category: 'True Crime', 
      title: 'The Vanishing of Room 12', 
      host: 'Priya Menon', 
      plays: '8.2k',
      artColor: '#713600'
    },
    { 
      id: 2, 
      category: 'Self-improvement', 
      title: 'Morning Rituals That Work', 
      host: 'Ravi Krishnan', 
      plays: '6.7k',
      artColor: '#38240D'
    },
    { 
      id: 3, 
      category: 'Comedy', 
      title: 'Totally Unscripted Ep. 9', 
      host: 'Meera & Zaid', 
      plays: '5.1k',
      artColor: 'rgba(113, 54, 0, 0.5)'
    }
  ]);

  // Simulate API fetch on component mount
  useEffect(() => {
    // This is where you would call your API
    // const fetchData = async () => {
    //   const response = await fetch('/api/landing-data');
    //   const data = await response.json();
    //   setStats(data.stats);
    //   setCategories(data.categories);
    //   setTrendingEpisodes(data.trending);
    // };
    // fetchData();
  }, []);

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
            <button className="btn-primary">Start listening</button>
            <button className="btn-secondary">Become a host</button>
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
        <div className="hero-right">
          <div className="hero-card">
            <div className="now-playing">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}><path d="M5 12a7 7 0 0 1 14 0"/><path d="M9 12a3 3 0 0 1 6 0"/><circle cx="12" cy="12" r="1"/></svg> Now playing
            </div>
            <div className="ep-thumb">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
            </div>
            <div className="ep-title">The Startup Grind #42</div>
            <div className="ep-host">by Arjun Sharma</div>
            <div className="progress">
              <div className="progress-fill"></div>
            </div>
            <div className="time-row">
              <span>18:22</span>
              <span>44:00</span>
            </div>
            <div className="player-controls">
              <div className="ctrl">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="19 20 9 12 19 4 19 20"/><line x1="5" y1="19" x2="5" y2="5"/></svg>
              </div>
              <div className="ctrl-play">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
              </div>
              <div className="ctrl">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19"/></svg>
              </div>
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
            <div key={ep.id} className="ep-card">
              <div className="ep-art" style={{ backgroundColor: ep.artColor }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
              </div>
              <div className="ep-body">
                <div className="ep-cat">{ep.category}</div>
                <div className="ep-card-title">{ep.title}</div>
                <div className="ep-card-host">{ep.host}</div>
                <div className="ep-card-footer">
                  <div className="ep-plays">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '4px' }}><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    {ep.plays} plays
                  </div>
                  <button className="ep-play-btn">Play</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Landing;
