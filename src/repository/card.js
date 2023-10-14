import { moduleLogger } from '@sliit-foss/module-logger';
import { Card } from '@/models';

const logger = moduleLogger('Card-Repository');

export const createCard = async (card) => {
  const newCard = (await new Card(card).save()).toObject();
  delete newCard.cvv;
  return newCard;
};

export const getAllCards = ({ sort = {}, filter = {}, page = 1, limit = 10 }) => {
  const options = {
    page,
    limit
  };

  if (Object.keys(sort).length > 0) options.sort = sort;

  const aggregateQuery = () =>
    Card.aggregate([
      {
        $match: filter
      },
      {
        $project: {
          cvv: 0
        }
      }
    ]);

  return (page ? Card.aggregatePaginate(aggregateQuery(), options) : aggregateQuery()).catch((err) => {
    logger.error(`An error occurred when retrieving cards - err: ${err.message}`);
    throw err;
  });
};

// get card by user
export const getCardByUser = async (userId) => {
  const card = await Card.find({ userId: userId }).lean();
  if (!card) return null;

  delete card.cvv;
  return card;
};

export const getOneCard = async (filters, returnCvv = false) => {
  const card = await Card.findOne(filters).lean();
  if (!card) return null;

  if (!returnCvv) delete card.cvv;
  return card;
};

export const findOneAndUpdateCard = async (filters, data) => {
  const user = await Card.findOneAndUpdate(filters, data, { new: true }).lean();
  if (!user) return null;

  delete user.cvv;
  return user;
};

export const findOneAndRemoveCard = (filters) => {
  return Card.findOneAndRemove(filters);
};
