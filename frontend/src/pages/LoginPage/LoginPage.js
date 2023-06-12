import {useEffect, useState} from 'react';
import {useLocation, useNavigate, Redic} from 'react-router-dom';
import {METHOD, authUrl} from '../../config/constants/api';
import {fetchData, promiseHandler} from '../../utils/promise';
import {useDispatch} from 'react-redux';
import {login} from '../../actions/user';
import './LoginPage.scss';

const loginFields = {
  username: {id: 'username', type: 'text', value: ''},
  password: {id: 'password', type: 'password', value: '', validation: true}
};
const registerFields = {
  firstName: {id: 'firstName', type: 'text', value: ''},
  lastName: {id: 'lastName', type: 'text', value: ''},
  username: {id: 'username', type: 'text', value: ''},
  email: {id: 'email', type: 'email', value: ''},
  password: {id: 'password', type: 'password', value: '', validation: true},
  repeatPassword: {
    id: 'repeatPassword',
    type: 'password',
    value: '',
    validation: true
  }
};

const LoginPage = () => {
  const {pathname} = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const [isLoginMode, setIsLoginMode] = useState(null);
  const [credentials, setCredentials] = useState({});
  const [allFilled, setAllFilled] = useState(false);

  useEffect(() => {
    setIsLoginMode(pathname === '/login' ? true : false);
  }, [pathname]);

  useEffect(() => {
    setCredentials(isLoginMode ? loginFields : registerFields);
  }, [isLoginMode]);

  useEffect(() => {
    const isEmpty = Object.entries(credentials).some(
      ([key, val]) => val.value === ''
    );
    console.log(isEmpty);
    setAllFilled(!isEmpty);
  }, [credentials]);

  const handleInputChange = e => {
    const updatedField = {
      ...credentials[e.target.id],
      value: e.target.value
    };
    setCredentials({
      ...credentials,
      [e.target.id]: updatedField
    });
  };

  const handleLogin = async e => {
    e.preventDefault();

    try {
      const filteredCredentials = Object.keys(credentials)
        .filter(key => key !== 'repeatPassword')
        .reduce((obj, key) => {
          obj[key] = credentials[key].value;
          return obj;
        }, {});

      const [result, error] = await promiseHandler(
        fetchData(
          `${authUrl}/${isLoginMode ? '' : 'register'}`,
          METHOD.POST,
          filteredCredentials
        )
      );
      console.log(result, error);
      if (result) {
        dispatch(login(result));
        navigate('/');
      } else {
        setError('username or password incorrect please try again');
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="login-div">
      <form onSubmit={handleLogin}>
        {Object.values(credentials).map(field => (
          <div key={field.id} className="form-group input-element">
            <label htmlFor={field.id}>{field.id}</label>
            <input
              id={field.id}
              className="form-control"
              type={field.type}
              value={field.value}
              placeholder={field.id}
              onChange={handleInputChange}
              onBlur={e => {
                if (credentials[e.target.id].validation) {
                  const validation = {
                    password:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/
                  };
                  if (!validation.password.test(e.target.value)) {
                    setError('password require special key');
                    setAllFilled(false);
                  } else {
                    setError('');
                  }
                }
              }}
            />
          </div>
        ))}
        <div>
          <button
            disabled={allFilled && !error ? false : true}
            className="btn btn-primary"
            type="submit"
          >
            {isLoginMode ? 'Login' : 'Register'}
          </button>
        </div>
        <div
          className="toRegisterLogin"
          onClick={
            () => navigate(isLoginMode ? '/register' : '/login')
            // window.location.replace(isLoginMode ? '/register' : '/login')
          }
        >
          to {isLoginMode ? 'register' : 'login'}
        </div>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
};

export default LoginPage;
