import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {getMyRecipes} from '../../actions/recipe';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import './MyRecipesPage.css';

const MyRecipesPage = () => {
  const {myRecipes} = useSelector(state => state.recipe);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyRecipes());
  }, []);

  return (
    <div>
      <div className='myRecipiesTitle'>my recipes</div>
      <div className="allRecipies">
        {myRecipes.map(recipe => (
          <RecipeCard key={recipe._id} recipeData={recipe} />
        ))}
      </div>
    </div>
  );
};

export default MyRecipesPage;
