import React from 'react';
import JobListing from '../components/JobListing';
import { useAppContext } from '../context/AppContext';

const JobsPage = () => {
  const { error, filters, jobs, loading, resetFilters } = useAppContext();

  const activeFilters = Object.entries(filters).filter(([, value]) => value);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="glass-card animate-fade-up flex flex-col gap-5 rounded-[2rem] p-6 sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-brand-700">All jobs</p>
            <h1 className="mt-2 font-display text-4xl font-semibold text-slate-950">Explore every open role</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              Search results update from the backend API, so filters, counts, and cards stay in sync.
            </p>
          </div>
          <div className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white">
            {loading ? 'Loading jobs...' : `${jobs.length} roles found`}
          </div>
        </div>

        {activeFilters.length ? (
          <div className="flex flex-wrap items-center gap-2">
            {activeFilters.map(([key, value]) => (
              <span
                key={key}
                className="rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700"
              >
                {key}: {value}
              </span>
            ))}
            <button
              type="button"
              onClick={resetFilters}
              className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-700"
            >
              Clear filters
            </button>
          </div>
        ) : null}

        {error ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        ) : null}
      </div>

      <div className="mt-8">
        <JobListing
          jobs={jobs}
          loading={loading}
          emptyMessage="No roles matched your current filters. Clear them and we will show the full 50-job catalog again."
        />
      </div>
    </section>
  );
};

export default JobsPage;
