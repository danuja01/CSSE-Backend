import { expect } from 'chai';
import { User } from '@/models';

describe('User Model Test', () => {
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
