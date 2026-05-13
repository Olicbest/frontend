import React, { useContext, useState } from 'react';
import Select from 'react-select';
import { FiArrowRight, FiEye, FiEyeOff } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';
import useCountries from '../useCountries';

const selectStyles = {
  control: (base) => ({
    ...base,
    minHeight: 50,
    borderRadius: 16,
    borderColor: 'rgba(148, 163, 184, 0.28)',
    backgroundColor: 'transparent',
    boxShadow: 'none',
  }),
  menu: (base) => ({
    ...base,
    borderRadius: 16,
    overflow: 'hidden',
  }),
};

const Register = () => {
  const navigate = useNavigate();
  const { registerUser } = useContext(AppContext);
  const { countries } = useCountries();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    day: '',
    month: '',
    year: '',
    gender: '',
    phoneNumber: '',
  });
  const [selectedCountry, setSelectedCountry] = useState(countries[0] || null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');

    const result = await registerUser({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      phoneNumber: formData.phoneNumber,
      countryCode: selectedCountry?.value || '+234',
      country: selectedCountry?.country || 'Nigeria',
      gender: formData.gender,
      dateOfBirth: `${formData.year}-${formData.month}-${formData.day}`,
    });

    if (result.success) {
      setSuccess('Account created successfully. Redirecting to login...');
      setTimeout(() => navigate('/login'), 1200);
    } else {
      setError(result.error || 'Unable to create your account.');
    }

    setSubmitting(false);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr]">
        <div className="animate-scale-in rounded-[2rem] border border-app bg-slate-950 p-8 text-white shadow-soft xl:p-10">
          <p className="text-sm uppercase tracking-[0.22em] text-brand-200">Job seeker registration</p>
          <h1 className="mt-4 font-display text-4xl font-semibold">Create a profile that is ready to move.</h1>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            This signup flow submits directly to the backend, keeps the page responsive, and now feels smoother and more visually refined.
          </p>

          <div className="mt-10 space-y-4">
            {[
              'Complete your personal profile in one form',
              'Clear readable inputs with a single branded visual system',
              'Direct account creation through the backend API',
              'Mobile-friendly layout with animated entrance states',
            ].map((item) => (
              <div key={item} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
                {item}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="animate-fade-up rounded-[2rem] border border-app bg-surface p-6 shadow-soft sm:p-8">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-app">First name</label>
              <input name="firstName" value={formData.firstName} onChange={handleChange} className="w-full rounded-2xl border border-app bg-app-shell px-4 py-3 text-app outline-none focus:border-brand-400" required />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-app">Last name</label>
              <input name="lastName" value={formData.lastName} onChange={handleChange} className="w-full rounded-2xl border border-app bg-app-shell px-4 py-3 text-app outline-none focus:border-brand-400" required />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-app">Email address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full rounded-2xl border border-app bg-app-shell px-4 py-3 text-app outline-none focus:border-brand-400" required />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-app">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-app bg-app-shell px-4 py-3 pr-12 text-app outline-none focus:border-brand-400"
                  required
                />
                <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-muted" onClick={() => setShowPassword((current) => !current)}>
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              <p className="mt-2 text-xs text-muted">Use 8-12 characters with uppercase, lowercase, a number, and a symbol.</p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-app">Day</label>
              <select name="day" value={formData.day} onChange={handleChange} className="w-full rounded-2xl border border-app bg-app-shell px-4 py-3 text-app outline-none focus:border-brand-400" required>
                <option value="">Day</option>
                {Array.from({ length: 31 }, (_, index) => index + 1).map((value) => (
                  <option key={value} value={String(value).padStart(2, '0')}>{value}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-app">Month</label>
              <select name="month" value={formData.month} onChange={handleChange} className="w-full rounded-2xl border border-app bg-app-shell px-4 py-3 text-app outline-none focus:border-brand-400" required>
                <option value="">Month</option>
                {Array.from({ length: 12 }, (_, index) => index + 1).map((value) => (
                  <option key={value} value={String(value).padStart(2, '0')}>{value}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-app">Year</label>
              <select name="year" value={formData.year} onChange={handleChange} className="w-full rounded-2xl border border-app bg-app-shell px-4 py-3 text-app outline-none focus:border-brand-400" required>
                <option value="">Year</option>
                {Array.from({ length: 60 }, (_, index) => new Date().getFullYear() - index).map((value) => (
                  <option key={value} value={value}>{value}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-app">Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange} className="w-full rounded-2xl border border-app bg-app-shell px-4 py-3 text-app outline-none focus:border-brand-400" required>
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-app">Country</label>
              <Select
                options={countries}
                value={selectedCountry}
                onChange={setSelectedCountry}
                styles={selectStyles}
                isSearchable
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-app">Mobile number</label>
              <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="w-full rounded-2xl border border-app bg-app-shell px-4 py-3 text-app outline-none focus:border-brand-400" required />
            </div>
          </div>

          {error ? <p className="mt-5 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}
          {success ? <p className="mt-5 rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{success}</p> : null}

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? 'Creating account...' : 'Register now'}
            <FiArrowRight />
          </button>

          <p className="mt-5 text-sm text-muted">
            Already registered?{' '}
            <Link to="/login" className="font-semibold text-brand-700 transition hover:text-brand-500">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Register;
