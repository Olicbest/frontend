import React, { useState } from 'react';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

const API_BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  companyPosition: '',
  countryCode: '+234',
  phoneNumber: '',
  companyName: '',
  industry: '',
  website: '',
  contactPerson: '',
  address: '',
  country: 'Nigeria',
  numberOfEmployees: '',
  typeOfEmployer: '',
};

const JobSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/jobposter/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Unable to create the employer account.');
      }

      setSuccess('Employer account created successfully. Redirecting to employer login...');
      setTimeout(() => navigate('/loginjobposter'), 1200);
    } catch (requestError) {
      setError(requestError.message || 'Unable to create the employer account.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="animate-fade-up rounded-[2rem] border border-app bg-surface p-8 shadow-soft">
          <p className="text-sm uppercase tracking-[0.22em] text-brand-700">Employer signup</p>
          <h1 className="mt-4 font-display text-4xl font-semibold text-app">Create a hiring workspace that is ready to post.</h1>
          <p className="mt-4 text-sm leading-7 text-muted">
            This employer registration page submits company poster details and company information directly to the backend with a cleaner, more polished visual system.
          </p>

          <div className="mt-8 space-y-4">
            {[
              'Representative and company information in one guided form',
              'Responsive two-column layout on larger screens',
              'Warm branded surfaces, borders, and text colors',
              'Smooth motion that still feels clean and professional',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-[1.5rem] border border-app bg-app-shell p-4">
                <FiCheckCircle className="mt-1 text-brand-600" />
                <p className="text-sm leading-6 text-muted">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="animate-scale-in rounded-[2rem] border border-app bg-surface p-6 shadow-soft sm:p-8">
          <div className="grid gap-5 md:grid-cols-2">
            {[
              ['firstName', 'First name'],
              ['lastName', 'Last name'],
              ['email', 'Work email'],
              ['password', 'Password'],
              ['companyPosition', 'Position in company'],
              ['phoneNumber', 'Phone number'],
              ['companyName', 'Company name'],
              ['industry', 'Industry'],
              ['website', 'Website'],
              ['contactPerson', 'Contact person'],
              ['country', 'Country'],
              ['numberOfEmployees', 'Number of employees'],
              ['typeOfEmployer', 'Type of employer'],
            ].map(([name, label]) => (
              <div key={name} className={name === 'address' ? 'md:col-span-2' : ''}>
                <label className="mb-2 block text-sm font-medium text-app">{label}</label>
                {name === 'industry' ? (
                  <select name={name} value={formData[name]} onChange={handleChange} className="w-full rounded-2xl border border-app bg-app-shell px-4 py-3 text-app outline-none focus:border-brand-400" required>
                    <option value="">Select industry</option>
                    <option value="Technology">Technology</option>
                    <option value="Finance">Finance</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Retail">Retail</option>
                  </select>
                ) : name === 'numberOfEmployees' ? (
                  <select name={name} value={formData[name]} onChange={handleChange} className="w-full rounded-2xl border border-app bg-app-shell px-4 py-3 text-app outline-none focus:border-brand-400" required>
                    <option value="">Select size</option>
                    <option value="1-10">1-10</option>
                    <option value="11-50">11-50</option>
                    <option value="51-200">51-200</option>
                    <option value="200+">200+</option>
                  </select>
                ) : name === 'typeOfEmployer' ? (
                  <select name={name} value={formData[name]} onChange={handleChange} className="w-full rounded-2xl border border-app bg-app-shell px-4 py-3 text-app outline-none focus:border-brand-400" required>
                    <option value="">Select type</option>
                    <option value="Direct employer">Direct employer</option>
                    <option value="Agency">Agency</option>
                    <option value="Outsourcing partner">Outsourcing partner</option>
                  </select>
                ) : (
                  <input
                    type={name === 'email' ? 'email' : name === 'website' ? 'url' : name === 'password' ? 'password' : 'text'}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-app bg-app-shell px-4 py-3 text-app outline-none focus:border-brand-400"
                    required
                  />
                )}
              </div>
            ))}

            <div>
              <label className="mb-2 block text-sm font-medium text-app">Country code</label>
              <input name="countryCode" value={formData.countryCode} onChange={handleChange} className="w-full rounded-2xl border border-app bg-app-shell px-4 py-3 text-app outline-none focus:border-brand-400" required />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-app">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="4"
                className="w-full rounded-2xl border border-app bg-app-shell px-4 py-3 text-app outline-none focus:border-brand-400"
                required
              />
            </div>
          </div>

          {error ? <p className="mt-5 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}
          {success ? <p className="mt-5 rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{success}</p> : null}

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? 'Creating employer account...' : 'Create employer account'}
            <FiArrowRight />
          </button>

          <p className="mt-5 text-sm text-muted">
            Already have an employer account?{' '}
            <Link to="/loginjobposter" className="font-semibold text-brand-700 transition hover:text-brand-500">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default JobSignup;
