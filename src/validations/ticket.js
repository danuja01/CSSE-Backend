const Joi = require('joi');

export const addTicketSchema = Joi.object({
    userId: Joi.string().hex().length(24).required(),
    startBusStop: Joi.string().required(),
    endBusStop: Joi.string().required(),
    busRoute: Joi.string().hex().length(24).required(),
    price: Joi.number().required().default(0),
});

export const ticketIdSchema = {
    id: Joi.string().hex().length(24).required()
};

export const QRDataScheme = {
    busStop: Joi.string().required(),
    busRoute: Joi.string().hex().length(24).required(),
}