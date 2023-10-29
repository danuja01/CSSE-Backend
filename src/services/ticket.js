import {
    createTicket,
    getAllTickets,
    getTicketById
} from '@/repository/ticket';
import { getUserByID } from '@/services/user';
import { makePayment } from '@/services/account';
import createError from 'http-errors';
import { getRouteByIdService } from './busRoute';
import { BusRoute } from '@/models';

const BUS_PRICES = {
    defaultPrice : 30,
    incrementPerFiveStops : 5
}

const PRICE_PARAMETERS = {
    default: 5,
    stopsPerIncrement: 5
}

export const scanQRService = async(ticketData) => {
    const userId = ticketData.userID;
    const startStop = ticketData.busStop;
    const endStop = ticketData.endStop;
    const busRoute = ticketData.busRoute;

    const user = await getUserByID(userId);
    if (!user) {
        throw new createError(404, 'User not Found');
    }

    const route = await BusRoute.findOne({ _id: busRoute });
    if (!route) {
        throw new createError(404, 'Bus Route not found');
    }

    const startStopIndex = route.busStops.findIndex((stop) => stop.name === startStop.name);
    const endStopIndex = route.busStops.findIndex((stop) => stop.name === endStop.name);

    console.log('Start Stop Index:', startStopIndex);
    console.log('End Stop Index:', endStopIndex);

    if (startStopIndex === -1 || endStopIndex === -1 || endStopIndex < startStopIndex) {
      throw new createError(400, 'Invalid bus stops');
    }

    const price = await calculatePayment(startStopIndex, endStopIndex);

    const transaction = await makePayment(userId, price);
    if(!transaction){
        throw new createError(500, 'Transaction failed!');
    }

    const newTicket = {
        userId: userId,
        startBusStop: startStop,
        endBusStop: endStop,
        busRoute: busRoute,
        price: price
    };

    const savedTicket = await createTicket(newTicket);
    if(!savedTicket){
        throw new createError(500, 'Ticket creation failed!');
    }

    return savedTicket;

};

export const getAllTicketsService = async (filters) => {
    const tickets = await getAllTickets(filters);
    return tickets;
};

export const getTicketByIdService = async (ticketId) => {
    const ticket = await getTicketById(ticketId);
    return ticket;
};

//helper function to calculate the payment
const calculatePayment = async(startStop, endStop) => {  
    const travelDistance = startStop - endStop;
    let price = BUS_PRICES.defaultPrice;

    if (travelDistance > PRICE_PARAMETERS.default) {
        const additionalStops = travelDistance - PRICE_PARAMETERS.default;
        const additionalPrice = Math.ceil(additionalStops / PRICE_PARAMETERS.stopsPerIncrement) * BUS_PRICES.pricePerAdditionalStops;
        price += additionalPrice;
    }

    return price;   
} 