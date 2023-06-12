import {useNavigate} from 'react-router-dom';
import './RecipeCard.css';
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai';
import {CiTimer} from 'react-icons/ci';
import {useDispatch, useSelector} from 'react-redux';
import {addToFavorites, removeFromFavorites} from '../../actions/user';
import {isExist} from '../../utils/object';

const RecipeCard = ({recipeData}) => {
  const {user, token} = useSelector(state => state.user);

  const isOnFavorite = isExist(user.favorites, recipeData._id);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddRemoveToFavorite = e => {
    e.stopPropagation();
    isOnFavorite ? handleRemoveFromFavorite() : handleAddToFavorite();
  };

  const handleAddToFavorite = async () => {
    dispatch(addToFavorites(recipeData._id));
  };

  const handleRemoveFromFavorite = async () => {
    dispatch(removeFromFavorites(recipeData._id));
  };

  const handleRecipeClick = recipe => {
    navigate(`/recipe/${recipe._id}`, {state: {recipe}});
  };
  return (
    <div className="recipeCard" onClick={() => handleRecipeClick(recipeData)}>
      <div>
        {/* <img className='cardImage' src={recipeData.src} /> */}
        <img className="cardImage" src={recipeData.imgUrl} />
      </div>
      <div className="recipeName">{recipeData.name}</div>
      <div className="recipeTime"><CiTimer/> {recipeData.timeToWork}</div>
      <div className="favoriteHeart" onClick={handleAddRemoveToFavorite}>
        {isOnFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
      </div>
    </div>
  );
};

export default RecipeCard;
