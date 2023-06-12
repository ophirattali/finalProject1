import {useEffect, useState} from 'react';
import {fetchData} from '../utils/promise';

const useFetch = ({url, method, body = null, headers}) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [loading, setloading] = useState(true);

  useEffect(() => {
    fetchData(url, method, body, headers)
      .then(res => {
        setResponse(res.data);
      })
      .catch(err => {
        setError(err);
      })
      .finally(() => {
        setloading(false);
      });
  }, [method, url, body, headers]);

  return {response, error, loading};
};

export default useFetch;
