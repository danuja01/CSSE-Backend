/**
 * transaction model
 * @description This module provides the transaction model for the database.
*/

import { Schema, model } from 'mongoose';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';

const TransactionSchema = new Schema({
  accountId: {
    type: Schema.Types.ObjectId,
    ref: 'Account',
    required: false
  },
  amount: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['account', 'credit', 'debit'],
    default: 'account',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

TransactionSchema.plugin(aggregatePaginate);

TransactionSchema.index({ createdAt: 1 });

const Transaction = model('Transaction', TransactionSchema);

Transaction.syncIndexes();

export default Transaction;
