import {useDispatch, useSelector} from 'react-redux';
import {getRecipes} from '../../actions/recipe';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {fetchData} from '../../utils/promise';
import {METHOD, favoriteUrl} from '../../config/constants/api';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import './HomePage.css';
const HomePage = () => {
  const dispatch = useDispatch();
  const [favorites, setFavorites] = useState({
    myFavorites: [],
    mostFavorites: []
  });

  const {token, user} = useSelector(state => state.user);
  const navigate = useNavigate();

  const getUserFavorites = () => {
    return fetchData(favoriteUrl, METHOD.GET, [], {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  };
  const getMostFavorites = () => {
    return fetchData(`${favoriteUrl}/most-favorites`, METHOD.GET, [], {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  };

  useEffect(() => {
    const getFavorites = async () => {
      const [myFavorites, mostFavorites] = await Promise.all([
        getUserFavorites(),
        getMostFavorites()
      ]);
      setFavorites({
        myFavorites: myFavorites.favorites,
        mostFavorites
      });
    };
    getFavorites();
  }, [user.favorites]);

  const handleAddNewRecipe = () => {
    navigate('/recipe/add-recipe');
  };

  return (
    <div className='homePage'>
      <div className="background">
        <div className="title">Collaborative recipes</div>
        <div className="subTitle">the best recipes</div>
        <button className="addRecipe" onClick={handleAddNewRecipe}>
          add new recipe
        </button>
      </div>

      {/* <div onClick={() => navigate('all-recipes')}>to all recipes</div> */}
      <h1>Top 3 favorites</h1>
      <div className="top3">
        {favorites.mostFavorites.map(recipe => (
          <RecipeCard key={recipe._id} recipeData={recipe} />
        ))}
      </div>
      <h1>my favorites</h1>
      <div className="top3">
        {favorites.myFavorites.map(recipe => (
          <RecipeCard key={recipe._id} recipeData={recipe} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
