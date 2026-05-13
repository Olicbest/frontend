import React, { useState } from 'react';
import { FiArrowRight, FiBriefcase, FiEye, FiEyeOff, FiLock, FiMail } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

const API_BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

const LoginJobPoster = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/jobposter/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Unable to sign in as employer.');
      }

      localStorage.setItem('jobPosterAuth', JSON.stringify(data));
      navigate('/JobPostForm');
    } catch (requestError) {
      setError(requestError.message || 'Unable to sign in as employer.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="animate-scale-in relative overflow-hidden rounded-[2rem] border border-app bg-slate-950 p-8 text-white shadow-soft xl:p-10">
          <div className="orb orb-one" />
          <div className="orb orb-two" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-brand-200">
              <FiBriefcase />
              Employer access
            </div>
            <h1 className="mt-5 font-display text-4xl font-semibold">Manage hiring from one clean dashboard.</h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">
              Sign in as a company poster to publish openings, track hiring activity, and stay aligned with the refreshed admin and candidate experience.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {[
                'Responsive layout for mobile and desktop',
                'Consistent contrast across the full product',
                'Animation that feels deliberate, not distracting',
                'Direct employer login tied to the backend API',
              ].map((item) => (
                <div key={item} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4 text-sm leading-6 text-slate-200">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="animate-fade-up rounded-[2rem] border border-app bg-surface p-8 shadow-soft backdrop-blur xl:p-10">
          <div className="inline-flex items-center rounded-full bg-brand-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-brand-700">
            Company poster login
          </div>
          <h2 className="mt-5 font-display text-4xl font-semibold text-app">Sign in to your employer workspace.</h2>
          <p className="mt-4 text-sm leading-7 text-muted">
            Access your company posting tools with a cleaner login flow and a more refined visual system.
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleLogin}>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-app">Work email</span>
              <div className="relative">
                <FiMail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="team@company.com"
                  className="w-full rounded-2xl border border-app bg-app-shell px-12 py-3 text-app outline-none transition focus:border-brand-400"
                  required
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-app">Password</span>
              <div className="relative">
                <FiLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-2xl border border-app bg-app-shell px-12 py-3 pr-12 text-app outline-none transition focus:border-brand-400"
                  required
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted"
                  onClick={() => setShowPassword((current) => !current)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </label>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? 'Signing in...' : 'Log in as employer'}
              <FiArrowRight />
            </button>

            {error ? <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}
          </form>

          <p className="mt-6 text-sm text-muted">
            Need an employer account?{' '}
            <Link to="/jobsignup" className="font-semibold text-brand-700 transition hover:text-brand-500">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginJobPoster;
