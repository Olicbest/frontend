import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import AdminLayout from './layouts/AdminLayout';
import AppLayout from './layouts/AppLayout';

const Home = lazy(() => import('./pages/Home'));
const JobsPage = lazy(() => import('./pages/JobsPage'));
const JobDetails = lazy(() => import('./pages/JobDetails'));
const Contact = lazy(() => import('./pages/Contact'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Register = lazy(() => import('./pages/Register'));
const LoginForm = lazy(() => import('./pages/LoginForm'));
const JobSignup = lazy(() => import('./pages/JobSignup'));
const AccountSignup = lazy(() => import('./pages/AccountSignup'));
const LoginJobPoster = lazy(() => import('./pages/LoginJobPoster'));
const JobPostForm = lazy(() => import('./pages/JobPostForm'));
const About = lazy(() => import('./pages/About'));
const Testimonial = lazy(() => import('./pages/Testimonial'));
const Admin = lazy(() => import('./pages/Admin'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const UserProfilee = lazy(() => import('./pages/UserProfilee'));
const CompanyProfile = lazy(() => import('./pages/CompanyProfile'));
const UserForm = lazy(() => import('./components/UserForm'));

const RouteLoader = () => (
  <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
    <div className="glass-card animate-fade-up rounded-[2rem] p-8 text-center">
      <p className="text-sm uppercase tracking-[0.24em] text-brand-700">Loading</p>
      <h1 className="mt-3 font-display text-3xl font-semibold text-app">Preparing your next view</h1>
      <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/60">
        <div className="loading-bar h-full rounded-full bg-gradient-to-r from-brand-500 via-accent-500 to-gold-400" />
      </div>
    </div>
  </div>
);

const App = () => {
  return (
    <AppProvider>
      <Router>
        <Suspense fallback={<RouteLoader />}>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/jobs" element={<JobsPage />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
              <Route path="/joblistings" element={<JobsPage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/jobseeker" element={<Register />} />
              <Route path="/jobseekeer" element={<Register />} />
              <Route path="/jobsignup" element={<JobSignup />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/loginjobposter" element={<LoginJobPoster />} />
              <Route path="/accountsignup" element={<AccountSignup />} />
              <Route path="/JobPostForm" element={<JobPostForm />} />
              <Route path="/testimonial" element={<Testimonial />} />
              <Route path="/userprofile" element={<ProfilePage />} />
              <Route path="/userprofilee" element={<UserProfilee />} />
              <Route path="/company" element={<CompanyProfile />} />
              <Route path="/userform" element={<UserForm />} />
            </Route>

            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="admins" element={<Admin />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </AppProvider>
  );
};

export default App;
