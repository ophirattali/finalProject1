const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
  if (req.method === 'OPTIONS') return next();
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      throw new Error('token expired');
    }
    const decoededToken = jwt.verify(token, `${process.env.JWT_SIGN}`);
    req.userData = decoededToken.data;
    req.token = token;
    next();
  } catch (error) {
    return res.status(401).json({error: error.message});
  }
};

module.exports = checkAuth;
