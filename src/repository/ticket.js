import { moduleLogger } from '@sliit-foss/module-logger';
import mongoose from 'mongoose';
import Ticket from '@/models/ticket';

const logger = moduleLogger('Ticket-Repository');

export const createTicket = async (ticket) => {
    try{
        const newTicket = await new Ticket(ticket).save();
        return newTicket;
    } catch(err) {
        logger.error(`An error occurred when creating the ticket - err: ${err.message}`);
        throw err;
    }       
};

export const getAllTickets = async ({ sort = {}, filter = {}, page = 1, limit = 10 }) => {
    try {
      const options = {
        page,
        limit
      };
  
      if (Object.keys(sort).length > 0) options.sort = sort;
  
      const aggregateQuery = () =>
        Ticket.aggregate([
          {
            $match: filter
          }
        ]);
        
      return page
      ? await Ticket.aggregatePaginate(aggregateQuery(), options).catch((err) => {
          logger.error(`An error occurred when retrieving bus routes - err: ${err.message}`);
          throw err;
      })
      : aggregateQuery().catch((err) => {
          logger.error(`An error occurred when retrieving bus routes - err: ${err.message}`);
          throw err;
      });
    } catch (err) {
      logger.error(`An error occurred when retrieving tickets - err: ${err.message}`);
      throw err;
    }
};

export const getTicketById = async (ticketId) => {
    try {
      const ticket = await Ticket.find({ _id: ticketId }).lean();
      if (!ticket) return null;
  
      return ticket;
    } catch (err) {
      logger.error(`An error occurred when retrieving the bus ticket - err: ${err.message}`);
      throw err;
    }
};