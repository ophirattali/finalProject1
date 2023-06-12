const UserModel = require('../models/user.model');
const RecipeModel = require('../models/recipe.model');
const {numOfMostFavorites} = require('../config/constant');

const getUserFavorites = async (req, res) => {
  try {
    const {_id} = req.userData || {};
    const userFavorites = await UserModel.findById(_id)
      .select('favorites')
      .populate('favorites');
    if (!userFavorites) {
      throw new Error('user not found');
    }

    return res.status(200).json(userFavorites);
  } catch (e) {
    return res.status(400).json({error: e.meesage});
  }
};

const getMostFavorites = async (req, res) => {
  try {
    const favorites = await RecipeModel.find({})
      .sort({favoriteCount: -1})
      .limit(numOfMostFavorites);
    return res.status(200).json(favorites);
  } catch (e) {
    return res.status(400).json({error: e.meesage});
  }
};

const addToFavorites = async (req, res) => {
  try {
    const {_id} = req.userData;
    const {recipeId} = req.body;
    const updatedUser = await UserModel.findByIdAndUpdate(_id, {
      $push: {favorites: recipeId}
    });
    if (updatedUser) {
      const updatedRecipe = await RecipeModel.findByIdAndUpdate(recipeId, {
        $inc: {favoriteCount: 1}
      });
      return res.status(200).json(updatedRecipe);
    } else {
      throw new Error('cannot add to favorites');
    }
  } catch (e) {
    return res.status(400).json({error: e.meesage});
  }
};

const removeFromFavorites = async (req, res) => {
  try {
    const {_id} = req.userData;
    const {recipeId} = req.params;
    const updatedUser = await UserModel.findByIdAndUpdate(_id, {
      $pull: {
        favorites: req.params.recipeId
      }
    });
    if (updatedUser) {
      const updatedRecipe = await RecipeModel.findByIdAndUpdate(recipeId, {
        $inc: {favoriteCount: -1}
      });
      return res.status(200).json(updatedRecipe);
    } else {
      throw new Error('cannot add to favorites');
    }
  } catch (e) {
    return res.status(400).json({error: e.meesage});
  }
};

module.exports = {
  getUserFavorites,
  getMostFavorites,
  addToFavorites,
  removeFromFavorites
};
