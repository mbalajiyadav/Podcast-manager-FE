import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const path = location.pathname;

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const logoutIcon = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;

  // Determine profile link based on current section
  let profilePath = '/profile';
  if (path.startsWith('/host')) profilePath = '/host/profile';
  if (path.startsWith('/admin')) profilePath = '/admin/dashboard';

  // Get initials (MB as requested, or from user name)
  const initials = user?.role === 'ADMIN' ? 'MB' : (user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'NK');

  return (
    <nav className="b-nav">
      <Link to="/dashboard" className="b-logo">pod<span>cast</span></Link>
      <div className="b-nav-right">
        {user && (
          <button 
            onClick={handleLogout}
            style={{ 
              background: 'rgba(255, 77, 77, 0.1)', 
              color: '#ff4d4d', 
              border: 'none', 
              padding: '6px 12px', 
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              marginRight: '16px'
            }}
          >
            {logoutIcon} Log out
          </button>
        )}
        <Link to={profilePath} className="b-avatar">{initials}</Link>
      </div>
    </nav>
  );
};

export default Navbar;
