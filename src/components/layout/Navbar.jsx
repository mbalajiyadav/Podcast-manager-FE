import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const path = location.pathname;

  const icons = {};

  // Determine profile link based on current section
  let profilePath = '/profile';
  if (path.startsWith('/host')) profilePath = '/host/profile';
  if (path.startsWith('/admin')) profilePath = '/admin/dashboard'; // Or admin profile if it exists

  return (
    <nav className="b-nav">
      <Link to="/dashboard" className="b-logo">pod<span>cast</span></Link>
      <div className="b-nav-right">
        <Link to={profilePath} className="b-avatar">NK</Link>
      </div>
    </nav>
  );
};

export default Navbar;
