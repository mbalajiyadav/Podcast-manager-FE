import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminService } from '../../services/adminService';
import './AdminPanel.css';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [queue, setQueue] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const icons = {
    episodes: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>,
    play: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
    host: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>,
    listeners: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, queueData, usersData] = await Promise.all([
          adminService.getPlatformStats(),
          adminService.getPendingQueue(),
          adminService.getRecentUsers()
        ]);
        setStats(statsData);
        setQueue(queueData);
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading || !stats) {
    return <div className="admin-loading">Loading platform overview...</div>;
  }

  return (
    <div className="admin-panel">
      <h1 className="page-title">Platform overview</h1>
      
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-label"><i>{icons.episodes}</i> Total episodes</div>
          <div className="stat-num">{stats.totalEpisodes}</div>
          <div className="stat-change">Across all channels</div>
        </div>
        <div className="stat-card">
          <div className="stat-label"><i>{icons.play}</i> Total plays</div>
          <div className="stat-num">{stats.totalPlays}</div>
          <div className="stat-change">All time</div>
        </div>
        <div className="stat-card">
          <div className="stat-label"><i>{icons.host}</i> Active hosts</div>
          <div className="stat-num">{stats.activeHosts}</div>
          <div className="stat-change">+12 this month</div>
        </div>
        <div className="stat-card">
          <div className="stat-label"><i>{icons.listeners}</i> Listeners</div>
          <div className="stat-num">{stats.listeners}</div>
          <div className="stat-change">+340 this week</div>
        </div>
      </div>

      <div className="admin-grid">
        <div className="queue-section">
          <h2 className="section-title">Pending approval ({queue.length})</h2>
          <div className="queue-list">
            {queue.map(item => (
              <div 
                key={item.id} 
                className="queue-item" 
                onClick={() => navigate(`/admin/review/${item.id}`)}
              >
                <div className="qi-top">
                  <div>
                    <div className="qi-title">{item.title}</div>
                    <div className="qi-host">by {item.host}</div>
                  </div>
                  <div className="qi-time">{item.timeAgo}</div>
                </div>
                <div className="qi-desc">{item.description}</div>
                <div className="qi-meta">
                  <span className="qi-cat">{item.category}</span>
                  <span className="qi-dur">{item.duration}</span>
                </div>
                <div className="qi-click-hint">Click to review episode details</div>
              </div>
            ))}
          </div>
        </div>

        <div className="users-section">
          <h2 className="section-title">Recent users</h2>
          <div className="table-container">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Joined</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr key={idx}>
                    <td>{user.name}</td>
                    <td>
                      <span className={`role-badge role-${user.role.toLowerCase()}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>{user.joined}</td>
                    <td>
                      <div className="status-cell">
                        <span className={`status-dot dot-${user.status.toLowerCase()}`}></span>
                        {user.status}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
