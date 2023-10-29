import { expect } from 'chai';
import { Transaction } from '@/models';

describe('Transaction Model Test - Positive', () => {
  afterEach(async () => {
    await Transaction.deleteMany({});
  });

  it('New transaction should be saved to the database', async () => {
    const transactionData = {
      amount: 100,
      type: 'credit'
    };
    const newTransaction = new Transaction(transactionData);
    const savedTransaction = await newTransaction.save();
    expect(savedTransaction._id).to.exist;
    expect(savedTransaction.amount).to.equal(100);
    expect(savedTransaction.type).to.equal('credit');
  });

  it('Should find a transaction by ID in the database', async () => {
    const transactionData = {
      amount: 200,
      type: 'debit'
    };
    const newTransaction = new Transaction(transactionData);
    const savedTransaction = await newTransaction.save();

    const foundTransaction = await Transaction.findById(savedTransaction._id);

    expect(foundTransaction).to.exist;
    expect(foundTransaction._id.toString()).to.equal(savedTransaction._id.toString());
    expect(foundTransaction.amount).to.equal(200);
  });

  it('Should update transaction data in the database', async () => {
    const transactionData = {
      amount: 300,
      type: 'debit'
    };
    const newTransaction = new Transaction(transactionData);
    const savedTransaction = await newTransaction.save();

    savedTransaction.amount = 400;
    savedTransaction.type = 'credit';
    const updatedTransaction = await savedTransaction.save();

    expect(updatedTransaction.amount).to.equal(400);
    expect(updatedTransaction.type).to.equal('credit');
  });

  it('Should delete transaction data from the database', async () => {
    const transactionData = {
      amount: 500,
      type: 'credit'
    };
    const newTransaction = new Transaction(transactionData);
    const savedTransaction = await newTransaction.save();

    const deletedTransaction = await Transaction.findByIdAndDelete(savedTransaction._id);

    expect(deletedTransaction).to.not.be.null;
    expect(deletedTransaction._id).to.deep.equal(savedTransaction._id);
  });
});

describe('Transaction Model Test - Negative', () => {
  afterEach(async () => {
    await Transaction.deleteMany({});
  });

  it('Should not save a transaction with invalid fields to the database', async () => {
    const transactionData = {
      type: 'invalid'
    };
    let error = null;
    try {
      const newTransaction = new Transaction(transactionData);
      await newTransaction.save();
    } catch (err) {
      error = err;
    }
    expect(error).to.exist;
    expect(error).to.be.instanceOf(Error);
  });

  it('Should not save a transaction with an invalid type to the database', async () => {
    const transactionData = {
      amount: 200,
      type: 'invalidType'
    };
    let error = null;
    try {
      const newTransaction = new Transaction(transactionData);
      await newTransaction.save();
    } catch (err) {
      error = err;
    }
    expect(error).to.exist;
    expect(error).to.be.instanceOf(Error);
  });

  it('Should not find a non-existent transaction in the database', async () => {
    const nonExistentTransactionId = '123456789012345678901234';
    const foundTransaction = await Transaction.findById(nonExistentTransactionId);

    expect(foundTransaction).to.be.null;
  });

  it('Should not update a non-existent transaction in the database', async () => {
    const nonExistentTransactionId = '123456789012345678901234';
    const updatedTransactionData = {
      amount: 600,
      type: 'credit'
    };
    const updatedTransaction = await Transaction.findByIdAndUpdate(nonExistentTransactionId, updatedTransactionData, {
      new: true
    });

    expect(updatedTransaction).to.be.null;
  });

  it('Should not delete a non-existent transaction from the database', async () => {
    const nonExistentTransactionId = '123456789012345678901234';
    const deletedTransaction = await Transaction.findByIdAndDelete(nonExistentTransactionId);

    expect(deletedTransaction).to.be.null;
  });
});

export default Transaction;
