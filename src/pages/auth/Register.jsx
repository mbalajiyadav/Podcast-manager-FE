import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import { setCredentials } from '../../features/auth/authSlice';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [role, setRole] = useState('LISTENER'); // 'LISTENER' or 'HOST'
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const nameParts = formData.fullName.trim().split(' ');
    const first_name = nameParts[0];
    const last_name = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

    try {
      const data = await authService.register({
        first_name,
        last_name,
        email_id: formData.email,
        password: formData.password,
        role_code: role
      });

      dispatch(setCredentials({
        user: {
          id: data._id,
          name: `${data.first_name} ${data.last_name}`,
          email: data.email_id,
          role: data.role
        },
        token: data.token,
        refreshToken: data.token
      }));

      // Redirect based on role
      if (data.role === 'ADMIN') navigate('/admin/dashboard');
      else if (data.role === 'HOST') navigate('/host/dashboard');
      else navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-screen">
        <div className="auth-wrap">
          <div className="auth-left">
            <Link to="/" className="auth-logo">pod<span>cast</span></Link>
            
            <div className="auth-tagline">
              <h2>Join the community.</h2>
              <p>Create an account as a listener or start your own show as a host.</p>
            </div>
            
            <div className="auth-quote">
              <p>"I had my first episode live within 20 minutes of signing up. The process is incredibly smooth."</p>
              <div className="auth-quote-name">— Vikram, Host</div>
            </div>
          </div>
          
          <div className="auth-right">
            <div className="auth-form-title">Create account</div>
            <div className="auth-form-sub">Choose your role to get started</div>
            
            <div className="role-row">
              <div 
                className={`role-opt ${role === 'LISTENER' ? 'active' : ''}`}
                onClick={() => setRole('LISTENER')}
              >
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>🎧</div>
                <span>Listener</span>
              </div>
              <div 
                className={`role-opt ${role === 'HOST' ? 'active' : ''}`}
                onClick={() => setRole('HOST')}
              >
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>🎙️</div>
                <span>Host</span>
              </div>
            </div>

            {error && <div className="auth-error" style={{ color: '#ff4d4d', marginBottom: '16px', fontSize: '14px', textAlign: 'center' }}>{error}</div>}
            
            <form onSubmit={handleSubmit}>
              <div className="field">
                <label>Full name</label>
                <input 
                  type="text" 
                  name="fullName"
                  placeholder="Your name" 
                  value={formData.fullName}
                  onChange={handleChange}
                  required 
                  disabled={isLoading}
                />
              </div>
              
              <div className="field">
                <label>Email address</label>
                <input 
                  type="email" 
                  name="email"
                  placeholder="you@example.com" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                  disabled={isLoading}
                />
              </div>
              
              <div className="field">
                <label>Password</label>
                <input 
                  type="password" 
                  name="password"
                  placeholder="Create a password" 
                  value={formData.password}
                  onChange={handleChange}
                  required 
                  disabled={isLoading}
                />
              </div>
              
              <button type="submit" className="btn-full" disabled={isLoading}>
                {isLoading ? 'Creating account...' : 'Create account'}
              </button>
            </form>
            
            <div className="switch-link">
              Already have one? <Link to="/login">Sign in →</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
