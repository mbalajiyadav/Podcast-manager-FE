import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

const Register = () => {
  const [role, setRole] = useState('listener'); // 'listener' or 'host'
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Register attempt:', { role, ...formData });
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
                className={`role-opt ${role === 'listener' ? 'active' : ''}`}
                onClick={() => setRole('listener')}
              >
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>🎧</div>
                <span>Listener</span>
              </div>
              <div 
                className={`role-opt ${role === 'host' ? 'active' : ''}`}
                onClick={() => setRole('host')}
              >
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>🎙️</div>
                <span>Host</span>
              </div>
            </div>
            
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
                />
              </div>
              
              <button type="submit" className="btn-full">Create account</button>
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
