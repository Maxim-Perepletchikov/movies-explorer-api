const { celebrate, Joi } = require('celebrate');

const deleteMovieValid = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24),
  }),
});

module.exports = deleteMovieValid;
