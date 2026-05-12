import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { useNavigate } from 'react-router-dom';
import './AdminEpisodes.css';

const AdminEpisodes = () => {
  const navigate = useNavigate();
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalEpisodes, setTotalEpisodes] = useState(0);
  const [filters, setFilters] = useState({
    status: 'All statuses',
    search: ''
  });

  const icons = {
    search: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
    view: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>,
    trash: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>,
    external: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
  };

  useEffect(() => {
    fetchEpisodes();
  }, [filters]);

  const fetchEpisodes = async () => {
    setLoading(true);
    try {
      const response = await adminService.getAllEpisodes(filters);
      setEpisodes(response.episodes);
      setTotalEpisodes(response.totalCount);
    } catch (error) {
      console.error("Failed to fetch episodes", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReview = (id) => {
    navigate(`/admin/review/${id}`);
  };

  return (
    <div className="admin-episodes-page">
      <main className="admin-episodes-main">
        <div className="page-head">
          <div>
            <h1 className="page-title">All episodes</h1>
            <p className="page-sub">{totalEpisodes.toLocaleString()} total episodes across platform</p>
          </div>
          <div className="controls-row">
            <div className="search-wrap">
              <i>{icons.search}</i>
              <input 
                placeholder="Search by title, host, or channel…" 
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />
            </div>
            <select 
              className="filter-select"
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            >
              <option>All statuses</option>
              <option>Approved</option>
              <option>Pending</option>
              <option>Rejected</option>
            </select>
          </div>
        </div>

        <div className="table-container">
          <table className="episodes-table">
            <thead>
              <tr>
                <th>Episode</th>
                <th>Channel</th>
                <th>Host</th>
                <th>Plays</th>
                <th>Uploaded</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="7" style={{ textAlign: 'center', padding: '40px' }}>Loading episodes...</td></tr>
              ) : episodes.length > 0 ? (
                episodes.map(ep => (
                  <tr key={ep.id}>
                    <td>
                      <div className="ep-cell">
                        <div className="ep-art-mini"></div>
                        <div className="ep-title-text">{ep.title}</div>
                      </div>
                    </td>
                    <td>{ep.channel}</td>
                    <td>{ep.host}</td>
                    <td>{ep.plays.toLocaleString()}</td>
                    <td>{ep.uploadedAt}</td>
                    <td>
                      <span className={`status-badge status-${ep.status.toLowerCase()}`}>
                        <span className={`status-dot dot-${ep.status.toLowerCase().charAt(0)}`}></span>
                        {ep.status}
                      </span>
                    </td>
                    <td>
                      <div className="actions">
                        {ep.status === 'PENDING' ? (
                          <button className="act act-review" onClick={() => handleReview(ep.id)}>
                            Review
                          </button>
                        ) : (
                          <button className="act act-view">
                            <i>{icons.view}</i> View
                          </button>
                        )}
                        <button className="act act-delete">
                          <i>{icons.trash}</i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="7" style={{ textAlign: 'center', padding: '40px' }}>No episodes found.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <div className="pag-info">Showing {episodes.length} of {totalEpisodes.toLocaleString()} episodes</div>
          <div className="pag-btns">
            <button className="pag-btn">← Prev</button>
            <button className="pag-btn active">1</button>
            <button className="pag-btn">Next →</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminEpisodes;
