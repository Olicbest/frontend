// useCountries.js
import { useState, useEffect } from 'react';

const useCountries = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        
        // Filter and map countries safely
        const formattedCountries = data
          .filter(country => country.idd && country.idd.root && country.idd.suffixes && country.idd.suffixes.length > 0)
          .map(country => ({
            label: `${country.name.common} (${country.idd.root}${country.idd.suffixes[0]})`,
            value: `${country.idd.root}${country.idd.suffixes[0]}`
          }));

        setCountries(formattedCountries);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return { countries, loading, error };
};

export default useCountries;
