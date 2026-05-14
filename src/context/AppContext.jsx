import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AppContext = createContext();
const API_BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
const APPLIED_JOBS_STORAGE_KEY = 'hirespot-applied-jobs';
const USER_PROFILE_STORAGE_KEY = 'hirespot-user-profiles';

const readUserProfiles = () => {
  try {
    const stored = localStorage.getItem(USER_PROFILE_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    return {};
  }
};

const mergeStoredProfile = (baseUser, storedProfiles) => {
  if (!baseUser?.id) {
    return baseUser;
  }

  return {
    ...baseUser,
    ...(storedProfiles[baseUser.id] || {}),
  };
};

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

const readAppliedJobs = () => {
  try {
    const stored = localStorage.getItem(APPLIED_JOBS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    return {};
  }
};

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [storedProfiles, setStoredProfiles] = useState(readUserProfiles);
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
    return localUser ? mergeStoredProfile(JSON.parse(localUser), readUserProfiles()) : null;
  });
  const [appliedJobsByUser, setAppliedJobsByUser] = useState(readAppliedJobs);

  useEffect(() => {
    localStorage.setItem('localUser', JSON.stringify(user || null));
  }, [user]);

  useEffect(() => {
    localStorage.setItem(APPLIED_JOBS_STORAGE_KEY, JSON.stringify(appliedJobsByUser));
  }, [appliedJobsByUser]);

  useEffect(() => {
    localStorage.setItem(USER_PROFILE_STORAGE_KEY, JSON.stringify(storedProfiles));
  }, [storedProfiles]);

  const persistUserProfile = (nextUser) => {
    if (!nextUser?.id) {
      return nextUser;
    }

    const profileFields = {
      about: nextUser.about || '',
      jobTitle: nextUser.jobTitle || '',
      location: nextUser.location || '',
      phoneNumber: nextUser.phoneNumber || '',
      profilePicture: nextUser.profilePicture || '',
    };

    setStoredProfiles((current) => ({
      ...current,
      [nextUser.id]: {
        ...(current[nextUser.id] || {}),
        ...profileFields,
      },
    }));

    return nextUser;
  };

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

      localStorage.removeItem('jobPosterAuth');
      localStorage.removeItem('adminAuth');
      const nextUser = mergeStoredProfile(
        {
          ...(data.user || data),
          access_token: data.access_token,
        },
        storedProfiles,
      );
      setUser(nextUser);
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

      localStorage.removeItem('jobPosterAuth');
      localStorage.removeItem('adminAuth');
      const nextUser = mergeStoredProfile(data.user || data, storedProfiles);
      setUser(nextUser);
      return { success: true };
    } catch (requestError) {
      return { success: false, error: requestError.message };
    }
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('localUser');
  };

  const updateUserProfile = async (profileData) => {
    if (!user?.id) {
      return {
        success: false,
        error: 'Please log in first to update your profile.',
      };
    }

    const nextUser = {
      ...user,
      ...profileData,
    };

    persistUserProfile(nextUser);
    setUser(nextUser);

    return {
      success: true,
      user: nextUser,
    };
  };

  const uploadUserPhoto = async (profilePicture) => {
    return updateUserProfile({ profilePicture });
  };

  const appliedJobs = useMemo(() => {
    if (!user?.id) {
      return [];
    }

    return appliedJobsByUser[user.id] || [];
  }, [appliedJobsByUser, user?.id]);

  const hasAppliedToJob = (jobId) => appliedJobs.some((application) => application.jobId === jobId);

  const applyToJob = (job, applicationData = {}) => {
    if (!user?.id) {
      return {
        success: false,
        error: 'Please log in first to apply for a job.',
      };
    }

    if (hasAppliedToJob(job.id)) {
      return {
        success: false,
        error: 'You have already applied for this job.',
      };
    }

    const applicantFullName = applicationData.fullName?.trim() || `${user.firstName || ''} ${user.lastName || ''}`.trim();
    const applicantEmail = applicationData.email?.trim() || user.email || '';

    const nextApplication = {
      id: `application-${job.id}-${Date.now()}`,
      jobId: job.id,
      title: job.title,
      companyName: job.company?.companyName || job.companyName || 'Hiring Company',
      fullName: applicantFullName,
      email: applicantEmail,
      cvFileName: applicationData.cvFileName || '',
      cvFileData: applicationData.cvFileData || '',
      location: job.location,
      salary: job.salary,
      workMode: job.workMode || job.position,
      appliedAt: new Date().toISOString(),
      status: 'Applied',
    };

    setAppliedJobsByUser((current) => ({
      ...current,
      [user.id]: [nextApplication, ...(current[user.id] || [])],
    }));

    return {
      success: true,
      application: nextApplication,
    };
  };

  const getJobById = async (jobId) => {
    const existingJob = jobs.find((item) => item.id === jobId);
    if (existingJob) {
      return existingJob;
    }

    const response = await fetch(`${API_BASE_URL}/api/joblistings/${jobId}`);
    if (!response.ok) {
      throw new Error('Unable to load this job right now.');
    }

    return response.json();
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
    appliedJobs,
    applyToJob,
    backendStatus,
    categories,
    error,
    filters,
    getJobById,
    hasAppliedToJob,
    jobs,
    loading,
    loginUser,
    logoutUser,
    registerUser,
    resetFilters,
    setFilters,
    stats,
    updateUserProfile,
    uploadUserPhoto,
    user,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
