export const LOAD_RECIPES = 'recipe/LOAD_RECIPES';
export const LOAD_RECIPE = 'recipe/LOAD_RECIPE';
export const MODIFY_RECIPE = 'recipe/MODIFY_RECIPE';
export const LOAD_MY_RECIPES = 'recipe/LOAD_MY_RECIPES';
export const ADD_RECIPES = 'recipe/ADD_RECIPES';
export const EDIT_RECIPES = 'recipe/EDIT_RECIPES';
export const LOGOUT = 'recipe/LOGOUT';

const initialState = {
  recipes: [],
  myRecipes: []
};

const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_RECIPES:
      return {
        ...state,
        recipes: action.payload
      };
    case MODIFY_RECIPE:
      return {
        ...state,
        recipes: action.payload
      };
    case LOAD_MY_RECIPES:
      return {
        ...state,
        myRecipes: action.payload
      };
    case ADD_RECIPES:
      return {
        ...state,
        myRecipes: [...state.myRecipes, action.payload]
      };
    case EDIT_RECIPES:
      return {
        ...state,
        myRecipes: [...state.myRecipes, action.payload]
      };
    default:
      return state;
  }
};

export default recipeReducer;
