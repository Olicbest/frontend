import React from 'react';

const fields = [
  'Job Title',
  'Job Functions',
  'Industry',
  'Work Type',
  'Location',
  'Qualification',
  'Experience Reqmt.',
  'Job Level',
  'Salary Currency',
  'Salary',
];

const JobPostForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="glass-card rounded-[2rem] p-6 sm:p-8">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-brand-700">Employer workspace</p>
          <h1 className="mt-3 font-display text-3xl font-semibold text-app sm:text-4xl">
            Please add your job details below
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-5 md:grid-cols-2">
          {fields.map((label) => (
            <div key={label}>
              <label className="mb-2 block text-sm font-medium text-app">
                {label} <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                className="w-full rounded-2xl border border-app bg-white/80 px-4 py-3 text-app outline-none transition focus:border-brand-400"
                required
              />
            </div>
          ))}

          <div className="md:col-span-2 flex justify-center md:justify-end">
            <button className="w-full rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700 md:w-auto">
              Post Job
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default JobPostForm;
