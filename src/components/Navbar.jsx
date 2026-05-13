import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { Link, NavLink } from 'react-router-dom';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Jobs', to: '/jobs' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

const navLinkClass = ({ isActive }) =>
  `transition ${isActive ? 'text-app font-semibold' : 'text-muted hover:text-app'}`;

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-app bg-app-shell/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="font-display text-2xl font-bold tracking-tight text-app transition hover:scale-[1.02]">
          Hire<span className="text-brand-500">Spot</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={navLinkClass}>
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/login"
            className="rounded-full border border-app px-4 py-2 text-sm font-semibold text-app transition hover:border-brand-300 hover:text-brand-700"
          >
            Login
          </Link>
          <Link
            to="/loginjobposter"
            className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            Post a job
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="inline-flex rounded-2xl border border-app p-2 text-app md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-app bg-app-shell px-4 py-4 shadow-soft md:hidden">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={navLinkClass} onClick={() => setOpen(false)}>
                {item.label}
              </NavLink>
            ))}
            <Link to="/login" className="text-app" onClick={() => setOpen(false)}>
              Login
            </Link>
            <Link
              to="/loginjobposter"
              className="inline-flex w-fit rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              Post a job
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
};

export default Navbar;
