import express from 'express';
import { tracedAsyncHandler } from '@sliit-foss/functions';
import { Segments, celebrate } from 'celebrate';
import { deleteAccount, getAccountByUserId, getTransactions, payment, topUp } from '@/controllers/account';
import { accountIdSchema, updateAccountSchema } from '@/validations/account';

const accountRouter = express.Router();

accountRouter.get('/user', tracedAsyncHandler(getAccountByUserId));
accountRouter.post('/:id/topup', celebrate({ [Segments.BODY]: updateAccountSchema }), tracedAsyncHandler(topUp));
accountRouter.post('/:id/payment', celebrate({ [Segments.BODY]: updateAccountSchema }), tracedAsyncHandler(payment));
accountRouter.get(
  '/:id/transactions',
  celebrate({ [Segments.PARAMS]: accountIdSchema }),
  tracedAsyncHandler(getTransactions)
);
accountRouter.delete('/:id', celebrate({ [Segments.PARAMS]: accountIdSchema }), tracedAsyncHandler(deleteAccount));

export default accountRouter;
