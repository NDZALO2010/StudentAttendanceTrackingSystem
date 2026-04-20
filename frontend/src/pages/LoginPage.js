import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  function getBackendBaseUrl() {
    const raw = process.env.REACT_APP_API_BASE || '';
    if (raw) {
      let normalized = raw.trim();
      if (normalized) {
        if (!/^https?:\/\//i.test(normalized)) {
          normalized = `https://${normalized}`;
        }
        return normalized.replace(/\/+$/, '');
      }
    }

    // Local development fallback when frontend runs on :3000 and backend on :5000.
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return `${window.location.protocol}//${window.location.hostname}:5000`;
    }

    return '';
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await login({ username, password });
      setUser(response.data?.user || null);
      if (response.data?.user?.user_type === 'Student') {
        navigate('/student');
      } else if (response.data?.user?.user_type === 'Lecturer') {
        navigate('/lecturer');
      } else {
        // Admin users are redirected to the Django admin UI on the backend host.
        const backendBase = getBackendBaseUrl();
        if (!backendBase) {
          setError('Admin login requires REACT_APP_API_BASE to be configured for this environment.');
          return;
        }
        window.location.href = `${backendBase}/admin/`;
      }
    } catch (err) {
      setError(err.message || 'Unable to login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Username:
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Student/Lecturer number"
              required
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </label>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in…' : 'Log in'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}
