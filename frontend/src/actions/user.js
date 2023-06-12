import {saveOnLocalStoarge, deleteFromLocalStoarge} from '../utils/stoarge';
import {LOGIN, LOGOUT, MODIFY_FAVORITES} from '../reducers/user';
import {fetchData, promiseHandler} from '../utils/promise';
import {METHOD, favoriteUrl} from '../config/constants/api';

export const login = userData => {
  saveOnLocalStoarge(userData);
  return {
    type: LOGIN,
    payload: userData
  };
};

export const logout = () => {
  deleteFromLocalStoarge();
  window.location.replace('/');
  return {
    type: LOGOUT
  };
};

export const addToFavorites = recipeId => {
  return async (dispatch, getState) => {
    const {user: userData} = getState();
    const {user, token} = userData;

    const a = getState(state => state.user);

    const [result, error] = await promiseHandler(
      fetchData(
        favoriteUrl,
        METHOD.POST,
        {recipeId},
        {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      )
    );
    const updatedFavorites = [...user.favorites, recipeId];
    dispatch(updateFavorites(updatedFavorites));
  };
};

export const removeFromFavorites = recipeId => {
  return async (dispatch, getState) => {
    const {user: userData} = getState();
    const {user, token} = userData;
    const [result, error] = await promiseHandler(
      fetchData(`${favoriteUrl}/${recipeId}`, METHOD.DELETE, [], {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      })
    );
    const updatedFavorites = user.favorites.filter(
      recipeId => recipeId !== recipeId
    );
    dispatch(updateFavorites(updatedFavorites));
  };
};

export const updateFavorites = updatedFavorites => {
  return {
    type: MODIFY_FAVORITES,
    payload: updatedFavorites
  };
};

/**
 * export const handleLogout = () => {
  return dispatch => {
    dispatch(logout());
  };
};
 */
