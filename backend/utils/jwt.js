const {jwtTokenTTL} = require('../config/constant');
const {JWT_SIGN} = require('../config/envs');
const jwt = require('jsonwebtoken');

const sign = async data => {
  try {
    const token = await jwt.sign({data}, JWT_SIGN, {expiresIn: jwtTokenTTL});
    return token;
  } catch (e) {
    return e.message;
  }
};

module.exports = {
  sign
};
