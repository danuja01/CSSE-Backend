import { getAccountByUserIdService, getTransactionHistoryService, makePayment, topUpAccount } from '@/services/account';
import { makeResponse } from '@/utils';

export const getAccountByUserId = async (req, res) => {
  const account = await getAccountByUserIdService(req.user._id);
  return makeResponse({ res, data: account, message: 'Account retrieved successfully' });
};

export const topUp = async (req, res) => {
  const userId = req.user._id;
  const accountId = (await getAccountByUserIdService(userId))._id;
  const { amount } = req.body;
  await topUpAccount(userId, accountId, amount);
  return makeResponse({ res, message: 'Account topped up successfully' });
};

export const payment = async (req, res) => {
  const userId = req.user._id;
  const accountId = (await getAccountByUserIdService(userId))._id;
  const { amount } = req.body;
  await makePayment(userId, accountId, amount);
  return makeResponse({ res, message: 'Payment made successfully' });
};

export const getTransactions = async (req, res) => {
  const accountId = (await getAccountByUserIdService(req.user._id))._id;
  const transactions = await getTransactionHistoryService(accountId);
  return makeResponse({ res, data: transactions, message: 'Transaction history retrieved successfully' });
};
