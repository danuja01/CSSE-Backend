import { Account, Transaction } from '@/models';

// Specify the correct path to your Account model

export const createAccount = async (userId) => {
  const existingAccount = await getAccountByUserId(userId); // Assuming there is a getAccountByUserId function in your repository
  if (existingAccount) {
    return existingAccount;
  } else {
    const accountSingleton = Account.getInstance(userId);
    const newAccount = await accountSingleton.Account.create({ userId, balance: 0 });
    return newAccount.toObject();
  }
};

export const getAccountByUserId = async (userId) => {
  const accountSingleton = Account.getInstance(userId);
  const account = await accountSingleton.Account.findOne({ userId }).lean();
  return account;
};

export const updateAccountBalance = async (userId, accountId, amount, type) => {
  const accountSingleton = Account.getInstance(userId);
  const updateOperator = type === 'credit' ? 1 : -1;
  await accountSingleton.Account.updateOne({ _id: accountId }, { $inc: { balance: updateOperator * amount } });
};

export const createTransaction = async (accountId, amount, type) => {
  const newTransaction = await Transaction.create({ accountId, amount, type });
  return newTransaction.toObject();
};

export const getTransactionHistory = async (accountId) => {
  const transactions = await Transaction.find({ accountId }).sort({ date: 'desc' }).lean();
  return transactions;
};

export const findAccountById = async (userId, accountId) => {
  const accountSingleton = Account.getInstance(userId);
  const account = await accountSingleton.Account.findById(accountId).lean();
  return account;
};

export const removeAccount = async (accountId) => {
  const accountSingleton = Account.getInstance(userId);
  const result = await accountSingleton.Account.deleteOne({ _id: accountId });
  return result;
};
