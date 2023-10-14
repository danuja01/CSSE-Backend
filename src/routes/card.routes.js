import express from 'express';
import { tracedAsyncHandler } from '@sliit-foss/functions';
import { Segments, celebrate } from 'celebrate';
import { create, getAll, getById, getByUserId, remove, update } from '@/controllers/card';
import { addCardSchema, cardIdSchema, updateSchema } from '@/validations/card';

const cardRouter = express.Router();
cardRouter.get('/', tracedAsyncHandler(getAll));
cardRouter.get('/user', tracedAsyncHandler(getByUserId)); // Specific route for '/user'

cardRouter.post('/', celebrate({ [Segments.BODY]: addCardSchema }), tracedAsyncHandler(create));
cardRouter.patch(
  '/:id',
  celebrate({ [Segments.PARAMS]: cardIdSchema, [Segments.BODY]: updateSchema }),
  tracedAsyncHandler(update)
);
cardRouter.delete('/:id', celebrate({ [Segments.PARAMS]: cardIdSchema }), tracedAsyncHandler(remove));
cardRouter.get('/:id', celebrate({ [Segments.PARAMS]: cardIdSchema }), tracedAsyncHandler(getById));

export default cardRouter;
