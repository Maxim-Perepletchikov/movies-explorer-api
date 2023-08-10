const Movie = require('../models/movie');

const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const ValidationError = require('../errors/ValidationError');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movie) => res.send({ data: movie }))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    moviesId,
    nameRU,
    nameEN,
  } = req.body;
  const { _id } = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    moviesId,
    nameRU,
    nameEN,
    owner: _id,
  })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные'));
        return;
      }
      next(err);
    });
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;

  Movie.findById(movieId)
    .populate('owner')
    .then((movie) => {
      if (!movie) throw new NotFoundError('Карточка не найдена');
      if (req.user._id !== movie.owner.id) {
        throw new ForbiddenError('Нельзя удалить чужую карточку');
      }
      Movie.findByIdAndRemove(movieId)
        .then((movieDel) => {
          res.send({ data: movieDel });
        })
        .catch(next);
    })

    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
