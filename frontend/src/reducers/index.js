import userReducer from './user';
import recipeReducer from './recipe';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
  user: userReducer,
  recipe: recipeReducer
});

export default allReducers;
