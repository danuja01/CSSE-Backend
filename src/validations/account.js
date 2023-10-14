import { Joi } from 'celebrate';

export const addAccountSchema = Joi.object({
  userId: Joi.string().hex().length(24).required()
});

export const accountIdSchema = {
  id: Joi.string().hex().length(24).required()
};

export const updateAccountSchema = {
  userId: Joi.string().hex().length(24).optional()
};
