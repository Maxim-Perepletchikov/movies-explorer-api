const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/AuthorizationError');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  // const token = req.cookies.jwt;

  // let payload;

  // try {
  //   payload = jwt.verify(token, 'SECRET');
  // } catch (error) {
  //   throw new AuthorizationError('Необходима авторизация');
  // }

  // req.user = payload;

  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new AuthorizationError('Необходима авторизация'));
    return;
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'SECRET');
  } catch (err) {
    next(new AuthorizationError('Необходима авторизация'));
    return;
  }
  req.user = payload;

  next();
};

module.exports = auth;
