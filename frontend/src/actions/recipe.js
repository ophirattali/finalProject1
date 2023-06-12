import {promiseHandler, fetchData} from '../utils/promise';
import {
  LOAD_RECIPES,
  LOAD_RECIPE,
  LOAD_MY_RECIPES,
  ADD_RECIPES,
  EDIT_RECIPES
} from '../reducers/recipe';
import {METHOD, recipeUrl} from '../config/constants/api';

export const getRecipes = (startIndex = 0) => {
  return async (dispatch, getState) => {
    const {user} = getState();
    const [result, error] = await promiseHandler(
      fetchData(
        `${recipeUrl}?${startIndex ? `startIndex=${startIndex}` : ''}`,
        METHOD.GET,
        [],
        {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json'
        }
      )
    );
    result && dispatch(loadRecipes(result));
  };
};

export const modifyRecipes = updatedRecipe => {
  return {
    type: LOAD_RECIPE,
    payload: updatedRecipe
  };
};

export const loadRecipes = recipes => {
  return {
    type: LOAD_RECIPES,
    payload: recipes
  };
};

export const loadMyRecipes = recipes => {
  return {
    type: LOAD_MY_RECIPES,
    payload: recipes
  };
};

export const getMyRecipes = () => {
  return async (dispatch, getState) => {
    const {user} = getState();
    const [result, error] = await promiseHandler(
      fetchData(`${recipeUrl}/getByUser`, METHOD.GET, [], {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'application/json'
      })
    );
    result && dispatch(loadMyRecipes(result));
  };
};
