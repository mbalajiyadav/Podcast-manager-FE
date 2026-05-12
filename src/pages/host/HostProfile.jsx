import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { hostService } from '../../services/hostService';
import { logout } from '../../features/auth/authSlice';
import './HostProfile.css';

const HostProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Episodes');

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const icons = {

    edit: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>,
    logout: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
    location: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
    business: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
    link: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
    episodes: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>,
    plays: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
    users: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    clock: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    mic: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileData = await hostService.getHostProfile();
        if (profileData) {
          setProfile(profileData);
          const episodesData = await hostService.getHostEpisodes();
          setEpisodes(episodesData);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading || !profile) {
    return <div className="host-loading">Loading profile...</div>;
  }

  return (
    <div className="host-profile-page">
      <div className="profile-banner">
        <div className="profile-banner-inner">
          <div className="profile-actions">
            <button className="btn-edit"><i>{icons.edit}</i> Edit profile</button>
            <button className="btn-edit logout" style={{ marginLeft: '12px', background: '#ff4d4d1a', color: '#ff4d4d' }} onClick={handleLogout}><i>{icons.logout}</i> Log out</button>
          </div>
        </div>
      </div>

      <div className="profile-header-wrap">
        <div className="profile-avatar-pos">
          <div className="profile-avatar">{profile.initials}</div>
        </div>
      </div>

      <div className="profile-info-section">
        <h1 className="profile-name">{profile.name}</h1>
        <div className="profile-handle">{profile.handle} · Host since {profile.since}</div>
        <p className="profile-bio">{profile.bio}</p>
        <div className="profile-tags">
          <div className="profile-tag"><i>{icons.location}</i> {profile.location}</div>
          <div className="profile-tag"><i>{icons.business}</i> {profile.category}</div>
          <div className="profile-tag"><i>{icons.link}</i> {profile.website}</div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label"><i>{icons.episodes}</i> Episodes</div>
          <div className="stat-num">{profile.stats.episodes.total}</div>
          <div className="stat-sub">{profile.stats.episodes.live} live · {profile.stats.episodes.pending} pending · {profile.stats.episodes.rejected} rejected</div>
        </div>
        <div className="stat-card">
          <div className="stat-label"><i>{icons.plays}</i> Total plays</div>
          <div className="stat-num">{profile.stats.plays.total}</div>
          <div className="stat-sub">↑ {profile.stats.plays.growth} this month</div>
        </div>
        <div className="stat-card">
          <div className="stat-label"><i>{icons.users}</i> Followers</div>
          <div className="stat-num">{profile.stats.followers.total}</div>
          <div className="stat-sub">↑ {profile.stats.followers.growth} this week</div>
        </div>
        <div className="stat-card">
          <div className="stat-label"><i>{icons.clock}</i> Avg duration</div>
          <div className="stat-num">{profile.stats.avgDuration}</div>
          <div className="stat-sub">Per episode</div>
        </div>
      </div>

      <div className="profile-tabs">
        {['Episodes', 'About channel'].map(tab => (
          <div 
            key={tab} 
            className={`profile-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>

      <div className="profile-content">
        {activeTab === 'Episodes' && (
          <div className="ep-grid">
            {episodes.map(ep => (
              <div key={ep.id} className="ep-card">
                <div className={`ep-art ${ep.artClass}`}><i>{icons.mic}</i></div>
                <div className="ep-body">
                  <div className="ep-cat">{ep.category}</div>
                  <div className="ep-title">{ep.title}</div>
                  <div className="ep-footer">
                    <div className="ep-plays"><i>{icons.plays}</i> {ep.plays}</div>
                    <span className={`badge ${ep.status.toLowerCase()}`}>{ep.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {activeTab !== 'Episodes' && (
          <div className="tab-placeholder">Content for {activeTab} will appear here.</div>
        )}
      </div>
    </div>
  );
};

export default HostProfile;
