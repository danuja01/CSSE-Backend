import express from 'express';
// import { Segments, celebrate } from 'celebrate';
import { tracedAsyncHandler } from '@sliit-foss/functions';
import { scanQR, getAll, getById} from '@/controllers/ticket';

const ticketRouter = express.Router();

ticketRouter.get('/', tracedAsyncHandler(getAll));
ticketRouter.get('/:id', tracedAsyncHandler(getById));
ticketRouter.post('/', tracedAsyncHandler(scanQR));

export default ticketRouter;