const { celebrate, Joi } = require('celebrate');
const { LINK_REGEX } = require('../constants');

const createMovieValid = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.string().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(LINK_REGEX),
    trailerLink: Joi.string().required().regex(LINK_REGEX),
    thumbnail: Joi.string().required().regex(LINK_REGEX),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports = createMovieValid;
