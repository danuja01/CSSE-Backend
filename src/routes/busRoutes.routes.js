/**
 * Bus routes routes
 * @author Supun Kariyawasam
 * @description This module provides functions to interact with bus routes in a database.
 */
import express from 'express';
import { tracedAsyncHandler } from '@sliit-foss/functions';
// import { Segments, celebrate } from 'celebrate';
import { addBusStop, createBusRoute, getAll, getBusStops, getById, updateBusRoute } from '@/controllers/busRoute';

const routeRouter = express.Router();

routeRouter.get('/', tracedAsyncHandler(getAll));
routeRouter.get('/:id', tracedAsyncHandler(getById));
routeRouter.post('/', tracedAsyncHandler(createBusRoute));
routeRouter.post('/stops/:id', tracedAsyncHandler(getBusStops));
routeRouter.patch('/:id', tracedAsyncHandler(updateBusRoute));
routeRouter.patch('/bus/:id', tracedAsyncHandler(addBusStop));

export default routeRouter;
