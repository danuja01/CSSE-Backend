import {
  UpdateRouteService,
  addBusStopService,
  createRouteService,
  getAllRoutesService,
  getBusStopsService,
  getRouteByIdService
} from '@/services/busRoute';
import { makeResponse } from '@/utils';

export const getAll = async (req, res) => {
  const routes = await getAllRoutesService(req.query);
  return makeResponse({ res, data: routes, message: 'Bus routes retrieved succesfully' });
};

export const getById = async (req, res) => {
  const busRoute = await getRouteByIdService(req.params.id);
  return makeResponse({ res, data: busRoute, message: 'Bus route retrieved succesfully' });
};

export const createBusRoute = async (req, res) => {
  const route = await createRouteService(req.body);
  return makeResponse({ res, data: route, message: 'Bus route created successfully' });
};

export const updateBusRoute = async (req, res) => {
  const updatedRoute = await UpdateRouteService(req.params.id, req.body);
  return makeResponse({ res, data: updatedRoute, message: 'Bus Route updated successfully' });
};

export const addBusStop = async (req, res) => {
  const updatedRoute = await addBusStopService(req.params.id, req.body);
  return makeResponse({ res, data: updatedRoute, message: 'Bus stop added successfully' });
};

export const getBusStops = async (req, res) => {
  const filters = {
    _id: req.params.id
  };
  const busStops = await getBusStopsService(filters);
  return makeResponse({ res, data: busStops, message: 'Bus stops retrieved succesfully' });
};
