const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards, createCard, deleteCard,
  sendLike, deleteLike,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required()
      .regex(/^(https?:\/\/)(w{0,3})(([\da-z-]+)\.){1,3}([a-z.]{2,6})([\w-:~?#@!$&'()*+,;=./]*)*\/?$/),
  }).messages({
    'string.empty': 'Поле {#label} не может быть пустым',
    'string.min': 'Поле {#label} должно быть минимум {#limit} символов',
    'any.required': '{#label} - обязательное поле',
    'string.pattern.base': 'Некорректный адрес ссылки или содержит порнографический контент',
    'object.unknown': 'Переданы не разрешенные данные',
  }),
}), createCard);

router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', sendLike);
router.delete('/:cardId/likes', deleteLike);

module.exports = router;
