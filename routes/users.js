const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUserId, getMyProfile,
  updateProfile, updateAvatar,
} = require('../controllers/users');

router.get('/me', getMyProfile);
router.get('/', getUsers);
router.get('/:userId', getUserId);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }).messages({
    'string.empty': 'Поле {#label} не может быть пустым',
    'string.min': 'Поле {#label} должно быть минимум {#limit} символа',
    'object.unknown': 'Переданы не разрешенные данные',
  }),
}), updateProfile);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string()
      .regex(/^(https?:\/\/)(w{0,3})(([\da-z-]+)\.){1,3}([a-z.]{2,6})([\w-:~?#@!$&'()*+,;=./]*)*\/?$/),
  }).messages({
    'string.empty': 'Поле {#label} не может быть пустым',
    'string.pattern.base': 'Некорректный адрес ссылки или содержит порнографический контент',
    'object.unknown': 'Переданы не разрешенные данные',
  }),
}), updateAvatar);

module.exports = router;
