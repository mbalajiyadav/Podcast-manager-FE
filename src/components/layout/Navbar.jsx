import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const path = location.pathname;

  const icons = {
    bell: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>,
  };

  // Determine profile link based on current section
  let profilePath = '/profile';
  if (path.startsWith('/host')) profilePath = '/host/profile';
  if (path.startsWith('/admin')) profilePath = '/admin/dashboard'; // Or admin profile if it exists

  return (
    <nav className="b-nav">
      <Link to="/dashboard" className="b-logo">pod<span>cast</span></Link>
      <div className="b-nav-right">
        <div className="b-nav-icon">{icons.bell}</div>
        <Link to={profilePath} className="b-avatar">NK</Link>
      </div>
    </nav>
  );
};

export default Navbar;
