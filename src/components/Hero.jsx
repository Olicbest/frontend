import React, { useState } from 'react';
import { FiArrowRight, FiBriefcase, FiMapPin, FiSearch, FiWifi } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Hero = () => {
  const navigate = useNavigate();
  const { backendStatus, categories, filters, setFilters, stats } = useAppContext();
  const [draftFilters, setDraftFilters] = useState(filters);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDraftFilters((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFilters(draftFilters);
    navigate('/jobs');
  };

  const metricCards = [
    { label: 'Open roles', value: stats.totalJobs || '50+' },
    { label: 'Hiring teams', value: stats.totalCompanies || '10' },
    { label: 'Remote-friendly', value: stats.remoteRoles || '16' },
  ];

  return (
    <section className="relative overflow-hidden pt-10">
      <div className="orb orb-one" />
      <div className="orb orb-two" />
      <div className="mesh-overlay" />

      <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-10 pt-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pb-16">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/60 px-4 py-2 text-sm font-medium text-slate-700 shadow-soft backdrop-blur">
            <span className={`h-2.5 w-2.5 rounded-full ${backendStatus === 'connected' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
            Backend {backendStatus === 'connected' ? 'connected' : 'warming up'}
          </div>

          <h1 className="mt-6 max-w-3xl font-display text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Connect talent to teams with a faster, sharper hiring experience.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Search across 50 curated opportunities, explore verified companies, and move from discovery to application with a smoother, more polished experience.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => navigate('/jobs')}
              className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-brand-700"
            >
              Browse all jobs
              <FiArrowRight />
            </button>
            <a
              href="#job-grid"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition duration-300 hover:-translate-y-0.5 hover:border-brand-400"
            >
              Explore highlights
              <FiBriefcase />
            </a>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {metricCards.map((item, index) => (
              <div
                key={item.label}
                className="glass-card animate-scale-in rounded-3xl p-5 transition duration-300 hover:-translate-y-2"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <div className="text-3xl font-bold text-slate-950">{item.value}</div>
                <div className="mt-1 text-sm text-slate-600">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="animate-slide-in rounded-[2rem] border border-white/50 bg-white/80 p-5 shadow-soft backdrop-blur sm:p-7">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-2xl bg-brand-100 p-3 text-brand-700">
              <FiSearch className="text-xl" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold text-slate-950">Launch your search</h2>
              <p className="text-sm text-slate-500">Filter by role, location, category, and work style.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 sm:col-span-2">
              <span className="text-sm font-medium text-slate-700">Role or keyword</span>
              <div className="relative">
                <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  name="title"
                  value={draftFilters.title}
                  onChange={handleChange}
                  placeholder="Frontend Engineer, Data Analyst..."
                  className="w-full rounded-2xl border border-slate-200 bg-white px-12 py-3 text-sm text-slate-700 outline-none transition focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
                />
              </div>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">Location</span>
              <div className="relative">
                <FiMapPin className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  name="location"
                  value={draftFilters.location}
                  onChange={handleChange}
                  placeholder="Lagos, Abuja, Remote"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-12 py-3 text-sm text-slate-700 outline-none transition focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
                />
              </div>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">Category</span>
              <select
                name="category"
                value={draftFilters.category}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
              >
                <option value="">All categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">Experience</span>
              <select
                name="experience"
                value={draftFilters.experience}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
              >
                <option value="">Any level</option>
                <option value="Entry">Entry Level</option>
                <option value="Mid">Mid Level</option>
                <option value="Senior">Senior Level</option>
                <option value="Lead">Lead Level</option>
                <option value="Intern">Internship</option>
              </select>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">Work mode</span>
              <div className="relative">
                <FiWifi className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <select
                  name="workMode"
                  value={draftFilters.workMode}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-12 py-3 text-sm text-slate-700 outline-none transition focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
                >
                  <option value="">Any work mode</option>
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Onsite">Onsite</option>
                </select>
              </div>
            </label>

            <button
              type="submit"
              className="sm:col-span-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand-600 via-brand-500 to-accent-500 px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition duration-300 hover:-translate-y-0.5"
            >
              Find matching jobs
              <FiArrowRight />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;
