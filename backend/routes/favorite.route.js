const {Router} = require('express');
const {
  getUserFavorites,
  getMostFavorites,
  addToFavorites,
  removeFromFavorites
} = require('../controllers/favorite.controller');

const router = Router();

router.get('/', getUserFavorites); //done
router.get('/most-favorites', getMostFavorites); //done
router.post('/', addToFavorites); //done
router.delete('/:recipeId', removeFromFavorites); //done

module.exports = router;
