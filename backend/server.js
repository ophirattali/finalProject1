const express = require('express');
const {PORT, DB_URL} = require('./config/envs');
const mongoose = require('mongoose');
const recipeRouter = require('./routes/recipe.route');
const favorieRouter = require('./routes/favorite.route');
const authRouter = require('./routes/auth.route');
const cors = require('cors');
const {register} = require('./controllers/auth.controller');
const checkAuth = require('./middleware/checkAuth');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/auth', authRouter);
app.use(checkAuth);
app.use('/api/recipe', recipeRouter);
app.use('/api/favorite', favorieRouter);

app.get('/', async (req, res) => {
  await register('USERNAME', 'PASSWORD');
  res.send('Final Project Server');
});

mongoose
  .connect(DB_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is ruuning on port ${PORT}`);
    });
  })
  .catch(e => {
    console.log(e.message);
  });
