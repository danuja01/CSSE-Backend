/**
 * card model
 * @description This module provides the card model for the database.
*/

import { Schema, model } from 'mongoose';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';

const CardSchema = new Schema({
  cardHolderName: {
    type: String,
    required: true
  },
  nickName: {
    type: String,
    required: true
  },
  cardNumber: {
    type: String,
    required: true
  },
  expirationDate: {
    type: Date,
    required: true
  },
  cvv: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

CardSchema.plugin(aggregatePaginate);

CardSchema.index({ createdAt: 1 });

const Card = model('Card', CardSchema);

Card.syncIndexes();

export default Card;
