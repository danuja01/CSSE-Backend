import { expect } from 'chai';
import mongoose from 'mongoose';
import { User } from '@/models';
import { Account } from '@/models';

describe('Account Model Test - Positive', () => {
  let userId = null;

  beforeEach(async () => {
    const userData = {
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'testpassword'
    };
    const newUser = new User(userData);
    const savedUser = await newUser.save();
    userId = savedUser._id;
  });

  afterEach(async () => {
    await User.deleteMany({});
    await Account.getInstance(userId).Account.deleteMany({});
  });

  it('New account should be saved to the database', async () => {
    const accountInstance = Account.getInstance(userId);
    const accountData = {
      userId,
      balance: 100
    };
    const newAccount = new accountInstance.Account(accountData);
    const savedAccount = await newAccount.save();

    expect(savedAccount._id).to.exist;
    expect(savedAccount.userId.toString()).to.equal(userId.toString());
    expect(savedAccount.balance).to.equal(100);
  });

  it('Should ensure that only one account is associated with a user ID', async () => {
    const accountInstance = Account.getInstance(userId);
    const accountData = {
      userId,
      balance: 100
    };
    const newAccount = new accountInstance.Account(accountData);
    const savedAccount = await newAccount.save();

    const accounts = await accountInstance.Account.find({ userId: userId });
    expect(accounts.length).to.equal(1);
    expect(accounts[0]._id.toString()).to.equal(savedAccount._id.toString());
  });

  it('Should find an account by ID in the database', async () => {
    const accountInstance = Account.getInstance(userId);
    const accountData = {
      userId,
      balance: 100
    };
    const newAccount = new accountInstance.Account(accountData);
    const savedAccount = await newAccount.save();

    const foundAccount = await accountInstance.Account.findById(savedAccount._id);

    expect(foundAccount._id).to.deep.equal(savedAccount._id);
    expect(foundAccount.balance).to.equal(100);
  });

  it('Should update account data in the database', async () => {
    const accountInstance = Account.getInstance(userId);
    const accountData = {
      userId,
      balance: 100
    };
    const newAccount = new accountInstance.Account(accountData);
    const savedAccount = await newAccount.save();

    savedAccount.balance = 150;
    const updatedAccount = await savedAccount.save();

    expect(updatedAccount.balance).to.equal(150);
  });

  it('Should delete account data from the database', async () => {
    const accountInstance = Account.getInstance(userId);
    const accountData = {
      userId,
      balance: 100
    };
    const newAccount = new accountInstance.Account(accountData);
    const savedAccount = await newAccount.save();

    const deletedAccount = await accountInstance.Account.findByIdAndDelete(savedAccount._id);

    expect(deletedAccount).to.not.be.null;
    expect(deletedAccount._id).to.deep.equal(savedAccount._id);
  });
});

describe('Account Model Test - Negative', () => {
  let userId = null;

  beforeEach(async () => {
    const userData = {
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'testpassword'
    };
    const newUser = new User(userData);
    const savedUser = await newUser.save();
    userId = savedUser._id;
  });

  afterEach(async () => {
    await User.deleteMany({});
    await Account.getInstance(userId).Account.deleteMany({}); // A non-existent user ID
  });

  it('Should not save an account with invalid fields to the database', async () => {
    const accountInstance = Account.getInstance(userId); // An invalid user ID
    const accountData = {
      balance: 100
    };

    let error = null;
    try {
      const newAccount = new accountInstance.Account(accountData);
      await newAccount.save();
    } catch (err) {
      error = err;
    }

    expect(error).to.exist;
    expect(error).to.be.instanceOf(Error);
  });

  it('Should not allow creation of multiple accounts for the same user ID', async () => {
    const testUserId = userId;
    const accountInstance = Account.getInstance(testUserId);
    const accountData1 = {
      userId: testUserId,
      balance: 100
    };
    const accountData2 = {
      userId: testUserId,
      balance: 200
    };

    await accountInstance.Account.create(accountData1);
    let error = false;
    try {
      await accountInstance.Account.create(accountData2);
    } catch (err) {
      error = true;
    }
    expect(error).to.be.false;
  });

  it('Should not find a non-existent account in the database', async () => {
    const accountInstance = Account.getInstance(userId); // A non-existent user ID
    const foundAccount = await accountInstance.Account.find();

    expect(foundAccount).to.be.an('array').that.is.empty;
  });

  it('Should not update a non-existent account in the database', async () => {
    const accountInstance = Account.getInstance(userId); // A non-existent user ID
    const updatedAccount = await accountInstance.Account.findByIdAndUpdate(
      '615b5f9e59d036e01bd805c7', // A non-existent account ID
      { balance: 150 },
      { new: true }
    );

    expect(updatedAccount).to.be.null;
  });

  it('Should not delete a non-existent account from the database', async () => {
    const accountInstance = Account.getInstance('615b5f9e59d036e01bd805c7'); // A non-existent user ID
    const deletedAccount = await accountInstance.Account.findByIdAndDelete('615b5f9e59d036e01bd805c7'); // A non-existent account ID

    expect(deletedAccount).to.be.null;
  });
});
