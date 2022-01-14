/* eslint-disable consistent-return */
const User = require('../models/users');

const getUsers = (req, res) => User.find({})
  .orFail(() => new Error('Not Found'))
  .then((users) => res.status(200).send({ data: users }))
  .catch((err) => {
    if (err.message === 'Not Found') {
      return res.status(404).send({ message: 'Пользователи не найдены' });
    }
    res.status(500).send({ message: 'Произошла ещё не изученная ошибка' });
  });

const getUserId = (req, res) => User.findById(req.params.userId)
  .orFail(() => new Error('Not Found'))
  .then((users) => res.status(200).send({ data: users }))
  .catch((err) => {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'Некорректный Id пользователя' });
    }
    if (err.message === 'Not Found') {
      return res.status(404).send({ message: 'Пользователь не найден' });
    }
    res.status(500).send({ message: 'Произошла ещё не изученная ошибка' });
  });

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  return User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      res.status(500).send({ message: 'Произошла ещё не изученная ошибка' });
    });
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  return User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(() => new Error('Not Found'))
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      if (err.message === 'Not Found') {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      res.status(500).send({ message: 'Произошла ещё не изученная ошибка' });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  return User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(() => new Error('Not Found'))
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      if (err.message === 'Not Found') {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      res.status(500).send({ message: 'Произошла ещё не изученная ошибка' });
    });
};

module.exports = {
  getUsers,
  getUserId,
  createUser,
  updateProfile,
  updateAvatar,
};
