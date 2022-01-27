/* eslint-disable consistent-return */
const { isCelebrateError } = require('celebrate');

const errorHandler = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    const errorBody = err.details.get('body');
    res.status(400)
      .send({ message: `${err.message}: ${errorBody.message}` });
  }
  const { statusCode = 500, message } = err;
  res.status(statusCode).send(
    { message: statusCode === 500 ? 'На сервере произошла ошибка' : message },
  );
  next();
};
module.exports = errorHandler;
