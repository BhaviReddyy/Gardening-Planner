import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, Leaf, ArrowRight } from 'lucide-react';
import './Auth.css';

export default function SignIn() {
    const { signIn } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        if (!form.email || !form.password) {
            setError('Please fill in all fields');
            return;
        }
        setLoading(true);
        setTimeout(() => {
            const result = signIn(form.email, form.password);
            if (result.success) {
                navigate('/');
            } else {
                setError(result.error);
            }
            setLoading(false);
        }, 600);
    };

    return (
        <div className="auth-page">
            <div className="auth-bg">
                <div className="auth-bg-circle c1"></div>
                <div className="auth-bg-circle c2"></div>
                <div className="auth-bg-circle c3"></div>
            </div>

            <div className="auth-container">
                <div className="auth-hero">
                    <div className="auth-hero-content">
                        <div className="auth-logo">
                            <div className="auth-logo-icon"><Leaf size={28} /></div>
                            <span>GardenPlan</span>
                        </div>
                        <h1>Welcome back to your garden 🌿</h1>
                        <p>Your plants have been waiting for you. Let's check on how everything is growing!</p>
                        <div className="auth-hero-features">
                            <div className="hero-feature"><span>🌱</span> Track your plants</div>
                            <div className="hero-feature"><span>📅</span> Plan seasonal tasks</div>
                            <div className="hero-feature"><span>🌤️</span> Weather insights</div>
                            <div className="hero-feature"><span>👥</span> Community support</div>
                        </div>
                    </div>
                </div>

                <div className="auth-form-section">
                    <div className="auth-form-wrapper">
                        <div className="auth-form-header">
                            <h2>Sign In</h2>
                            <p>Enter your credentials to access your garden</p>
                        </div>

                        {error && (
                            <div className="auth-error">
                                <span>⚠️</span> {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="auth-form">
                            <div className="auth-field">
                                <label>Email Address</label>
                                <div className="auth-input-wrapper">
                                    <Mail size={18} />
                                    <input
                                        type="email"
                                        placeholder="isabella@garden.com"
                                        value={form.email}
                                        onChange={e => setForm({ ...form, email: e.target.value })}
                                        autoComplete="email"
                                    />
                                </div>
                            </div>

                            <div className="auth-field">
                                <label>Password</label>
                                <div className="auth-input-wrapper">
                                    <Lock size={18} />
                                    <input
                                        type={showPass ? 'text' : 'password'}
                                        placeholder="Enter your password"
                                        value={form.password}
                                        onChange={e => setForm({ ...form, password: e.target.value })}
                                        autoComplete="current-password"
                                    />
                                    <button type="button" className="auth-toggle-pass" onClick={() => setShowPass(!showPass)}>
                                        {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <div className="auth-options">
                                <label className="auth-remember">
                                    <input type="checkbox" />
                                    <span>Remember me</span>
                                </label>
                                <a href="#" className="auth-forgot">Forgot password?</a>
                            </div>

                            <button type="submit" className="auth-submit-btn" disabled={loading}>
                                {loading ? (
                                    <span className="auth-spinner"></span>
                                ) : (
                                    <>Sign In <ArrowRight size={18} /></>
                                )}
                            </button>
                        </form>

                        <div className="auth-divider">
                            <span>or continue with</span>
                        </div>

                        <div className="auth-social">
                            <button className="auth-social-btn" type="button">
                                <svg viewBox="0 0 24 24" width="20" height="20"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                                Google
                            </button>
                            <button className="auth-social-btn" type="button">
                                <svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" /></svg>
                                GitHub
                            </button>
                        </div>

                        <p className="auth-switch">
                            Don't have an account? <Link to="/signup">Create one</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
