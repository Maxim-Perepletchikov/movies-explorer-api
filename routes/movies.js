const movieRouter = require('express').Router();

const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const createMovieValid = require('../utils/validations/createMovieValid');
const deleteMovieValid = require('../utils/validations/deleteMovieValid');

movieRouter.get('/', getMovies);
movieRouter.post('/', createMovieValid, createMovie);
movieRouter.delete('/:movieId', deleteMovieValid, deleteMovie);

module.exports = movieRouter;
