import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getRecipes} from '../../actions/recipe';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import '../MyRecipesPage/MyRecipesPage.css';

const AllRercipesPage = () => {
  const [recipeIndex, setScrollingIndex] = useState(0);
  const {recipes} = useSelector(state => state.recipe);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecipes(recipeIndex));
  }, []);

  return (
    <div>
      <div className="myRecipiesTitle">All recipes</div>;
      <div className="allRecipies">
        {recipes.map(recipe => (
          <RecipeCard key={recipe._id} recipeData={recipe} />
        ))}
      </div>
    </div>
  );
};

export default AllRercipesPage;
