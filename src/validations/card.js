import cardValidator from 'card-validator';
import { Joi } from 'celebrate';

export const addCardSchema = Joi.object({
  cardHolderName: Joi.string().required(),
  nickName: Joi.string().required(),
  cardNumber: Joi.string()
    .custom((value, helpers) => {
      const isValid = cardValidator.number(value).isValid;
      if (!isValid) {
        return helpers.error('any.invalid');
      }
      return value;
    }, 'custom card validation')
    .required(),
  expirationDate: Joi.date().required(),
  cvv: Joi.string().required(),
  userId: Joi.string().hex().length(24).required()
});

export const cardIdSchema = {
  id: Joi.string().hex().length(24).required()
};

export const userIdSchema = {
  id: Joi.string().hex().length(24).required()
};

export const updateSchema = {
  cardHolderName: Joi.string().optional(),
  nickName: Joi.string().optional(),
  cardNumber: Joi.string().optional(),
  expirationDate: Joi.date().optional(),
  cvv: Joi.string().optional(),
  userId: Joi.string().hex().length(24).optional()
};
