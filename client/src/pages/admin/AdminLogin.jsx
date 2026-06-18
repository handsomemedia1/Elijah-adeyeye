import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Admin.css';

export default function AdminLogin() {
  const { signIn, resetPassword } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetMode, setResetMode] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signIn(email, password);
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await resetPassword(email);
      setResetSent(true);
    } catch (err) {
      setError(err.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="admin-login__card glass">
        <div className="admin-login__header">
          <Link to="/" className="admin-login__logo">
            <span className="gradient-text">EA</span>
          </Link>
          <h1 className="admin-login__title">
            {resetMode ? 'Reset Password' : 'Admin Portal'}
          </h1>
          <p className="admin-login__subtitle">
            {resetMode
              ? 'Enter your email to receive a password reset link'
              : 'Sign in to manage your portfolio'
            }
          </p>
        </div>

        {error && (
          <div className="admin-login__error">{error}</div>
        )}

        {resetSent ? (
          <div className="admin-login__success">
            <p>✅ Password reset link sent to <strong>{email}</strong></p>
            <p>Check your inbox and follow the link to set your new password.</p>
            <button className="btn btn--primary" onClick={() => { setResetMode(false); setResetSent(false); }}>
              Back to Login
            </button>
          </div>
        ) : (
          <form onSubmit={resetMode ? handleReset : handleLogin} className="admin-login__form">
            <div className="admin-login__field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="elijah@elitechub.com"
                required
                autoComplete="email"
              />
            </div>

            {!resetMode && (
              <div className="admin-login__field">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                />
              </div>
            )}

            <button
              type="submit"
              className="btn btn--primary admin-login__submit"
              disabled={loading}
            >
              {loading ? 'Please wait...' : resetMode ? 'Send Reset Link' : 'Sign In'}
            </button>

            <button
              type="button"
              className="admin-login__toggle"
              onClick={() => { setResetMode(!resetMode); setError(''); }}
            >
              {resetMode ? '← Back to Login' : 'Forgot password?'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
