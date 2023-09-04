const router = require('express').Router();
const { createUser, login } = require('../controllers/users');
const createUserValid = require('../utils/validations/createUserValid');
const loginValid = require('../utils/validations/loginValid');
const auth = require('../middlewares/auth');
const userRouter = require('./users');
const movieRouter = require('./movies');

const NotFoundError = require('../errors/NotFoundError');

router.post('/signup', createUserValid, createUser);

router.post('/signin', loginValid, login);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

module.exports = router;
