import React from 'react';

const Contact = () => {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="animate-fade-up relative overflow-hidden rounded-[2rem] bg-slate-950 p-8 text-white shadow-soft">
          <div className="mesh-overlay" />
          <div className="relative z-10">
            <p className="text-sm uppercase tracking-[0.22em] text-brand-200">Contact</p>
            <h1 className="mt-3 font-display text-4xl font-semibold">Let&apos;s help your hiring move faster.</h1>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Reach out for employer onboarding, platform support, or partnership questions. The page now follows one polished visual direction with smoother motion.
            </p>
          </div>
        </div>

        <form className="animate-slide-in rounded-[2rem] border border-white/60 bg-white/85 p-6 shadow-soft backdrop-blur sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <input className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-brand-400" type="text" placeholder="Name" />
            <input className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-brand-400" type="email" placeholder="Email" />
            <input className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-brand-400 sm:col-span-2" type="text" placeholder="Company" />
            <textarea className="min-h-40 rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-brand-400 sm:col-span-2" placeholder="Message" />
          </div>
          <button className="mt-5 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-700" type="submit">
            Send message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
