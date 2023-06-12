const {compareSync, hashSync} = require('bcrypt');
const {saltRounds} = require('../config/constant');
const UserModel = require('../models/user.model');
const {sign} = require('../utils/jwt');

const getUserData = async (req, res) => {
  try {
    const {_id} = req.userData;
    const user = await UserModel.findById(_id);
    if (!user) {
      throw new Error('no such username');
    }
    res.status(200).json({user});
  } catch (e) {
    res.status(401).json({error: e.message});
  }
};

const signIn = async (req, res) => {
  try {
    const {username, password} = req.body;

    const user = await UserModel.findOne({username});
    if (!user) {
      throw new Error('user name or password incorrect');
    }
    const isPasswordCorrect = compareSync(password, user?.password);
    if (!isPasswordCorrect) {
      throw new Error('user name or password incorrect');
    }
    const token = await sign(user);
    res.status(200).json({token, user});
  } catch (e) {
    console.log(e.message);
    res.status(401).json({error: e.message});
  }
};

const register = async (req, res) => {
  const {password} = req.body;
  const hashedPassword = hashSync(password, saltRounds);
  try {
    const user = await UserModel.create({
      ...req.body,
      password: hashedPassword
    });
    const token = await sign(user);

    res.status(200).json({user, token});

    return user;
  } catch (e) {
    res.status(401).json({error: e.message});
  }
};

module.exports = {
  getUserData,
  signIn,
  register
};
