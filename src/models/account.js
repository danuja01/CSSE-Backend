import { Schema, model } from 'mongoose';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';

class Account {
  static instances = {};

  static getInstance(userId) {
    if (!Account.instances[userId]) {
      Account.instances[userId] = new Account(userId);
    }
    return Account.instances[userId];
  }

  constructor(userId) {
    this.instances = {};
    const AccountSchema = new Schema({
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      balance: {
        type: Number,
        required: true,
        default: 0
      }
    });

    AccountSchema.plugin(aggregatePaginate);
    AccountSchema.index({ createdAt: 1 });

    this.Account = model(`Account_${userId}`, AccountSchema);
    this.Account.syncIndexes();
  }
}

export default Account;
