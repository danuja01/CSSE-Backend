// import createError from 'http-errors';
import {
  addBusStop,
  createRoute,
  findOneAndUpdateRoute,
  getAllRoutes,
  getBusStops,
  getRouteById
} from '@/repository/busRoute';

export const createRouteService = async (routeId) => {
  const newBusRoute = await createRoute(routeId);
  return newBusRoute;
};

export const getAllRoutesService = async (filters) => {
  const busRoutes = await getAllRoutes(filters);
  return busRoutes;
};

export const getRouteByIdService = async (routeId) => {
  const busRoute = await getRouteById(routeId);
  return busRoute;
};

export const getBusStopsService = async (routeId) => {
  const busStops = await getBusStops(routeId);
  return busStops;
};

export const UpdateRouteService = async (id, data) => {
  const updatedRoute = await findOneAndUpdateRoute(id, data);
  return updatedRoute;
};

export const addBusStopService = async (routeId, busStop) => {
  const updatedRoute = await addBusStop(routeId, busStop);
  return updatedRoute;
};
