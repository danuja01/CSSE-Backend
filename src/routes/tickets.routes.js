import express from 'express';
// import { Segments, celebrate } from 'celebrate';
import { tracedAsyncHandler } from '@sliit-foss/functions';
import { scanQR, getAll, getById, generateQR} from '@/controllers/ticket';

const ticketRouter = express.Router();

ticketRouter.get('/', tracedAsyncHandler(getAll));
ticketRouter.get('/:id', tracedAsyncHandler(getById));
ticketRouter.post('/', tracedAsyncHandler(scanQR));
ticketRouter.post('/QR', tracedAsyncHandler(generateQR));

export default ticketRouter;
