import axios from 'axios';
import {BACKEND_URL} from '../config/constants/envs';

export const promiseHandler = async promise => {
  try {
    return [await promise, null];
  } catch (err) {
    return [null, err];
  }
};

export const fetchData = async (
  urlPath,
  method,
  data = null,
  headers = {'Content-Type': 'application/json'}
) => {
  const result = await axios({
    method,
    url: `${BACKEND_URL}${urlPath}`,
    data,
    headers
  });
  console.log('!!!!!!!!!,resolt');
  return result.data;
};
