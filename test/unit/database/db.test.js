import { expect } from 'chai';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

// ES6 Promises
mongoose.Promise = global.Promise;

// Connect to the database before running tests
before(function (done) {
  this.timeout(10000); // Set timeout to 10 seconds

  // Connect to MongoDB
  mongoose.connect(process.env.MONGO_TEST_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  mongoose.connection
    .once('open', () => {
      console.log('Connection has been made.');
      done();
    })
    .on('error', (error) => {
      console.log('Connection error:', error);
      done(error);
    });

  // drop every collection in the database
  const dropCollections = async () => {
    await mongoose.connection.dropDatabase();
  };
  dropCollections();
});

describe('Database connection', () => {
  it('should connect to the database', () => {
    expect(mongoose.connection.readyState).to.equal(1);
  });
});

export default mongoose;
