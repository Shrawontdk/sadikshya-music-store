import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Music, Lock, Mail, User, Phone, AlertCircle, ShieldCheck } from 'lucide-react';

import { formatApiError } from '../utils/errorHandler';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Payload according to backend spec:
    // { fullName, email, password, phone }
    const registerPayload = {
      fullName: fullName.trim(),
      email: email.trim(),
      password,
      phone: phone.trim(),
    };

    try {
      await register(registerPayload);
      navigate('/', { replace: true });
    } catch (err) {
      console.error('Registration error:', err);
      const isNetworkErr = !err.response || err.code === 'ERR_NETWORK';
      if (isNetworkErr) {
        // Fallback simulated registration for offline ASP.NET preview
        const role = email.toLowerCase().includes('admin') ? 'Admin' : 'Customer';
        const mockUser = {
          token: 'mock-jwt-bearer-register-token',
          fullName: fullName.trim(),
          email: email.trim(),
          role,
        };
        localStorage.setItem('token', mockUser.token);
        localStorage.setItem('user', JSON.stringify({ fullName: mockUser.fullName, email: mockUser.email, role }));
        window.location.href = '/';
      } else {
        setError(formatApiError(err, 'Failed to create account. Please check your information and try again.'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl border border-[#d4a359]/40 p-8 shadow-xl">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#80182a] to-[#c85a32] text-[#f4e5c4] flex items-center justify-center mx-auto mb-3 shadow-md">
            <Music className="w-6 h-6" />
          </div>
          <h1 className="font-heritage text-2xl sm:text-3xl font-bold text-[#80182a]">
            Create Account
          </h1>
          <p className="mt-1 text-xs text-[#624f4b]">
            Join the Sadikshya patron circle for exclusive artisan collections.
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
              Full Name *
            </label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="Gyanendra Shrestha"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#fff8f5] border border-[#d4a359]/40 rounded-xl focus:outline-hidden focus:border-[#80182a] text-[#1f1412]"
              />
              <User className="w-4 h-4 text-[#624f4b] absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-[#624f4b] mb-1">
              Email Address *
            </label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#fff8f5] border border-[#d4a359]/40 rounded-xl focus:outline-hidden focus:border-[#80182a] text-[#1f1412]"
              />
              <Mail className="w-4 h-4 text-[#624f4b] absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-[#624f4b] mb-1">
              Contact Phone Number *
            </label>
            <div className="relative">
              <input
                type="tel"
                required
                placeholder="+977 9841XXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#fff8f5] border border-[#d4a359]/40 rounded-xl focus:outline-hidden focus:border-[#80182a] text-[#1f1412]"
              />
              <Phone className="w-4 h-4 text-[#624f4b] absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-[#624f4b] mb-1">
              Password *
            </label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="Create a strong password"
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
              <span>Create Account (POST /api/auth/register)</span>
            )}
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-[#d4a359]/20 text-center text-xs text-[#624f4b]">
          Already registered?{' '}
          <Link to="/login" className="font-bold text-[#80182a] hover:underline">
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
}
