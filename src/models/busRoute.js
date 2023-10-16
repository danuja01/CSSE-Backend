import { Schema, model } from 'mongoose';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';

const BusRouteSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  startStop: {
    type: String,
    required: true
  },
  endStop: {
    type: String,
    required: true
  },
  busStops: [
    {
      name: {
        type: String
      }
    }
  ]
});

BusRouteSchema.plugin(aggregatePaginate);
BusRouteSchema.index({ createdAt: 1 });

const BusRoute = model('busRoute', BusRouteSchema);
BusRoute.syncIndexes();

export default BusRoute;
