import { Joi } from 'celebrate';

export const addTransactionSchema = Joi.object({
  accountId: Joi.string().hex().length(24).required(),
  amount: Joi.number().min(0).required(),
  type: Joi.string().valid('credit', 'debit').required()
});

export const transactionIdSchema = {
  id: Joi.string().hex().length(24).required()
};

export const updateTransactionSchema = {
  accountId: Joi.string().hex().length(24).optional(),
  amount: Joi.number().min(0).optional(),
  type: Joi.string().valid('credit', 'debit').optional()
};
