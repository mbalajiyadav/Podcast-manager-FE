import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { useNavigate } from 'react-router-dom';
import './AdminUsers.css';

const AdminUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0);
  const [filters, setFilters] = useState({
    role: 'All roles',
    status: 'All statuses',
    search: ''
  });

  const icons = {
    dashboard: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>,
    queue: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    users: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    episodes: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>,
    stats: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>,

    search: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
    view: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>,
    shield: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
  };

  useEffect(() => {
    fetchUsers();
  }, [filters.role, filters.status, filters.search]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await adminService.getAllUsers(filters);
      setUsers(response.users);
      setTotalUsers(response.totalCount);
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (userId, newStatus) => {
    try {
      await adminService.updateUserStatus(userId, newStatus);
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: newStatus } : u));
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  return (
    <div className="admin-users-page">
      <main className="admin-users-main">
          <div className="page-head">
            <div>
              <h1 className="page-title">User accounts</h1>
              <p className="page-sub">{totalUsers.toLocaleString()} total users</p>
            </div>
            <div className="controls-row">
              <div className="search-wrap">
                <i>{icons.search}</i>
                <input 
                  placeholder="Search users…" 
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                />
              </div>
              <select 
                className="filter-select"
                value={filters.role}
                onChange={(e) => setFilters({ ...filters, role: e.target.value })}
              >
                <option>All roles</option>
                <option>Hosts</option>
                <option>Listeners</option>
              </select>
              <select 
                className="filter-select"
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              >
                <option>All statuses</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>

          <div className="table-container">
            <table className="users-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th>Episodes / Plays</th>
                  <th>Joined</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="6" style={{ textAlign: 'center', padding: '40px' }}>Loading users...</td></tr>
                ) : users.length > 0 ? (
                  users.map(user => (
                    <tr key={user.id}>
                      <td>
                        <div className="user-cell">
                          <div className="user-ava" style={{ background: user.avatarBg }}>
                            {user.initials}
                          </div>
                          <div>
                            <div className="u-name">{user.name}</div>
                            <div className="u-email">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`role-badge role-${user.role.toLowerCase()}`}>
                          {user.role}
                        </span>
                      </td>
                      <td>{user.stats}</td>
                      <td>{user.joined}</td>
                      <td>
                        <span className={`status-badge status-${user.status.toLowerCase()}`}>
                          <span className={`status-dot dot-${user.status === 'Active' ? 'a' : 'i'}`}></span>
                          {user.status}
                        </span>
                      </td>
                      <td>
                        <div className="actions">
                          <button className="act act-view">
                            <i>{icons.view}</i> View
                          </button>
                          {user.status === 'Active' ? (
                            <button className="act act-suspend" onClick={() => handleStatusUpdate(user.id, 'Inactive')}>
                              Suspend
                            </button>
                          ) : (
                            <button className="act act-restore" onClick={() => handleStatusUpdate(user.id, 'Active')}>
                              Restore
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="6" style={{ textAlign: 'center', padding: '40px' }}>No users found matching filters.</td></tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <div className="pag-info">Showing {users.length} of {totalUsers.toLocaleString()} users</div>
            <div className="pag-btns">
              <button className="pag-btn">← Prev</button>
              <button className="pag-btn active">1</button>
              <button className="pag-btn">2</button>
              <button className="pag-btn">3</button>
              <button className="pag-btn">Next →</button>
            </div>
          </div>
        </main>
    </div>
  );
};

export default AdminUsers;
