const MOVIE_BASE_URL = 'https://api.nomoreparties.co';

const SHORT_FILM_DURATION = 40;

const SCREEN = {
  S: 630,
  M: 930,
  L: 1280,
};

const CARDS = {
  XS: { initial: 5, add: 2 },
  S: { initial: 8, add: 2 },
  M: { initial: 12, add: 3 },
  L: { initial: 16, add: 4 },
  DEFAULT: { initial: 0, add: 0 },
};

module.exports = {
  MOVIE_BASE_URL,
  SCREEN,
  CARDS,
  SHORT_FILM_DURATION,
};
