import {useDispatch, useSelector} from 'react-redux';
import {login} from '../../actions/user';
import {METHOD, authUrl} from '../../config/constants/api';
import {fetchData, promiseHandler} from '../../utils/promise';
import {getFromLocalStoarge} from '../../utils/stoarge';
import {useEffect, useState} from 'react';
import {Navigate} from 'react-router-dom';

const RequireAuth = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const {user} = useSelector(state => state.user);

  useEffect(() => {
    const token = getFromLocalStoarge('token');

    const verifyToken = async token => {
      const [result, error] = await promiseHandler(
        fetchData(authUrl, METHOD.GET, [], {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        })
      );
      dispatch(login({user: result.user, token}));
    };

    if (token) {
      verifyToken(token)
        .then(() => {
          setIsAuthenticated(true);
        })
        .catch(() => {
          localStorage.removeItem('token');
          setIsAuthenticated(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (isAuthenticated) {
    return children;
  } else {
    return window.location.replace('/login');
    // return <Navigate to="/login" />;
  }
};

export default RequireAuth;
