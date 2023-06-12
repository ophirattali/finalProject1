const {maxRecipesPerFetch} = require('../config/constant');
const RecipeModel = require('../models/recipe.model');

const getRecipes = async (req, res) => {
  try {
    const {startIndex = 0} = req.query;
    const recipes = await RecipeModel.find({})
      .skip(startIndex)
      .limit(maxRecipesPerFetch);
    return res.status(200).json(recipes);
  } catch (e) {
    return res.status(400).json({error: e.message});
  }
};

const getRecipe = async (req, res) => {
  try {
    const {recipeId} = req.params;

    const recipe = await RecipeModel.findById(recipeId);
    return res.status(200).json(recipe);
  } catch (e) {
    return res.status(400).json({error: e.message});
  }
};

const getRecipesByUser = async (req, res) => {
  try {
    const {startIndex = 0} = req.query;
    const {_id} = req.userData;

    const recipes = await RecipeModel.find({creator: _id})
      .skip(startIndex)
      .limit(maxRecipesPerFetch);
    return res.status(200).json(recipes);
  } catch (e) {
    return res.status(400).json({error: e.message});
  }
};

const addRecipe = async (req, res) => {
  try {
    const recipe = await RecipeModel.create({
      ...req.body,
      creator: req.userData._id
    });
    if (recipe) {
      return res.status(200).json(recipe);
    }
  } catch (e) {
    return res.status(400).json({error: e.message});
  }
};

const isCreator = async (_id, username) => {
  try {
    const recipe = await RecipeModel.findById({_id});
    return recipe?.username === username;
  } catch (e) {
    return new Error(e.message);
  }
};

const updateRecipe = async (req, res) => {
  try {
    const {_id, ...rest} = req.body;
    if (isCreator(_id, req.userData.username)) {
      const updatedRecipe = await RecipeModel.updateOne({_id}, rest);
      return res.status(200).json(updatedRecipe);
    }
    throw new Error('user is not the creator');
  } catch (e) {
    return res.status(400).json({error: e.message});
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const {recipeId} = req.params;
    if (isCreator(recipeId, req.userData.username)) {
      const deletedRecipe = await RecipeModel.findByIdAndDelete(recipeId);
      return res.status(200).json(deletedRecipe);
    }
    throw new Error('user is not the creator');
  } catch (e) {
    return res.status(400).json({error: e.message});
  }
};

module.exports = {
  getRecipes,
  getRecipe,
  getRecipesByUser,
  addRecipe,
  updateRecipe,
  deleteRecipe
};
