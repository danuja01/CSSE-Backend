import { Schema, model } from 'mongoose';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';

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

const Account = model('Account', AccountSchema);

Account.syncIndexes();

export default Account;
