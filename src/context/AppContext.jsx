import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AppContext = createContext();
const API_BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
const buildQueryString = (filters) => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      params.set(key, value);
    }
  });

  const query = params.toString();
  return query ? `?${query}` : '';
};

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    title: '',
    location: '',
    category: '',
    experience: '',
    workMode: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [backendStatus, setBackendStatus] = useState('checking');
  const [user, setUser] = useState(() => {
    const localUser = localStorage.getItem('localUser');
    return localUser ? JSON.parse(localUser) : null;
  });

  useEffect(() => {
    localStorage.setItem('localUser', JSON.stringify(user || null));
  }, [user]);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [healthResponse, categoriesResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/api/health`),
          fetch(`${API_BASE_URL}/api/categories`),
        ]);

        setBackendStatus(healthResponse.ok ? 'connected' : 'offline');

        if (categoriesResponse.ok) {
          const categoriesData = await categoriesResponse.json();
          setCategories(categoriesData);
        }
      } catch (requestError) {
        setBackendStatus('offline');
      }
    };

    loadInitialData();
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const fetchJobListings = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(
          `${API_BASE_URL}/api/joblistings${buildQueryString(filters)}`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error('Unable to load jobs right now.');
        }

        const data = await response.json();
        setJobs(data);
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message || 'Something went wrong while loading jobs.');
          setJobs([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchJobListings();

    return () => controller.abort();
  }, [filters]);

  const resetFilters = () =>
    setFilters({
      title: '',
      location: '',
      category: '',
      experience: '',
      workMode: '',
    });

  const loginUser = async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Login failed. Please check your credentials.');
      }

      setUser(data.user || data);
      return { success: true };
    } catch (requestError) {
      return { success: false, error: requestError.message };
    }
  };

  const registerUser = async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Registration failed.');
      }

      setUser(data.user || data);
      return { success: true };
    } catch (requestError) {
      return { success: false, error: requestError.message };
    }
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('localUser');
  };

  const stats = useMemo(() => {
    const companies = new Set(jobs.map((job) => job.company?.companyName).filter(Boolean));
    const remoteRoles = jobs.filter((job) => job.workMode === 'Remote').length;

    return {
      totalJobs: jobs.length,
      totalCompanies: companies.size,
      remoteRoles,
      categories: categories.length,
    };
  }, [categories.length, jobs]);

  const value = {
    backendStatus,
    categories,
    error,
    filters,
    jobs,
    loading,
    loginUser,
    logoutUser,
    registerUser,
    resetFilters,
    setFilters,
    stats,
    user,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
