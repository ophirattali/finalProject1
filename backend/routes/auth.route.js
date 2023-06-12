const {Router} = require('express');
const {
  getUserData,
  signIn,
  register
} = require('../controllers/auth.controller');
const checkAuth = require('../middleware/checkAuth');

const router = Router();

router.get('/', checkAuth, getUserData); //done
router.post('/', signIn); //done
router.post('/register', register); //done

module.exports = router;
