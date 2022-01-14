const router = require('express').Router();
const {
  getCards, createCard, deleteCard,
  sendLike, deleteLike,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', sendLike);
router.delete('/:cardId/likes', deleteLike);

module.exports = router;
