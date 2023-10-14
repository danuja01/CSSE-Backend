import { deleteCard, getCardByID, getCardByUserId, getCards, saveCard, updateCard } from '@/services/card';
import { makeResponse } from '@/utils';

export const getAll = async (req, res) => {
  const cards = await getCards(req.query);
  return makeResponse({ res, data: cards, message: 'Cards retrieved succesfully' });
};

export const getById = async (req, res) => {
  const card = await getCardByID(req.params.id);
  return makeResponse({ res, data: card, message: 'Card retrieved succesfully' });
};

export const create = async (req, res) => {
  const card = await saveCard(req.body);
  return makeResponse({ res, data: card, message: 'Card created successfully' });
};

export const update = async (req, res) => {
  const card = await updateCard(req.params.id, req.body, req.user._id);
  return makeResponse({ res, data: card, message: 'Card updated successfully' });
};

export const remove = async (req, res) => {
  await deleteCard(req.params.id, req.user._id);
  return makeResponse({ res, message: 'Card deleted successfully' });
};

export const getByUserId = async (req, res) => {
  const card = await getCardByUserId(req.user._id);
  return makeResponse({ res, data: card, message: 'Card retrieved succesfully' });
};
