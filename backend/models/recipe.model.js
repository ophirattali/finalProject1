const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    name: {
      type: String,
      required: true,
      index: true
    },
    ingredients: {
      type: Array,
      required: true
    },
    howToCreate: {
      type: String
    },
    timeToWork: {
      type: String
    },
    imgUrl: {
      type: String
    },
    favoriteCount: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  {
    timestamps: true
  }
);

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
