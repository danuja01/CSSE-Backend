import { Schema, model } from 'mongoose';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';

const TicketSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  startBusStop: {
    type: String,
    required: true,
  },
  endBusStop: {
    type: String,
    required: true,
  },
  busRoute: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    default: 0
  }
});

TicketSchema.plugin(aggregatePaginate);

TicketSchema.index({ createdAt: 1 });

const Ticket = model('Ticket', TicketSchema);

Ticket.syncIndexes();

export default Ticket;