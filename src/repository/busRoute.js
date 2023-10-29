import { moduleLogger } from '@sliit-foss/module-logger';
import mongoose from 'mongoose';
import { BusRoute } from '@/models';

const logger = moduleLogger('Route-Repository');

export const createRoute = async (route) => {
  try {
    const newRoute = await new BusRoute(route).save();
    return newRoute;
  } catch (err) {
    logger.error(`An error occurred when creating the bus route - err: ${err.message}`);
    throw err;
  }
};

export const getAllRoutes = async ({ sort = {}, filter = {}, page = 1, limit = 10 }) => {
  try {
    const options = {
      page,
      limit
    };

    if (Object.keys(sort).length > 0) options.sort = sort;

    const aggregateQuery = () =>
      BusRoute.aggregate([
        {
          $match: filter
        }
      ]);

      return page
      ? await BusRoute.aggregatePaginate(aggregateQuery(), options).catch((err) => {
          logger.error(`An error occurred when retrieving bus routes - err: ${err.message}`);
          throw err;
      })
      : aggregateQuery().catch((err) => {
          logger.error(`An error occurred when retrieving bus routes - err: ${err.message}`);
          throw err;
      });
  } catch (err) {
    logger.error(`An error occurred when retrieving the bus routes - err: ${err.message}`);
    throw err;
  }
};

export const getRouteById = async (routeId) => {
  try {
    const route = await BusRoute.find({ _id: routeId }).lean();
    if (!route) return null;

    return route;
  } catch (err) {
    logger.error(`An error occurred when retrieving the bus route - err: ${err.message}`);
    throw err;
  }
};

export const findOneAndUpdateRoute = async (id, data) => {
  try {
    const route = await BusRoute.findOneAndUpdate({_id: id}, data, { new: true }).lean();
    if (!route) return null;
    console.log(route);
    return route;
  } catch (err) {
    logger.error(`An error occurred when updating the bus route - err: ${err.message}`);
    throw err;
  }
};

export const addBusStop = async (routeId, busStop) => {
  try {
    const route = await BusRoute.findOne({ _id: routeId });
    if (!route) return null;

    const busStops = [...route.busStops, busStop];

    const updatedRouteDetails = {
      name: route.name,
      startStop: route.startStop,
      endStop: route.endStop,
      busStops: busStops
    };

    // Save the updated route
    const updatedBusStop = await BusRoute.findOneAndUpdate({_id: routeId}, updatedRouteDetails, { new: true }).lean();

    return updatedBusStop;
  } catch (err) {
    logger.error(`An error occurred when adding bus stop - err: ${err.message}`);
    throw err;
  }
};

export const getBusStops = async (filters) => {
  try {
    const busStops = await BusRoute.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(filters._id)
        }
      },
      {
        $project: {
          busStops: 1
        }
      }
    ]).exec();

    console.log(busStops);
    return busStops;
  } catch (err) {
    logger.error(`An error occurred when retrieving bus stops - err: ${err.message}`);
    throw err;
  }
};
