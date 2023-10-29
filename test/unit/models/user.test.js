import { expect } from 'chai';
import { User } from '@/models';

describe('User Model Test - Positve', () => {
  afterEach(async () => {
    await User.deleteMany({});
  });

  it('New user should be saved to the database', async () => {
    const userData = {
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'testpassword'
    };
    const newUser = new User(userData);
    const savedUser = await newUser.save();
    expect(savedUser._id).to.exist;
    expect(savedUser.name).to.equal('Test User');
    expect(savedUser.email).to.equal('testuser@example.com');
  });

  it('Should find a user by ID in the database', async () => {
    const userData = {
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'testpassword'
    };
    const newUser = new User(userData);
    const savedUser = await newUser.save();

    const foundUser = await User.findById(savedUser._id);

    expect(foundUser._id).to.deep.equal(savedUser._id);
    expect(foundUser.name).to.equal('Test User');
  });

  it('Should update user data in the database', async () => {
    const userData = {
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'testpassword'
    };
    const newUser = new User(userData);
    const savedUser = await newUser.save();

    savedUser.name = 'Updated User';
    savedUser.email = 'updateduser@example.com';
    const updatedUser = await savedUser.save();

    expect(updatedUser.name).to.equal('Updated User');
    expect(updatedUser.email).to.equal('updateduser@example.com');
  });

  it('Should delete user data from the database', async () => {
    const userData = {
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'testpassword'
    };
    const newUser = new User(userData);
    const savedUser = await newUser.save();

    const deletedUser = await User.findByIdAndDelete(savedUser._id);

    expect(deletedUser).to.not.be.null;
    expect(deletedUser._id).to.deep.equal(savedUser._id);
  });
});

describe('User Model Test - Negative', () => {
  afterEach(async () => {
    await User.deleteMany({});
  });

  it('Should not save user with invalid fields to the database', async () => {
    const userData = {
      email: 'invalidemail',
      password: 'short'
    };
    let error = null;
    try {
      const newUser = new User(userData);
      await newUser.save();
    } catch (err) {
      error = err;
    }
    expect(error).to.exist;
    expect(error).to.be.instanceOf(Error);
  });

  it('Should not find a non-existent user by ID in the database', async () => {
    const nonExistentUserId = '615b5f9e59d036e01bd805c7'; // A non-existent ID
    const foundUser = await User.findById(nonExistentUserId);
    expect(foundUser).to.be.null;
  });

  it('Should not update a non-existent user in the database', async () => {
    const nonExistentUserId = '615b5f9e59d036e01bd805c7'; // A non-existent ID
    const updatedUser = await User.findByIdAndUpdate(nonExistentUserId, { name: 'Updated User' }, { new: true });
    expect(updatedUser).to.be.null;
  });

  it('Should not delete a non-existent user from the database', async () => {
    const nonExistentUserId = '615b5f9e59d036e01bd805c7'; // A non-existent ID
    const deletedUser = await User.findByIdAndDelete(nonExistentUserId);
    expect(deletedUser).to.be.null;
  });
});
