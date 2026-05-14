import React, { useEffect, useMemo, useState } from 'react';
import {
  FiActivity,
  FiBriefcase,
  FiShield,
  FiTrash2,
  FiUsers,
} from 'react-icons/fi';
import { useAppContext } from '../context/AppContext';

const API_BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

const StatCard = ({ icon: Icon, label, value, caption }) => (
  <div className="rounded-[1.75rem] border border-app bg-surface p-6 shadow-soft">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-muted">{label}</p>
        <h2 className="mt-3 font-display text-4xl font-semibold text-app">{value}</h2>
      </div>
      <div className="rounded-2xl bg-brand-100 p-3 text-brand-700">
        <Icon className="text-xl" />
      </div>
    </div>
    <p className="mt-4 text-sm text-muted">{caption}</p>
  </div>
);

const LoginPanel = ({ onLogin, submitting, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin({ email, password });
  };

  return (
    <section className="mx-auto max-w-md px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-app bg-surface p-8 shadow-soft">
        <p className="text-sm uppercase tracking-[0.2em] text-brand-600">Admin access</p>
        <h1 className="mt-3 font-display text-3xl font-semibold text-app">Sign in to manage the platform</h1>
        <p className="mt-3 text-sm leading-7 text-muted">
          Use an admin account to review platform totals, track growth, and manage records.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <input
            className="w-full rounded-2xl border border-app bg-app-shell px-4 py-3 text-app outline-none transition focus:border-brand-400"
            type="email"
            placeholder="Admin email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <input
            className="w-full rounded-2xl border border-app bg-app-shell px-4 py-3 text-app outline-none transition focus:border-brand-400"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <button
            className="w-full rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
            type="submit"
            disabled={submitting}
          >
            {submitting ? 'Signing in...' : 'Sign in'}
          </button>
          {error ? <p className="text-sm text-rose-600">{error}</p> : null}
        </form>
      </div>
    </section>
  );
};

const GrowthChart = ({ data = [] }) => {
  const maxValue = Math.max(...data.map((item) => item.value), 1);

  return (
    <div className="rounded-[1.75rem] border border-app bg-surface p-6 shadow-soft">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-brand-600">Growth</p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-app">User growth trend</h2>
        </div>
        <div className="rounded-full bg-brand-50 px-4 py-2 text-xs font-semibold text-brand-700">
          Last {Math.max(data.length, 1)} months
        </div>
      </div>

      <div className="mt-8 grid h-64 grid-cols-1 items-end gap-4 sm:grid-cols-6">
        {data.length ? (
          data.map((item) => (
            <div key={item.label} className="flex h-full flex-col justify-end gap-3">
              <div className="text-center text-xs font-semibold text-muted">{item.value}</div>
              <div
                className="rounded-t-[1.25rem] bg-gradient-to-t from-brand-600 via-brand-500 to-accent-500 transition-all duration-500"
                style={{ height: `${Math.max((item.value / maxValue) * 100, 12)}%` }}
              />
              <div className="text-center text-xs text-muted">{item.label}</div>
            </div>
          ))
        ) : (
          <div className="col-span-full rounded-2xl border border-dashed border-app px-4 py-8 text-center text-sm text-muted">
            Growth data will appear as users are created.
          </div>
        )}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [auth, setAuth] = useState(() => {
    const stored = localStorage.getItem('adminAuth');
    return stored ? JSON.parse(stored) : null;
  });
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dashboard, setDashboard] = useState(null);
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [actionMessage, setActionMessage] = useState('');

  const headers = useMemo(
    () => ({
      'Content-Type': 'application/json',
      Authorization: auth?.access_token ? `Bearer ${auth.access_token}` : '',
    }),
    [auth?.access_token],
  );

  useEffect(() => {
    if (auth) {
      localStorage.setItem('adminAuth', JSON.stringify(auth));
    } else {
      localStorage.removeItem('adminAuth');
    }
  }, [auth]);

  const fetchDashboard = async (authHeaders = headers) => {
    if (!auth?.access_token && !authHeaders.Authorization) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const [dashboardResponse, usersResponse, jobsResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/api/admin/dashboard`, { headers: authHeaders }),
        fetch(`${API_BASE_URL}/api/admin/users`, { headers: authHeaders }),
        fetch(`${API_BASE_URL}/api/admin/jobs`, { headers: authHeaders }),
      ]);

      if ([dashboardResponse, usersResponse, jobsResponse].some((response) => !response.ok)) {
        throw new Error('Admin session expired or access was denied.');
      }

      const [dashboardData, usersData, jobsData] = await Promise.all([
        dashboardResponse.json(),
        usersResponse.json(),
        jobsResponse.json(),
      ]);

      setDashboard(dashboardData);
      setUsers(usersData);
      setJobs(jobsData);
    } catch (requestError) {
      setError(requestError.message || 'Unable to load the admin dashboard.');
      setAuth(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleAdminLogin = async (credentials) => {
    setSubmitting(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Unable to sign in as admin.');
      }

      const nextAuth = {
        access_token: data.access_token,
        admin: data.admin,
      };

      localStorage.removeItem('localUser');
      localStorage.removeItem('jobPosterAuth');
      setAuth(nextAuth);
      await fetchDashboard({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${data.access_token}`,
      });
    } catch (requestError) {
      setError(requestError.message || 'Unable to sign in as admin.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (type, id) => {
    const confirmed = window.confirm(`Delete this ${type}? This action cannot be undone.`);
    if (!confirmed) {
      return;
    }

    setActionMessage('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/${type === 'job' ? 'jobs' : 'users'}/${id}`, {
        method: 'DELETE',
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Unable to delete this ${type}.`);
      }

      setActionMessage(data.message || `${type} deleted successfully.`);
      await fetchDashboard();
    } catch (requestError) {
      setActionMessage(requestError.message || `Unable to delete this ${type}.`);
    }
  };

  const signOut = () => {
    setAuth(null);
    setDashboard(null);
    setUsers([]);
    setJobs([]);
    setError('');
  };

  if (!auth?.access_token) {
    return <LoginPanel onLogin={handleAdminLogin} submitting={submitting} error={error} />;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 rounded-[2rem] border border-app bg-surface p-6 shadow-soft sm:flex-row sm:items-end sm:justify-between sm:p-8">
        <div>
          <p className="text-sm uppercase tracking-[0.22em] text-brand-600">Admin dashboard</p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-app">Platform overview and controls</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
            Review totals, track user growth, and delete jobs or users from one responsive workspace.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={signOut}
            className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            Sign out
          </button>
        </div>
      </div>

      {error ? (
        <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      ) : null}

      {actionMessage ? (
        <div className="mt-6 rounded-2xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-700">
          {actionMessage}
        </div>
      ) : null}

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={FiUsers}
          label="Total users"
          value={dashboard?.totals?.users ?? (loading ? '...' : 0)}
          caption="Registered users currently in the platform database."
        />
        <StatCard
          icon={FiBriefcase}
          label="Total jobs"
          value={dashboard?.totals?.jobs ?? (loading ? '...' : 0)}
          caption="Combined live and seeded job catalog used by the frontend."
        />
        <StatCard
          icon={FiActivity}
          label="Live jobs"
          value={dashboard?.totals?.liveJobs ?? (loading ? '...' : 0)}
          caption="Database-backed jobs that admins can directly delete."
        />
        <StatCard
          icon={FiShield}
          label="Admins"
          value={dashboard?.totals?.admins ?? (loading ? '...' : 0)}
          caption="Admin accounts with management access."
        />
      </div>

      <div className="mt-8">
        <GrowthChart data={dashboard?.chart || []} />
      </div>

      <div className="mt-8 grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[1.75rem] border border-app bg-surface p-6 shadow-soft">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-brand-600">Users</p>
              <h2 className="mt-2 font-display text-2xl font-semibold text-app">Manage users</h2>
            </div>
            <div className="rounded-full bg-brand-50 px-4 py-2 text-xs font-semibold text-brand-700">
              {users.length} users
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="text-muted">
                <tr className="border-b border-app">
                  <th className="py-3 pr-4">Name</th>
                  <th className="py-3 pr-4">Email</th>
                  <th className="py-3 pr-4">Country</th>
                  <th className="py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-app">
                    <td className="py-4 pr-4 text-app">{user.firstName} {user.lastName}</td>
                    <td className="py-4 pr-4 text-muted">{user.email}</td>
                    <td className="py-4 pr-4 text-muted">{user.country || 'Not set'}</td>
                    <td className="py-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleDelete('user', user.id)}
                        className="inline-flex items-center gap-2 rounded-full border border-rose-200 px-3 py-2 text-xs font-semibold text-rose-600 transition hover:bg-rose-50"
                      >
                        <FiTrash2 />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-app bg-surface p-6 shadow-soft">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-brand-600">Jobs</p>
              <h2 className="mt-2 font-display text-2xl font-semibold text-app">Manage live jobs</h2>
            </div>
            <div className="rounded-full bg-brand-50 px-4 py-2 text-xs font-semibold text-brand-700">
              {jobs.length} live jobs
            </div>
          </div>

          <div className="space-y-4">
            {jobs.length ? (
              jobs.map((job) => (
                <div key={job.id} className="rounded-2xl border border-app bg-app-shell p-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="font-display text-lg font-semibold text-app">{job.title}</h3>
                      <p className="mt-1 text-sm text-muted">{job.companyName} | {job.location}</p>
                      <p className="mt-2 text-xs uppercase tracking-[0.18em] text-muted">
                        {job.category} | {job.position}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDelete('job', job.id)}
                      className="inline-flex items-center gap-2 rounded-full border border-rose-200 px-3 py-2 text-xs font-semibold text-rose-600 transition hover:bg-rose-50"
                    >
                      <FiTrash2 />
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-app px-4 py-8 text-center text-sm text-muted">
                No live database jobs are available to manage yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
