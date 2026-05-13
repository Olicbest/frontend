import React from 'react';
import JobCard from './JobCard';

const JobListing = ({ jobs = [], loading = false, emptyMessage = 'No matching jobs found yet.' }) => {
  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={`skeleton-${index}`}
            className="h-[320px] animate-pulse rounded-[1.75rem] border border-white/60 bg-white/60 shadow-soft"
          />
        ))}
      </div>
    );
  }

  if (!jobs.length) {
    return (
      <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white/80 p-10 text-center shadow-soft">
        <h3 className="font-display text-2xl font-semibold text-slate-900">Nothing matched this search</h3>
        <p className="mt-3 text-sm leading-7 text-slate-600">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {jobs.map((job, index) => (
        <div key={job.id} className="animate-fade-up will-change-transform" style={{ animationDelay: `${index * 60}ms` }}>
          <JobCard job={job} />
        </div>
      ))}
    </div>
  );
};

export default JobListing;
