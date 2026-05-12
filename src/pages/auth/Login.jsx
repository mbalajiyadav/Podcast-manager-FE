import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import { setCredentials } from '../../features/auth/authSlice';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            const data = await authService.login(email, password);
            dispatch(setCredentials({
                user: {
                    id: data._id,
                    name: `${data.first_name} ${data.last_name}`,
                    email: data.email_id,
                    role: data.role
                },
                token: data.token,
                refreshToken: data.token // Backend currently only returns one token
            }));
            
            // Redirect based on role
            if (data.role === 'ADMIN') navigate('/admin/dashboard');
            else if (data.role === 'HOST') navigate('/host/dashboard');
            else navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
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
                            <h2>Welcome back to the mic.</h2>
                            <p>Your favourite episodes are waiting. Pick up right where you left off.</p>
                        </div>

                        <div className="auth-quote">
                            <p>"This platform completely changed how I discover audio content. Absolutely love it."</p>
                            <div className="auth-quote-name">— Balaji, Listener</div>
                        </div>
                    </div>

                    <div className="auth-right">
                        <div className="auth-form-title">Sign in</div>
                        <div className="auth-form-sub">Good to see you again</div>

                        {error && <div className="auth-error" style={{ color: '#ff4d4d', marginBottom: '16px', fontSize: '14px', textAlign: 'center' }}>{error}</div>}

                        <form onSubmit={handleSubmit}>
                            <div className="field">
                                <label>Email address</label>
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={isLoading}
                                />
                            </div>

                            <div className="field">
                                <label>Password</label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    disabled={isLoading}
                                />
                            </div>

                            <div className="forgot">Forgot password?</div>

                            <button type="submit" className="btn-full" disabled={isLoading}>
                                {isLoading ? 'Signing in...' : 'Sign in'}
                            </button>
                        </form>

                        <div className="switch-link">
                            No account? <Link to="/register">Create one →</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
