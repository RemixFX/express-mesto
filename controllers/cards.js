/* eslint-disable consistent-return */
const Card = require('../models/cards');

const getCards = (req, res) => Card.find({})
  .orFail(() => new Error('Not Found'))
  .then((cards) => res.status(200).send({ data: cards }))
  .catch((err) => {
    if (err.message === 'Not Found') {
      return res.status(404).send({ message: 'Карточки не найдены' });
    }
    res.status(500).send({ message: 'Произошла ещё не изученная ошибка' });
  });

const createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  console.log({ name, link, owner });
  return Card.create({ name, link, owner })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      res.status(500).send({ message: 'Произошла ещё не изученная ошибка' });
    });
};

const deleteCard = (req, res) => Card.findByIdAndRemove(req.params.id)
  .orFail(() => new Error('Not Found'))
  .then((card) => res.status(200).send({ data: card }))
  .catch((err) => {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'Переданы некорректные данные' });
    }
    if (err.message === 'Not Found') {
      return res.status(404).send({ message: 'Карточка не найдена' });
    }
    res.status(500).send({ message: 'Произошла ещё не изученная ошибка' });
  });

const sendLike = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .orFail(() => new Error('Not Found'))
  .then((card) => res.status(200).send({ data: card }))
  .catch((err) => {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'Переданы некорректные данные' });
    }
    if (err.message === 'Not Found') {
      return res.status(404).send({ message: 'Карточка не найдена' });
    }
    res.status(500).send({ message: 'Произошла ещё не изученная ошибка' });
  });

const deleteLike = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .orFail(() => new Error('Not Found'))
  .then((card) => res.status(200).send({ data: card }))
  .catch((err) => {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'Переданы некорректные данные' });
    }
    if (err.message === 'Not Found') {
      return res.status(404).send({ message: 'Карточка не найдена' });
    }
    res.status(500).send({ message: 'Произошла ещё не изученная ошибка' });
  });

module.exports = {
  getCards,
  createCard,
  deleteCard,
  sendLike,
  deleteLike,
};
