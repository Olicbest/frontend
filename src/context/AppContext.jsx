import { createContext, useEffect, useState } from 'react';

const AppContext = createContext();
const apiBaseUrl = import.meta.env.VITE_API_URL;

export const AppProvider = ({ children }) => {
  const [joblistings, setJoblistings] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getJoblistings();
    fetchProfile(); // Fetch user profile on initial load if token exists
  }, []);

  const getJoblistings = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/joblistings`);
      if (!response.ok) {
        return console.error("Couldn't fetch");
      }
      const data = await response.json();
      setJoblistings(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to register a new user
  const registerUser = async (userData) => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        return console.error("Registration failed");
      }

      const data = await response.json();
      setUser(data); // Save the registered user in the state
      localStorage.setItem('token', data.token); // Store the token
    } catch (error) {
      console.error("Error registering user", error);
    }
  };

  // Function to login a user
  const loginUser = async (userData) => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        return console.error("Login failed");
      }

      const data = await response.json();
      setUser(data); // Save the logged-in user in the state
      localStorage.setItem('token', data.token); // Store the token
    } catch (error) {
      console.error("Error logging in user", error);
    }
  };

  // Function to fetch user profile
  const fetchProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch(`${apiBaseUrl}/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data); // Update user state with profile data
      } else {
        console.error("Couldn't fetch profile");
      }
    } catch (error) {
      console.error("Error fetching profile", error);
    }
  };

  const contextValue = {
    joblistings,
    user,
    registerUser,
    loginUser, // Expose the login function
    fetchProfile, // Expose the fetch profile function
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export default AppContext;
