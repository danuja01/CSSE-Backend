import createError from 'http-errors';
import {
  createAccount,
  createTransaction,
  findAccountById,
  getAccountByUserId,
  getTransactionHistory,
  removeAccount,
  updateAccountBalance
} from '@/repository/account';

export const createAccountService = async (userId) => {
  const existingAccount = await getAccountByUserId(userId);
  if (existingAccount) {
    throw new createError(400, 'An account already exists for this user');
  }

  const newAccount = await createAccount(userId);
  return newAccount;
};

export const getAccountByUserIdService = async (userId) => {
  const account = await getAccountByUserId(userId);
  return account;
};

export const topUpAccount = async (userId, accountId, amount) => {
  const account = await findAccountById(userId, accountId);
  if (!account) {
    throw new createError(404, 'Account not found');
  }

  await updateAccountBalance(userId, accountId, amount, 'credit');
  await createTransaction(accountId, amount, 'credit');
};

export const makePayment = async (userId, accountId, amount) => {
  const account = await findAccountById(userId, accountId);
  if (!account) {
    throw new createError(404, 'Account not found');
  }

  if (account.balance < amount) {
    throw new createError(400, 'Insufficient funds in the account');
  }

  await updateAccountBalance(userId, accountId, amount, 'debit');
  await createTransaction(accountId, amount, 'debit');
};

export const getTransactionHistoryService = async (accountId) => {
  const transactions = await getTransactionHistory(accountId);
  return transactions;
};

export const deleteAccountService = async (accountId) => {
  const result = await removeAccount(accountId);
  return result;
};
