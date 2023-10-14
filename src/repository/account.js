import { Account, Transaction } from '@/models';

export const createAccount = async (userId) => {
  const newAccount = await Account.create({ userId, balance: 0 });
  return newAccount.toObject();
};

export const getAccountByUserId = async (userId) => {
  const account = await Account.findOne({ userId }).lean();
  return account;
};

export const updateAccountBalance = async (accountId, amount, type) => {
  const updateOperator = type === 'credit' ? '$inc' : '$dec';
  await Account.updateOne({ _id: accountId }, { [updateOperator]: { balance: amount } });
};

export const createTransaction = async (accountId, amount, type) => {
  const newTransaction = await Transaction.create({ accountId, amount, type });
  return newTransaction.toObject();
};

export const getTransactionHistory = async (accountId) => {
  const transactions = await Transaction.find({ accountId }).sort({ date: 'desc' }).lean();
  return transactions;
};

export const findAccountById = async (accountId) => {
  const account = await Account.findById(accountId).lean();
  return account;
};

export const removeAccount = async (accountId) => {
  const result = await Account.deleteOne({ _id: accountId });
  return result;
};
