import {useLocation, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {fetchData, promiseHandler} from '../../utils/promise';
import {METHOD, favoriteUrl, recipeUrl} from '../../config/constants/api';
import {addToFavorites, removeFromFavorites} from '../../actions/user';
import {modifyRecipes} from '../../actions/recipe';
import {useEffect, useMemo, useState} from 'react';
import {isExist} from '../../utils/object';
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai';
import './RecipePage.css';
import {CiTimer} from 'react-icons/ci';
import {MdModeEdit, MdDelete} from 'react-icons/md';

const RecipePage = () => {
  const {state, pathname} = useLocation();
  const [recipe, setRecipe] = useState([]);
  const {user, token} = useSelector(state => state.user);
  const {recipes} = useSelector(state => state.recipe);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const recipeId = useMemo(() => pathname.split('/')[2]);

  useEffect(() => {
    const loadRecipe = async () => {
      const [result, error] = await promiseHandler(
        fetchData(`${recipeUrl}/${recipeId}`, METHOD.GET, [], {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        })
      );
      if (result) {
        setRecipe(result);
      } else {
        navigate('/');
      }
    };
    token && loadRecipe();
  }, [token]);

  const handleAddToFavorite = async () => {
    dispatch(addToFavorites(recipeId));
  };

  const handleRemoveFromFavorite = async () => {
    dispatch(removeFromFavorites(recipeId));
  };

  const handleEditRecipe = async () => {
    navigate('edit-recipe', {state: {recipe: recipe}});
  };

  const handleDeleteRecipe = async () => {
    const [result, error] = await promiseHandler(
      fetchData(`${recipeUrl}/${recipeId}`, METHOD.DELETE, [], {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      })
    );
    const updatedRecipes = recipes.filter(recipe => recipe._id !== recipeId);
    dispatch(modifyRecipes(updatedRecipes));
    navigate(-1);
  };

  const isCreator = (recipeCreatorId, userId) => {
    return recipeCreatorId === userId;
  };

  return (
    <div className="recipePage">
      <img className="imgRecipe" src={recipe.imgUrl} />
      <div className="recipeName1">{recipe.name}</div>
      <div className="wrap">
        <div className="recipeTime1">
          <CiTimer /> {recipe.timeToWork} 
        </div>
        {recipe.favoriteCount > 0 && (
          <div className="favoriteCount">
            {recipe.favoriteCount} people love the recipe !
          </div>
        )}
        {isExist(user.favorites, recipeId) ? (
          <div className="recipeFavorite" onClick={handleRemoveFromFavorite}>
            <AiFillHeart /> remove from fav
          </div>
        ) : (
          <div className="recipeFavorite" onClick={handleAddToFavorite}>
            <AiOutlineHeart /> add to fav
          </div>
        )}
        {isCreator(recipe.creator, user._id) && (
          <div>
            <div className="creator" onClick={handleEditRecipe}>
              <MdModeEdit /> edit recipe
            </div>
            <div className="creator" onClick={handleDeleteRecipe}>
              <MdDelete /> delete recipe
            </div>
          </div>
        )}
        <div className="recipeTitle">ingredients</div>
        <div className="ingredients">
          {recipe?.ingredients?.map(item => (
            <div key={item} className="oneIngredient">
              - {item}
            </div>
          ))}
        </div>
        <div className="recipeTitle">Preparation</div>
        <div className="howToCreate">{recipe?.howToCreate}</div>
      </div>
    </div>
  );
};

export default RecipePage;
