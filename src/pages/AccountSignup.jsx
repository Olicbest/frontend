import React from 'react';
import { FiArrowRight, FiBriefcase, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const options = [
  {
    title: 'Job seeker',
    body: 'Create a career profile, apply faster, and manage your job journey from one place.',
    to: '/jobseeker',
    icon: FiUser,
    accent: 'from-brand-500 to-accent-500',
  },
  {
    title: 'Employer',
    body: 'Open an employer account to post roles, manage hiring, and grow your team with confidence.',
    to: '/jobsignup',
    icon: FiBriefcase,
    accent: 'from-slate-950 to-brand-600',
  },
];

const AccountSignup = () => {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <p className="text-sm uppercase tracking-[0.22em] text-brand-700">Choose your path</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-app sm:text-5xl">Create the right kind of account</h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted sm:text-base">
          Choose the path that fits you best with a clearer split between candidate and employer journeys, stronger motion, and a more polished visual style.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {options.map((option, index) => {
          const Icon = option.icon;

          return (
            <div
              key={option.title}
              className="animate-fade-up rounded-[2rem] border border-app bg-surface p-8 shadow-soft"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <div className={`inline-flex rounded-2xl bg-gradient-to-r ${option.accent} p-4 text-white shadow-soft`}>
                <Icon className="text-3xl" />
              </div>
              <h2 className="mt-6 font-display text-3xl font-semibold text-app">{option.title}</h2>
              <p className="mt-4 text-sm leading-7 text-muted">{option.body}</p>
              <Link
                to={option.to}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-700"
              >
                Continue
                <FiArrowRight />
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AccountSignup;
