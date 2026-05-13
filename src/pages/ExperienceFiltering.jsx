import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const ExperienceFiltering = () => {
  const navigate = useNavigate();
  const { jobs, setFilters } = useAppContext();

  const levels = ['Entry Level', 'Mid Level', 'Senior Level', 'Lead Level', 'Internship'];

  const experienceLevels = levels.map((title) => ({
    title,
    jobs: jobs.filter((job) => (job.experienceLevel || '').includes(title.split(' ')[0])).length,
  }));

  const applyExperience = (experience) => {
    setFilters((current) => ({ ...current, experience }));
    navigate('/jobs');
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] bg-slate-950 px-6 py-8 text-white shadow-soft sm:px-10">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.22em] text-brand-200">Search with confidence</p>
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
            Filter opportunities by the stage you are actually in.
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
            Whether you are just getting started or leading teams, the experience filters below jump you straight into the right role mix.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {experienceLevels.map((level) => (
            <button
              key={level.title}
              type="button"
              onClick={() => applyExperience(level.title)}
              className="group rounded-[1.5rem] border border-white/10 bg-white/5 p-5 text-left transition duration-300 hover:-translate-y-1 hover:border-brand-300 hover:bg-brand-500/10"
            >
              <div className="text-sm uppercase tracking-[0.18em] text-slate-400">Experience</div>
              <div className="mt-3 font-display text-2xl font-semibold">{level.title}</div>
              <div className="mt-2 text-sm text-slate-300">{level.jobs} roles available</div>
              <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-200 transition group-hover:gap-3">
                Explore jobs
                <FiArrowRight />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceFiltering;
