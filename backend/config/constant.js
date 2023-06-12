const maxBooksPerFetch = 20;
const notAvailImageUrl =
  'https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-15.png';
const saltRounds = 10;
const jwtTokenTTL = '24h';
const numOfMostFavorites = 3;
const maxRecipesPerFetch = 10;

module.exports = {
  maxBooksPerFetch,
  notAvailImageUrl,
  saltRounds,
  jwtTokenTTL,
  numOfMostFavorites,
  maxRecipesPerFetch
};
