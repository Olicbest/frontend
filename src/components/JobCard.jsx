import React from 'react';
import { FiArrowUpRight, FiBriefcase, FiClock, FiMapPin, FiWifi } from 'react-icons/fi';

const formatSkills = (skills = []) => skills.slice(0, 3);

const JobCard = ({ job }) => {
  const companyName = job.company?.companyName || job.companyName || 'Hiring Company';
  const postedDate = job.postedAt
    ? new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(new Date(job.postedAt))
    : 'New';

  return (
    <article className="group card-spotlight relative overflow-hidden rounded-[1.75rem] border border-white/60 bg-white/85 p-5 shadow-soft backdrop-blur transition duration-300 hover:-translate-y-2 hover:shadow-[0_28px_55px_rgba(88,57,35,0.16)]">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-500 via-accent-500 to-brand-300 opacity-80" />

      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="inline-flex rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-brand-700">
            {job.category?.name || 'Open Role'}
          </div>
          <h3 className="mt-4 font-display text-2xl font-semibold text-slate-950 transition group-hover:text-brand-700">
            {job.title}
          </h3>
          <p className="mt-2 text-sm font-medium text-slate-500">{companyName}</p>
        </div>
        <div className="rounded-2xl bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600">
          {postedDate}
        </div>
      </div>

      <p className="mt-5 line-clamp-3 text-sm leading-7 text-slate-600">{job.description}</p>

      <div className="mt-5 flex flex-wrap gap-2 text-xs font-medium text-slate-600">
        <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2">
          <FiMapPin />
          {job.location}
        </span>
        <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2">
          <FiWifi />
          {job.workMode || job.position}
        </span>
        <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2">
          <FiClock />
          {job.experienceLevel || job.requiredExperience}
        </span>
        <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2">
          <FiBriefcase />
          {job.position}
        </span>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {formatSkills(job.skills).map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-100 pt-5">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Salary</p>
          <p className="mt-1 text-sm font-semibold text-slate-900">{job.salary}</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition duration-300 hover:bg-brand-700">
          View role
          <FiArrowUpRight />
        </button>
      </div>
    </article>
  );
};

export default JobCard;
