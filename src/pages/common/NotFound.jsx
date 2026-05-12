import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const NotFound = () => {
  const { user } = useSelector((state) => state.auth);
  
  const getHomePath = () => {
    if (!user) return '/';
    if (user.role === 'ADMIN') return '/admin/dashboard';
    if (user.role === 'HOST') return '/host/dashboard';
    return '/dashboard';
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to={getHomePath()} style={{ color: '#ff8a00', textDecoration: 'none', fontWeight: 'bold', marginTop: '1rem' }}>
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
