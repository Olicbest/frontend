import React, { useContext, useState } from 'react';
import { FiArrowRight, FiCheckCircle, FiEye, FiEyeOff, FiLock, FiMail, FiMapPin } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';

const LoginForm = () => {
  const { loginUser } = useContext(AppContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    const result = await loginUser({ email, password });

    if (result.success) {
      if (result.role === 'ADMIN') {
        navigate('/admin');
      } else if (result.role === 'COMPANY_POSTER') {
        navigate('/JobPostForm');
      } else {
        navigate('/userprofile');
      }
    } else {
      setError(result.error || 'Login failed. Please try again.');
    }

    setSubmitting(false);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="animate-fade-up rounded-[2rem] border border-app bg-surface p-8 shadow-soft backdrop-blur xl:p-10">
          <div className="inline-flex items-center rounded-full bg-brand-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-brand-700">
            Job seeker login
          </div>
          <h1 className="mt-5 font-display text-4xl font-semibold text-app">Welcome back to your next move.</h1>
          <p className="mt-4 text-sm leading-7 text-muted">
            Track applications, explore fresh jobs, and keep your profile ready for the next opportunity.
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleLogin}>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-app">Email address</span>
              <div className="relative">
                <FiMail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
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

            <div className="flex items-center justify-between gap-3 text-sm">
              <a href="/forgot-password" className="font-semibold text-brand-700 transition hover:text-brand-500">
                Forgot password?
              </a>
              <span className="text-muted">Secure sign in</span>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? 'Signing in...' : 'Log in'}
              <FiArrowRight />
            </button>

            {error ? <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}
          </form>

          <p className="mt-6 text-sm text-muted">
            Do not have an account?{' '}
            <Link to="/accountsignup" className="font-semibold text-brand-700 transition hover:text-brand-500">
              Create one
            </Link>
          </p>
        </div>

        <div className="animate-scale-in relative overflow-hidden rounded-[2rem] border border-app bg-slate-950 p-8 text-white shadow-soft xl:p-10">
          <div className="orb orb-one" />
          <div className="orb orb-two" />
          <div className="mesh-overlay" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-brand-200">
              Candidate workspace
            </div>
            <h2 className="mt-4 max-w-xl font-display text-4xl font-semibold leading-tight">
              Pick up where you left off and keep your job search moving.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">
              Review saved roles, track recent applications, and stay ready when the right opportunity opens.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-[1.1fr_0.9fr]">
              <div className="animate-fade-up rounded-[1.75rem] border border-white/10 bg-white/8 p-5 backdrop-blur">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Recent activity</p>
                    <h3 className="mt-2 font-display text-2xl font-semibold text-white">Application Tracker</h3>
                  </div>
                  <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-300">
                    Active
                  </span>
                </div>

                <div className="mt-6 space-y-4">
                  {[
                    { role: 'Product Designer', company: 'Blisscare', meta: 'Remote' },
                    { role: 'Frontend Engineer', company: 'Merrybet', meta: 'Lagos' },
                    { role: 'Data Analyst', company: 'EastHopeMart', meta: 'Hybrid' },
                  ].map((item, index) => (
                    <div
                      key={`${item.role}-${item.company}`}
                      className="animate-slide-in flex items-center justify-between gap-4 rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-3"
                      style={{ animationDelay: `${index * 120}ms` }}
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-white">{item.role}</p>
                        <p className="truncate text-xs text-slate-400">{item.company}</p>
                      </div>
                      <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-slate-300">
                        <FiMapPin className="shrink-0" />
                        {item.meta}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="animate-float-soft rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-white/14 to-white/6 p-5 backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Today</p>
                  <p className="mt-3 text-4xl font-semibold text-white">12</p>
                  <p className="mt-2 text-sm text-slate-300">new roles matched your saved preferences</p>
                </div>

                <div className="rounded-[1.75rem] border border-white/10 bg-white/6 p-5 backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Checklist</p>
                  <div className="mt-4 space-y-3">
                    {[
                      'Profile details completed',
                      'CV uploaded and ready',
                      'Job alerts turned on',
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-3 text-sm text-slate-200">
                        <FiCheckCircle className="text-emerald-300" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                { value: '24', label: 'Saved jobs' },
                { value: '08', label: 'Applications sent' },
                { value: '03', label: 'Interviews pending' },
              ].map((item, index) => (
                <div
                  key={item.label}
                  className="animate-fade-up rounded-[1.5rem] border border-white/10 bg-white/5 p-4 text-center backdrop-blur"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <p className="text-2xl font-semibold text-white">{item.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-400">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
