import React, { useEffect, useState } from 'react';
import { FiArrowLeft, FiBriefcase, FiClock, FiMapPin, FiWifi } from 'react-icons/fi';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import ApplyModal from '../components/ApplyModal';

const JobDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getJobById, hasAppliedToJob, user } = useAppContext();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showApplyModal, setShowApplyModal] = useState(false);

  useEffect(() => {
    let active = true;

    const loadJob = async () => {
      setLoading(true);
      setError('');

      try {
        const result = await getJobById(id);
        if (active) {
          setJob(result);
        }
      } catch (requestError) {
        if (active) {
          setError(requestError.message || 'Unable to load this job.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadJob();

    return () => {
      active = false;
    };
  }, [getJobById, id]);

  if (loading) {
    return (
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="glass-card animate-fade-up rounded-[2rem] p-8">
          <p className="text-sm text-muted">Loading job details...</p>
        </div>
      </section>
    );
  }

  if (error || !job) {
    return (
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="glass-card rounded-[2rem] p-8">
          <p className="text-sm text-rose-700">{error || 'Job not found.'}</p>
        </div>
      </section>
    );
  }

  const alreadyApplied = hasAppliedToJob(job.id);
  const companyName = job.company?.companyName || job.companyName || 'Hiring Company';

  const handleApply = () => {
    if (!user) {
      setFeedback('Please log in first to apply for a job.');
      navigate('/login');
      return;
    }

    setFeedback('');
    setShowApplyModal(true);
  };

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <Link to="/jobs" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 transition hover:text-brand-500">
        <FiArrowLeft />
        Back to jobs
      </Link>

      <div className="mt-5 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="glass-card animate-fade-up rounded-[2rem] p-6 sm:p-8">
          <div className="inline-flex rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-brand-700">
            {job.category?.name || 'Open Role'}
          </div>
          <h1 className="mt-4 font-display text-3xl font-semibold text-app sm:text-4xl">{job.title}</h1>
          <p className="mt-2 text-base font-medium text-muted">{companyName}</p>

          <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-600">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2">
              <FiMapPin />
              {job.location}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2">
              <FiWifi />
              {job.workMode || job.position}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2">
              <FiClock />
              {job.experienceLevel || job.requiredExperience}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2">
              <FiBriefcase />
              {job.position}
            </span>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-app">Job description</h2>
            <p className="mt-3 text-sm leading-8 text-muted sm:text-base">{job.description}</p>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-app">Requirements</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border border-app bg-white/60 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Education</p>
                <p className="mt-2 text-sm text-app">{job.requiredEducation || 'Not specified'}</p>
              </div>
              <div className="rounded-[1.5rem] border border-app bg-white/60 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Experience</p>
                <p className="mt-2 text-sm text-app">{job.requiredExperience || job.experienceLevel || 'Not specified'}</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-app">Key skills</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {(job.skills || []).map((skill) => (
                <span key={skill} className="rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <aside className="animate-scale-in rounded-[2rem] border border-app bg-slate-950 p-6 text-white shadow-soft sm:p-8">
          <p className="text-sm uppercase tracking-[0.2em] text-brand-200">Apply now</p>
          <p className="mt-4 text-3xl font-semibold">{job.salary}</p>
          <p className="mt-2 text-sm leading-7 text-slate-300">
            Submit your application and track this role from your profile after applying.
          </p>

          <button
            type="button"
            onClick={handleApply}
            disabled={alreadyApplied}
            className="mt-8 w-full rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-brand-100 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {alreadyApplied ? 'Application submitted' : 'Apply for this role'}
          </button>

          {feedback ? <p className="mt-4 text-sm text-brand-200">{feedback}</p> : null}

          <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Company</p>
            <p className="mt-2 text-lg font-semibold text-white">{companyName}</p>
            <p className="mt-2 text-sm text-slate-300">{job.location}</p>
          </div>
        </aside>
      </div>

      <ApplyModal job={job} open={showApplyModal} onClose={() => setShowApplyModal(false)} />
    </section>
  );
};

export default JobDetails;
