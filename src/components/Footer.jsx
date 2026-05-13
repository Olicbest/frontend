import React from 'react';
import { FiFacebook, FiInstagram, FiLinkedin, FiTwitter } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="mt-16 border-t border-app bg-app-shell text-app backdrop-blur-xl">
    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
      <div>
        <h2 className="font-display text-3xl font-bold text-app">
          Hire<span className="text-brand-500">Spot</span>
        </h2>
        <p className="mt-4 max-w-md text-sm leading-7 text-muted">
          A more responsive job marketplace for ambitious teams and candidates. Search faster, filter smarter, and move hiring forward.
        </p>
      </div>

      <div>
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">Explore</h3>
        <div className="mt-4 flex flex-col gap-3 text-sm">
          <Link to="/" className="text-muted transition hover:text-app">Home</Link>
          <Link to="/jobs" className="text-muted transition hover:text-app">Jobs</Link>
          <Link to="/about" className="text-muted transition hover:text-app">About</Link>
          <Link to="/contact" className="text-muted transition hover:text-app">Contact</Link>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">Follow</h3>
        <div className="mt-4 flex items-center gap-3">
          {[FiInstagram, FiFacebook, FiLinkedin, FiTwitter].map((Icon, index) => (
            <a
              key={`social-${index}`}
              href="#"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-app bg-surface text-app transition hover:-translate-y-1 hover:border-brand-300 hover:text-brand-600"
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>
    </div>

    <div className="border-t border-app px-4 py-4 text-center text-xs text-muted">
      © 2026 HireSpot. Built for modern hiring teams.
    </div>
  </footer>
);

export default Footer;
