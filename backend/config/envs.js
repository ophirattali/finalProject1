const dotenv = require('dotenv');
dotenv.config();

const PORT = Number(process.env.PORT);
const DB_URL = process.env.DB_URL || '';
const JWT_SIGN = process.env.JWT_SIGN;

module.exports = {
  PORT,
  DB_URL,
  JWT_SIGN
};
