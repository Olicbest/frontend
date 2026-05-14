import React, { useEffect, useMemo, useState } from 'react';
import { FiBriefcase, FiMapPin, FiPlusCircle, FiUsers } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const API_BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

const initialForm = {
  title: '',
  description: '',
  categoryId: '',
  location: '',
  experience: '',
  skills: '',
  requiredEducation: '',
  requiredExperience: '',
  position: '',
  salary: '',
};

const JobPostForm = () => {
  const navigate = useNavigate();
  const { categories } = useAppContext();
  const [auth] = useState(() => {
    const stored = localStorage.getItem('jobPosterAuth');
    return stored ? JSON.parse(stored) : null;
  });
  const [dashboard, setDashboard] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const headers = useMemo(
    () => ({
      'Content-Type': 'application/json',
      Authorization: auth?.access_token ? `Bearer ${auth.access_token}` : '',
    }),
    [auth?.access_token],
  );

  const fetchDashboard = async () => {
    if (!auth?.access_token) {
      navigate('/login');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/jobposter/dashboard`, {
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Unable to load your employer dashboard.');
      }

      setDashboard(data.jobPoster);
      setJobs(data.jobs || []);
    } catch (requestError) {
      setError(requestError.message || 'Unable to load your employer dashboard.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  useEffect(() => {
    const syncAuth = () => {
      const stored = localStorage.getItem('jobPosterAuth');

      if (!stored) {
        navigate('/login');
      }
    };

    window.addEventListener('authchange', syncAuth);
    window.addEventListener('storage', syncAuth);

    return () => {
      window.removeEventListener('authchange', syncAuth);
      window.removeEventListener('storage', syncAuth);
    };
  }, [navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/createjob`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          ...form,
          skills: form.skills
            .split(',')
            .map((item) => item.trim())
            .filter(Boolean),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Unable to create this job.');
      }

      setForm(initialForm);
      setSuccessMessage('Job posted successfully.');
      await fetchDashboard();
    } catch (requestError) {
      setError(requestError.message || 'Unable to create this job.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!auth?.access_token) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-app bg-surface p-6 shadow-soft sm:p-8">
        <p className="text-sm uppercase tracking-[0.2em] text-brand-700">Employer dashboard</p>
        <h1 className="mt-3 font-display text-3xl font-semibold text-app sm:text-4xl">
          {dashboard?.company?.companyName || 'Your company'} hiring workspace
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
          This dashboard is tied to the signed-in job poster. You can create jobs here, and the list below shows only the jobs posted for your own company.
        </p>
      </div>

      {error ? (
        <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      ) : null}

      {successMessage ? (
        <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {successMessage}
        </div>
      ) : null}

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[2rem] border border-app bg-surface p-6 shadow-soft">
          <div className="flex items-center gap-3">
            <FiPlusCircle className="text-xl text-brand-700" />
            <h2 className="font-display text-2xl font-semibold text-app">Post a new job</h2>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 grid gap-5 md:grid-cols-2">
            <label className="block md:col-span-2">
              <span className="mb-2 block text-sm font-medium text-app">Job title</span>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full rounded-2xl border border-app bg-white/80 px-4 py-3 text-app outline-none transition focus:border-brand-400"
                required
              />
            </label>

            <label className="block md:col-span-2">
              <span className="mb-2 block text-sm font-medium text-app">Description</span>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="5"
                className="w-full rounded-2xl border border-app bg-white/80 px-4 py-3 text-app outline-none transition focus:border-brand-400"
                required
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-app">Category</span>
              <select
                name="categoryId"
                value={form.categoryId}
                onChange={handleChange}
                className="w-full rounded-2xl border border-app bg-white/80 px-4 py-3 text-app outline-none transition focus:border-brand-400"
                required
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-app">Location</span>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                className="w-full rounded-2xl border border-app bg-white/80 px-4 py-3 text-app outline-none transition focus:border-brand-400"
                required
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-app">Experience level</span>
              <input
                name="experience"
                value={form.experience}
                onChange={handleChange}
                placeholder="Entry Level, Mid Level, Senior Level"
                className="w-full rounded-2xl border border-app bg-white/80 px-4 py-3 text-app outline-none transition focus:border-brand-400"
                required
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-app">Position type</span>
              <input
                name="position"
                value={form.position}
                onChange={handleChange}
                placeholder="Full Time, Part Time, Contract"
                className="w-full rounded-2xl border border-app bg-white/80 px-4 py-3 text-app outline-none transition focus:border-brand-400"
                required
              />
            </label>

            <label className="block md:col-span-2">
              <span className="mb-2 block text-sm font-medium text-app">Skills</span>
              <input
                name="skills"
                value={form.skills}
                onChange={handleChange}
                placeholder="React, Node.js, Communication"
                className="w-full rounded-2xl border border-app bg-white/80 px-4 py-3 text-app outline-none transition focus:border-brand-400"
                required
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-app">Required education</span>
              <input
                name="requiredEducation"
                value={form.requiredEducation}
                onChange={handleChange}
                className="w-full rounded-2xl border border-app bg-white/80 px-4 py-3 text-app outline-none transition focus:border-brand-400"
                required
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-app">Required experience</span>
              <input
                name="requiredExperience"
                value={form.requiredExperience}
                onChange={handleChange}
                placeholder="2+ years"
                className="w-full rounded-2xl border border-app bg-white/80 px-4 py-3 text-app outline-none transition focus:border-brand-400"
                required
              />
            </label>

            <label className="block md:col-span-2">
              <span className="mb-2 block text-sm font-medium text-app">Salary</span>
              <input
                name="salary"
                value={form.salary}
                onChange={handleChange}
                placeholder="NGN 250,000 - 400,000 / month"
                className="w-full rounded-2xl border border-app bg-white/80 px-4 py-3 text-app outline-none transition focus:border-brand-400"
                required
              />
            </label>

            <div className="md:col-span-2 flex justify-end">
              <button
                disabled={submitting}
                className="w-full rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70 md:w-auto"
              >
                {submitting ? 'Posting...' : 'Post Job'}
              </button>
            </div>
          </form>
        </div>

        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.75rem] border border-app bg-surface p-5 shadow-soft">
              <div className="flex items-center gap-3 text-brand-700">
                <FiBriefcase />
                <span className="text-sm font-semibold uppercase tracking-[0.16em]">Live jobs</span>
              </div>
              <p className="mt-4 font-display text-4xl font-semibold text-app">{jobs.length}</p>
            </div>
            <div className="rounded-[1.75rem] border border-app bg-surface p-5 shadow-soft">
              <div className="flex items-center gap-3 text-brand-700">
                <FiUsers />
                <span className="text-sm font-semibold uppercase tracking-[0.16em]">Company</span>
              </div>
              <p className="mt-4 text-lg font-semibold text-app">{dashboard?.company?.companyName || 'Employer'}</p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-app bg-surface p-6 shadow-soft">
            <h2 className="font-display text-2xl font-semibold text-app">Your posted jobs</h2>
            <p className="mt-2 text-sm text-muted">
              Only jobs belonging to your company are shown here.
            </p>

            <div className="mt-6 space-y-4">
              {loading ? (
                <div className="rounded-2xl border border-dashed border-app px-4 py-8 text-center text-sm text-muted">
                  Loading your jobs...
                </div>
              ) : jobs.length ? (
                jobs.map((job) => (
                  <div key={job.id} className="rounded-2xl border border-app bg-app-shell p-4">
                    <h3 className="font-display text-lg font-semibold text-app">{job.title}</h3>
                    <p className="mt-2 text-sm text-muted">{job.category?.name || 'Uncategorized'} | {job.position}</p>
                    <p className="mt-2 inline-flex items-center gap-2 text-sm text-muted">
                      <FiMapPin />
                      {job.location}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-muted">{job.salary}</p>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-app px-4 py-8 text-center text-sm text-muted">
                  No jobs posted yet for this company.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobPostForm;
