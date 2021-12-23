import { useEffect, useState } from 'react';

const useApi = (apiCall) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [responseObj, setResponseObj] = useState({});
  useEffect(() => {
    setLoaded(false);
    setError(false);
    apiCall()
      .then((response) => {
        setResponseObj(response.data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoaded(true);
      });
  }, [apiCall]);

  return [loaded, error, responseObj];
};

export default useApi;
