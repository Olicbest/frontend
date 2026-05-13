import React from 'react';
import { FiGlobe, FiMapPin, FiUsers } from 'react-icons/fi';
import JobListing from '../components/JobListing';
import { useAppContext } from '../context/AppContext';

const CompanyProfile = () => {
  const { jobs, loading } = useAppContext();

  const companies = Object.values(
    jobs.reduce((accumulator, job) => {
      const company = job.company;

      if (!company) {
        return accumulator;
      }

      if (!accumulator[company.id]) {
        accumulator[company.id] = {
          ...company,
          openRoles: [],
        };
      }

      accumulator[company.id].openRoles.push(job);
      return accumulator;
    }, {}),
  );

  const featuredCompany = companies[0];

  if (!featuredCompany && !loading) {
    return (
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-white/85 p-8 text-center shadow-soft">
          <h1 className="font-display text-2xl font-semibold text-slate-950 sm:text-3xl">Company profile unavailable</h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            We could not load a featured employer right now. Visit the jobs page to browse all available roles.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {featuredCompany ? (
        <>
          <div className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-soft sm:p-10">
            <p className="text-sm uppercase tracking-[0.22em] text-brand-200">Featured employer</p>
            <h1 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">{featuredCompany.companyName}</h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
              {featuredCompany.companyName} is hiring across multiple teams. This profile now reads from the same shared jobs dataset that powers the homepage and jobs search experience.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                <div className="flex items-center gap-2 text-brand-200">
                  <FiMapPin />
                  Location
                </div>
                <p className="mt-2 text-lg font-semibold text-white">{featuredCompany.address}</p>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                <div className="flex items-center gap-2 text-brand-200">
                  <FiUsers />
                  Team size
                </div>
                <p className="mt-2 text-lg font-semibold text-white">{featuredCompany.numberOfEmployees}</p>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                <div className="flex items-center gap-2 text-brand-200">
                  <FiGlobe />
                  Industry
                </div>
                <p className="mt-2 text-lg font-semibold text-white">{featuredCompany.industry}</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="mb-6">
              <p className="text-sm uppercase tracking-[0.2em] text-brand-700">Open roles</p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-slate-950">
                Jobs from {featuredCompany.companyName}
              </h2>
            </div>
            <JobListing jobs={featuredCompany.openRoles} loading={loading} />
          </div>
        </>
      ) : null}
    </section>
  );
};

export default CompanyProfile;
