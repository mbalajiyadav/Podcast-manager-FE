import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { hostService } from '../../services/hostService';
import { adminService } from '../../services/adminService';

const Sidebar = () => {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const path = location.pathname;
  const [channelInfo, setChannelInfo] = useState(null);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    if (user?.role === 'HOST') {
      const fetchChannel = async () => {
        const info = await hostService.getChannelInfo();
        if (info) setChannelInfo(info);
      };
      fetchChannel();
    }
    
    if (user?.role === 'ADMIN') {
      const fetchPending = async () => {
        const queue = await adminService.getPendingQueue();
        setPendingCount(queue.length);
      };
      fetchPending();
    }
  }, [user]);

  // Icons (as SVGs)
  const icons = {
    browse: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>,
    playlist: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>,
    history: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>,
    trending: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>,
    music: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>,
    users: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    admin: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>,
    upload: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>,
    analytics: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/></svg>,
    news: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/></svg>,
    wellness: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>,
    business: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
    mic: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>,
  };

  const menuItems = {
    user: [
      { id: 'browse', label: 'Browse', icon: icons.browse, path: '/dashboard' },
      { id: 'playlist', label: 'My Playlist', icon: icons.playlist, path: '/playlist' },
      { id: 'history', label: 'History', icon: icons.history, path: '/history' },
      { id: 'trending', label: 'Trending', icon: icons.trending, path: '/trending' },
    ],
    host: [
      { id: 'host-dash', label: 'Host Studio', icon: icons.browse, path: '/host/dashboard' },
      { id: 'my-podcasts', label: 'My Podcasts', icon: icons.music, path: '/host/listings' },
      { id: 'upload', label: 'Upload Episode', icon: icons.upload, path: '/host/upload' },
      { id: 'host-profile', label: 'Profile', icon: icons.users, path: '/host/profile' },
    ],
    admin: [
      { id: 'admin-dash', label: 'Dashboard', icon: icons.browse, path: '/admin/dashboard' },
      { id: 'queue', label: 'Approval queue', icon: icons.history, path: '/admin/dashboard', badge: pendingCount },
      { id: 'users', label: 'All users', icon: icons.users, path: '/admin/users' },
      { id: 'all-episodes', label: 'All episodes', icon: icons.music, path: '/admin/episodes' },
      { id: 'platform-stats', label: 'Platform stats', icon: icons.analytics, path: '/admin/stats' },
    ]
  };

  const categories = [
    { label: 'Music', icon: icons.music, path: '/category/music' },
    { label: 'News', icon: icons.news, path: '/category/news' },
    { label: 'Wellness', icon: icons.wellness, path: '/category/wellness' },
    { label: 'Business', icon: icons.business, path: '/category/business' },
    { label: 'True Crime', icon: icons.mic, path: '/category/true-crime' },
  ];

  // Determine which menu to show based on path
  let activeMenu = 'user';
  if (path.startsWith('/admin')) activeMenu = 'admin';
  else if (path.startsWith('/host')) activeMenu = 'host';

  const ChannelCard = () => (
    <div className="channel-card">
      <div className="ch-avatar">{icons.mic}</div>
      <div className="ch-info">
        <div className="ch-name">{channelInfo?.name || user?.name || 'My Channel'}</div>
        <div className="ch-sub">{channelInfo?.episodeCount || 0} episodes · Host</div>
      </div>
    </div>
  );

  return (
    <div className="b-sidebar">
      {activeMenu === 'host' && <ChannelCard />}
      
      <div className="side-section">
        <div className="side-section-label">Menu</div>
        {menuItems[activeMenu].map(item => (
          <NavLink 
            key={item.id} 
            to={item.path} 
            className={({ isActive }) => `side-nav-item ${isActive ? 'active' : ''}`}
          >
            {item.icon} {item.label}
            {item.badge > 0 && <span className="badge-dot">{item.badge}</span>}
          </NavLink>
        ))}
      </div>

      {activeMenu === 'user' && (
        <div className="side-section">
          <div className="side-section-label">Categories</div>
          {categories.map(cat => (
            <NavLink 
              key={cat.label} 
              to={cat.path} 
              className={({ isActive }) => `side-nav-item ${isActive ? 'active' : ''}`}
            >
              {cat.icon} {cat.label}
            </NavLink>
          ))}
        </div>
      )}


    </div>
  );
};

export default Sidebar;
