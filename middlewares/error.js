const errorHandler = (err, req, res, next) => {
  let message;
  const statusCode = err.statusCode || 500;

  if (statusCode === 500) {
    message = 'Ошибка на сервере';
  } else {
    message = err.message;
  }

  res.status(statusCode).send({ message });
  next();
};

module.exports = { errorHandler };
