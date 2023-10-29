import { Joi } from 'celebrate';

const busStopSchema = Joi.object({
    name: Joi.string().required(),
});

const updateBusStopSchema = Joi.object({
    name: Joi.string().optional(),
});

export const addBusRouteSchema = Joi.object({
    name: Joi.string().required(),
    startStop: Joi.string().required(),
    endStop: Joi.string().required(),
    busStops: Joi.array().items(busStopSchema),
});

export const busRouteIdSchema = {
    id: Joi.string().hex().length(24).required()
};

export const updateSchema = {
    name: Joi.string().optional(),
    startStop: Joi.string().optional(),
    endStop: Joi.string().optional(),
    busStops: Joi.array().items(updateBusStopSchema),
}