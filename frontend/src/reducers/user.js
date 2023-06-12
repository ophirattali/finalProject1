export const LOGIN = 'user/LOGIN';
export const LOGOUT = 'user/LOGOUT';
export const MODIFY_FAVORITES = 'user/MODIFY_FAVORITES';

const initialState = {
  user: {},
  token: '',
  isLogin: false
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        user: action.payload.user,
        token: action.payload.token,
        isLogin: true
      };
    case LOGOUT:
      return initialState;
    case MODIFY_FAVORITES:
      return {
        ...state,
        user: {
          ...state.user,
          favorites: action.payload
        }
      };
    default:
      return state;
  }
};

export default userReducer;
