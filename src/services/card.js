import bcrypt from 'bcryptjs';
import createError from 'http-errors';
import {
  createCard,
  findOneAndRemoveCard,
  findOneAndUpdateCard,
  getAllCards,
  getCardByUser,
  getOneCard
} from '@/repository/card';

export const getCards = (query) => {
  return getAllCards(query);
};

export const getCardByID = async (id) => {
  const card = await getOneCard({ _id: id });
  if (!card) throw new createError(404, 'Invalid card ID');
  return card;
};

export const saveCard = async (card) => {
  const encryptedCVV = await new Promise((resolve, reject) => {
    bcrypt.hash(card.cvv, parseInt(process.env.BCRYPT_SALT_ROUNDS), (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });

  const newCard = await createCard({
    ...card,
    cvv: encryptedCVV
  });

  return newCard;
};

export const updateCard = async (cardId, card, userId) => {
  const cardData = await getOneCard({ _id: cardId });
  if (!cardData) throw new createError(404, 'Invalid card ID');

  if (cardData.userId.toString() !== userId.toString()) {
    throw new createError(403, 'You are not authorized to update this card');
  }

  const encryptedCVV = await new Promise((resolve, reject) => {
    bcrypt.hash(card.cvv, parseInt(process.env.BCRYPT_SALT_ROUNDS), (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });

  return findOneAndUpdateCard({ _id: cardId }, { ...card, cvv: encryptedCVV });
};

export const deleteCard = async (cardId, userId) => {
  const card = await getOneCard({ _id: cardId });
  if (!card) throw new createError(404, 'Invalid card ID');

  if (card.userId.toString() !== userId.toString()) {
    throw new createError(403, 'You are not authorized to delete this card');
  }

  return findOneAndRemoveCard({ _id: cardId });
};

export const getCardByUserId = async (userId) => {
  const card = await getCardByUser(userId);
  if (!card) return null;

  delete card.cvv;
  return card;
};
