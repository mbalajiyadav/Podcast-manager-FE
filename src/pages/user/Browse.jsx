import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Browse.css';

const Browse = () => {
  const navigate = useNavigate();
  // Mock data states
  const [featuredEpisodes] = useState([
    { id: 1, category: 'True Crime', title: 'The Vanishing of Room 12', host: 'Priya Menon', duration: '38 min', plays: '8.2k', artColor: '#713600' },
    { id: 2, category: 'Self-improvement', title: 'Morning Rituals That Work', host: 'Ravi Krishnan', duration: '42 min', plays: '6.7k', artColor: '#38240D' },
    { id: 3, category: 'Music', title: 'Late Night Frequencies Vol. 4', host: 'DJ Kapoor', duration: '60 min', plays: '5.4k', artColor: '#C05800cc' }
  ]);

  const [newArrivals] = useState([
    { id: 4, category: 'Business', title: 'The Startup Grind #43', host: 'Arjun Sharma', duration: '51 min', plays: '320', artColor: '#38240D' },
    { id: 5, category: 'Sports', title: 'Race Day Mindset', host: 'Coach Nair', duration: '27 min', plays: '198', artColor: '#713600' },
    { id: 6, category: 'Comedy', title: 'Unscripted with Meera Ep. 10', host: 'Meera & Zaid', duration: '44 min', plays: '411', artColor: '#C05800cc' }
  ]);

  const [categories] = useState([
    'All', 'Music', 'True Crime', 'Business', 'Comedy', 'Wellness', 'News', 'Sports'
  ]);

  const [activeCategory, setActiveCategory] = useState('All');

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
      <div className="b-ep-art" style={{ backgroundColor: ep.artColor }}>
        {ep.category === 'True Crime' || ep.category === 'Sports' ? icons.mic : 
         ep.category === 'Self-improvement' ? icons.brain : icons.music}
      </div>
      <div className="b-ep-body">
        <div className="b-ep-cat">{ep.category}</div>
        <div className="b-ep-title">{ep.title}</div>
        <div className="b-ep-host">{ep.host} · {ep.duration}</div>
        <div className="b-ep-footer">
          <div className="b-ep-plays">{icons.play} {ep.plays}</div>
          <div className="b-ep-actions">
            <button className="b-ep-save">{icons.bookmark}</button>
            <button className="b-ep-play-btn">Play</button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="b-search-row">
        <div className="b-search-wrap">
          <i>{icons.search}</i>
          <input className="b-search-input" placeholder="Search episodes or hosts…" />
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

      <div className="b-section-head">
        <div className="b-section-title">Featured episodes</div>
        <div className="b-see-all">See all →</div>
      </div>
      <div className="b-ep-grid">
        {featuredEpisodes.map(ep => <EpCard key={ep.id} ep={ep} />)}
      </div>

      <div className="b-section-head">
        <div className="b-section-title">New arrivals</div>
        <div className="b-see-all">See all →</div>
      </div>
      <div className="b-ep-grid">
        {newArrivals.map(ep => <EpCard key={ep.id} ep={ep} />)}
      </div>
    </>
  );
};

export default Browse;
