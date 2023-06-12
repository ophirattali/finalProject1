const {Router} = require('express');
const {
  getRecipes,
  getRecipe,
  addRecipe,
  updateRecipe,
  deleteRecipe,
  getRecipesByUser
} = require('../controllers/recipe.controller');

const router = Router();

router.get('/', getRecipes); //done
router.get('/getByUser', getRecipesByUser); //done
router.get('/:recipeId', getRecipe); //done
router.post('/', addRecipe);
router.put('/', updateRecipe);
router.delete('/:recipeId', deleteRecipe); //done

module.exports = router;
