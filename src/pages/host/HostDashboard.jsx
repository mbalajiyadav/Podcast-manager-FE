import React, { useState, useEffect } from 'react';
import { hostService } from '../../services/hostService';
import { useNavigate } from 'react-router-dom';
import './HostDashboard.css';

const HostDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);

  const icons = {
    episodes: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>,
    play: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
    clock: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    check: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
    upload: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>,
    edit: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>,
    trash: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, episodesData] = await Promise.all([
          hostService.getDashboardStats(),
          hostService.getRecentEpisodes()
        ]);
        setStats(statsData);
        setEpisodes(episodesData);
      } catch (error) {
        console.error("Error fetching host data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading || !stats) {
    return <div className="host-loading">Loading dashboard...</div>;
  }

  return (
    <div className="host-dashboard">
      <h1 className="page-title">Studio dashboard</h1>
      
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-label"><i>{icons.episodes}</i> Total episodes</div>
          <div className="stat-num">{stats.totalEpisodes}</div>
          <div className="stat-change up">↑ {stats.episodesThisMonth} this month</div>
        </div>
        <div className="stat-card">
          <div className="stat-label"><i>{icons.play}</i> Total plays</div>
          <div className="stat-num">{stats.totalPlays}</div>
          <div className="stat-change up">↑ {stats.playsGrowth} vs last month</div>
        </div>
        <div className="stat-card">
          <div className="stat-label"><i>{icons.clock}</i> Pending review</div>
          <div className="stat-num">{stats.pendingReview}</div>
          <div className="stat-change">Awaiting admin</div>
        </div>
        <div className="stat-card">
          <div className="stat-label"><i>{icons.check}</i> Approved</div>
          <div className="stat-num">{stats.approvedEpisodes}</div>
          <div className="stat-change">Live episodes</div>
        </div>
      </div>

      <div className="section-head">
        <h2 className="section-title">Recent episodes</h2>
        <button className="upload-btn" onClick={() => navigate('/host/upload')}><i>{icons.upload}</i> Upload episode</button>
      </div>

      <div style={{ 
        overflowX: 'auto', 
        width: '100%', 
        WebkitOverflowScrolling: 'touch',
        background: '#fff',
        border: '1px solid var(--b-border)',
        borderRadius: '12px'
      }}>
        <table className="ep-table" style={{ minWidth: '650px', width: '100%' }}>
          <thead>
            <tr>
              <th>Episode</th>
              <th>Category</th>
              <th>Uploaded</th>
              <th>Plays</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {episodes.map(ep => (
              <tr key={ep.id}>
                <td><div className="ep-name">{ep.title}</div></td>
                <td><div className="ep-cat">{ep.category}</div></td>
                <td>{ep.uploadDate}</td>
                <td>{ep.plays}</td>
                <td>
                  <span className={`badge ${ep.status}`}>
                    {ep.status.charAt(0).toUpperCase() + ep.status.slice(1)}
                  </span>
                </td>
                <td>
                  <div className="row-actions">
                    <button className="act-btn act-edit"><i>{icons.edit}</i> Edit</button>
                    {ep.status === 'rejected' && (
                      <button className="act-btn act-del"><i>{icons.trash}</i></button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HostDashboard;
