import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userService } from '../../services/userService';
import { logout } from '../../features/auth/authSlice';
import './Profile.css';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Playlist & history');

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const icons = {

    edit: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>,
    logout: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
    location: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
    headphones: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>,
    play: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
    clock: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    bookmark: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>,
    users: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    mic: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>,
    brain: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A5 5 0 0 1 12 4.5 5 5 0 0 1 14.5 2 5 5 0 0 1 12 12 5 5 0 0 1 9.5 2z"/><path d="M12 12v10"/><path d="M16 16c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/><path d="M8 16c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>,
    music: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>,
    currency: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
    run: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m17 7.2 1.2 1.2"/><path d="M7 22.4V12"/><path d="M15 9.6V2"/><path d="M7 12h8"/><path d="M7 18h8"/><path d="M7 22.4h8"/></svg>,
    mood: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
  };

  const genericIcons = {
    mic: icons.mic,
    brain: icons.brain,
    music: icons.music,
    currency: icons.currency,
    run: icons.run,
    mood: icons.mood
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileData, activityData] = await Promise.all([
          userService.getListenerProfile(),
          userService.getListenerActivity()
        ]);
        setProfile(profileData);
        setActivity(activityData);
      } catch (error) {
        console.error("Error fetching listener data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading || !profile || !activity) {
    return <div className="profile-loading">Loading your profile...</div>;
  }

  return (
    <div className="listener-profile">
      <div className="profile-banner">
        <div className="profile-actions">
          <button className="btn-edit"><i>{icons.edit}</i> Edit profile</button>
          <button className="btn-edit logout" style={{ marginLeft: '12px', background: '#ff4d4d1a', color: '#ff4d4d' }} onClick={handleLogout}><i>{icons.logout}</i> Log out</button>
        </div>
      </div>

      <div className="profile-header-pos">
        <div className="profile-avatar">{profile.initials}</div>
      </div>

      <div className="profile-top-info">
        <h1 className="profile-name">{profile.name}</h1>
        <div className="profile-handle">{profile.handle} · Listener since {profile.since}</div>
        <p className="profile-bio">{profile.bio}</p>
        <div className="profile-tags">
          <div className="profile-tag"><i>{icons.location}</i> {profile.location}</div>
          <div className="profile-tag"><i>{icons.headphones}</i> Listener</div>
        </div>
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-label"><i>{icons.play}</i> Episodes played</div>
          <div className="stat-num">{profile.stats.episodesPlayed}</div>
          <div className="stat-sub">All time</div>
        </div>
        <div className="stat-card">
          <div className="stat-label"><i>{icons.clock}</i> Hours listened</div>
          <div className="stat-num">{profile.stats.hoursListened}</div>
          <div className="stat-sub">↑ {profile.stats.hoursGrowth} this week</div>
        </div>
        <div className="stat-card">
          <div className="stat-label"><i>{icons.bookmark}</i> Saved episodes</div>
          <div className="stat-num">{profile.stats.savedEpisodes}</div>
          <div className="stat-sub">In playlist</div>
        </div>
        <div className="stat-card">
          <div className="stat-label"><i>{icons.users}</i> Hosts followed</div>
          <div className="stat-num">{profile.stats.hostsFollowed}</div>
          <div className="stat-sub">Channels</div>
        </div>
      </div>

      <div className="profile-tabs">
        {['Playlist & history', 'Followed hosts'].map(tab => (
          <div 
            key={tab} 
            className={`tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>

      {activeTab === 'Playlist & history' && (
        <>
          <div className="dashboard-grid">
            <div className="dashboard-col">
              <div className="col-title">Saved playlist <span className="see-all">See all →</span></div>
              <div className="playlist-list">
                {activity.playlist.map(item => (
                  <div key={item.id} className="pl-item">
                    <div className={`pl-art ${item.artClass}`}>
                      <i>{genericIcons[item.icon]}</i>
                    </div>
                    <div className="pl-info">
                      <div className="pl-title">{item.title}</div>
                      <div className="pl-host">{item.host} · {item.category}</div>
                    </div>
                    <div className="pl-dur">{item.duration}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="dashboard-col">
              <div className="col-title">Recently played <span className="see-all">See all →</span></div>
              <div className="history-list">
                {activity.history.map(item => (
                  <div key={item.id} className="hist-item">
                    <div className="hist-art" style={{ background: item.artColor }}>
                      <i>{genericIcons[item.icon]}</i>
                    </div>
                    <div className="hist-info">
                      <div className="hist-title">{item.title}</div>
                      <div className="hist-meta">{item.host} · {item.timeAgo}</div>
                    </div>
                    <div className="hist-progress-wrap">
                      <div className="hist-track">
                        <div className="hist-fill" style={{ width: `${item.progress}%` }}></div>
                      </div>
                      <div className="hist-pct">{item.progress === 100 ? 'Done' : `${item.progress}%`}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="categorical-insights">
            <div className="section-title-sm">Top categories you listen to</div>
            <div className="insights-grid">
              {activity.categories.map(cat => (
                <div key={cat.name} className="cat-insight-item">
                  <div className="cat-name-row">
                    <span>{cat.name}</span>
                  </div>
                  <div className="insight-bar">
                    <div className="insight-fill" style={{ width: `${cat.percentage}%` }}></div>
                  </div>
                  <div className="cat-count">{cat.count} episodes</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {activeTab === 'Followed hosts' && (
        <div className="followed-hosts-section">
          <div className="section-title-sm">Hosts you follow</div>
          <div className="hosts-chip-row">
            {activity.followedHosts.map(host => (
              <div key={host.name} className="host-chip">
                <div className="host-ava" style={{ background: host.bg }}>{host.initials}</div>
                <div className="host-name">{host.name}</div>
                <div className="host-ep-count">{host.episodes} episodes</div>
              </div>
            ))}
          </div>
        </div>
      )}


    </div>
  );
};

export default Profile;
