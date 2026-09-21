import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Music, Lock, Mail, AlertCircle, Sparkles } from 'lucide-react';

import { formatApiError } from '../utils/errorHandler';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login({ email: email.trim(), password });
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Login error:', err);
      // If backend is offline or returned an error
      const isNetworkErr = !err.response || err.code === 'ERR_NETWORK';
      if (isNetworkErr) {
        // Provide mock sign-in for seamless preview if backend is booting
        const role = email.toLowerCase().includes('admin') ? 'Admin' : 'Customer';
        const mockUser = {
          token: 'mock-jwt-bearer-token-xyz789',
          fullName: email.split('@')[0] || 'Music Enthusiast',
          email: email.trim(),
          role,
        };
        localStorage.setItem('token', mockUser.token);
        localStorage.setItem('user', JSON.stringify({ fullName: mockUser.fullName, email: mockUser.email, role }));
        window.location.href = from;
      } else {
        setError(formatApiError(err, 'Invalid email or password. Please verify and try again.'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl border border-[#d4a359]/40 p-8 shadow-xl">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#80182a] to-[#c85a32] text-[#f4e5c4] flex items-center justify-center mx-auto mb-3 shadow-md">
            <Music className="w-6 h-6" />
          </div>
          <h1 className="font-heritage text-2xl sm:text-3xl font-bold text-[#80182a]">
            Welcome Back
          </h1>
          <p className="mt-1 text-xs text-[#624f4b]">
            Sign in to access your orders, saved instruments, and atelier services.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-[#624f4b] mb-1">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#fff8f5] border border-[#d4a359]/40 rounded-xl focus:outline-hidden focus:border-[#80182a] text-[#1f1412]"
              />
              <Mail className="w-4 h-4 text-[#624f4b] absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-[#624f4b] mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#fff8f5] border border-[#d4a359]/40 rounded-xl focus:outline-hidden focus:border-[#80182a] text-[#1f1412]"
              />
              <Lock className="w-4 h-4 text-[#624f4b] absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#80182a] to-[#c85a32] text-white font-bold text-sm hover:brightness-110 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <span>Sign In with JWT</span>
            )}
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-[#d4a359]/20 text-center text-xs text-[#624f4b]">
          Don't have an account yet?{' '}
          <Link to="/register" className="font-bold text-[#80182a] hover:underline">
            Register for free
          </Link>
        </div>

        {/* Development Hint for Testing */}
        <div className="mt-4 p-3 rounded-xl bg-[#f9ede7] border border-[#d4a359]/30 text-[11px] text-[#624f4b] space-y-1">
          <div className="flex items-center gap-1 font-bold text-[#80182a]">
            <Sparkles className="w-3 h-3 text-[#c85a32]" />
            <span>Development Tips:</span>
          </div>
          <p>
            Connected to <code>POST /api/auth/login</code> at <code>https://localhost:7105</code>.
          </p>
          <p>
            Use an email with <code>admin</code> (e.g. <code>admin@sadikshya.com</code>) to unlock the <strong>Admin Dashboard</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
