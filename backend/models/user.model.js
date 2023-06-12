const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    favorites: {
      type: [mongoose.Types.ObjectId],
      ref: 'Recipe',
      default: []
    }
  },
  {
    timestamps: true
  }
);

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
