import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login attempt:', { email, password });
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

                        <form onSubmit={handleSubmit}>
                            <div className="field">
                                <label>Email address</label>
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
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
                                />
                            </div>

                            <div className="forgot">Forgot password?</div>

                            <button type="submit" className="btn-full">Sign in</button>
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
