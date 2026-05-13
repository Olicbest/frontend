import { useEffect, useState } from 'react';

const fallbackCountries = [
  { label: 'Nigeria (+234)', value: '+234', country: 'Nigeria' },
  { label: 'Ghana (+233)', value: '+233', country: 'Ghana' },
  { label: 'Kenya (+254)', value: '+254', country: 'Kenya' },
  { label: 'South Africa (+27)', value: '+27', country: 'South Africa' },
  { label: 'United Kingdom (+44)', value: '+44', country: 'United Kingdom' },
  { label: 'United States (+1)', value: '+1', country: 'United States' },
];

const useCountries = () => {
  const [countries, setCountries] = useState(fallbackCountries);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
          throw new Error('Unable to load country data.');
        }

        const data = await response.json();

        const formattedCountries = data
          .filter((country) => country.idd?.root && country.idd?.suffixes?.length)
          .map((country) => ({
            label: `${country.name.common} (${country.idd.root}${country.idd.suffixes[0]})`,
            value: `${country.idd.root}${country.idd.suffixes[0]}`,
            country: country.name.common,
          }))
          .sort((first, second) => first.label.localeCompare(second.label));

        setCountries(formattedCountries.length ? formattedCountries : fallbackCountries);
      } catch (requestError) {
        setCountries(fallbackCountries);
        setError(requestError);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return { countries, loading, error };
};

export default useCountries;
