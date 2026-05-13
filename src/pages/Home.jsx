import React from 'react';
import Hero from '../components/Hero';
import JobListing from '../components/JobListing';
import { useAppContext } from '../context/AppContext';
import ExperienceFiltering from './ExperienceFiltering';

const Home = () => {
  const { categories, error, jobs, loading, stats } = useAppContext();
  const featuredJobs = jobs.slice(0, 6);

  return (
    <>
      <Hero />

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            { label: 'Active openings', value: stats.totalJobs || 50 },
            { label: 'Hiring companies', value: stats.totalCompanies || 10 },
            { label: 'Categories', value: stats.categories || 10 },
            { label: 'Remote roles', value: stats.remoteRoles || 16 },
          ].map((item, index) => (
            <div
              key={item.label}
              className="glass-card animate-fade-up rounded-[1.75rem] p-5 transition duration-300 hover:-translate-y-2"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <p className="text-sm text-slate-500">{item.label}</p>
              <h2 className="mt-2 font-display text-4xl font-bold text-slate-950">{item.value}</h2>
            </div>
          ))}
        </div>
      </section>

      <section id="job-grid" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-brand-700">Featured opportunities</p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-slate-950 sm:text-4xl">
              Fresh roles from verified teams
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              The backend and frontend share the same jobs source, so listings stay consistent with search, categories, and route navigation.
            </p>
          </div>
          <div className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-soft">
            {categories.length} categories live
          </div>
        </div>

        {error ? (
          <div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        ) : null}

        <JobListing
          jobs={featuredJobs}
          loading={loading}
          emptyMessage="We could not find featured jobs yet. Try refreshing the page or changing filters from the hero search."
        />
      </section>

      <ExperienceFiltering />
    </>
  );
};

export default Home;
