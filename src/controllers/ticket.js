import { scanQRService, getAllTicketsService, getTicketByIdService } from '@/services/ticket';
import { makeResponse } from '@/utils';
const QRCode = require('qrcode');

export const generateQR = async (req, res) => {
    const busStop = req.body.busStop;
    const busRoute = req.body.busRoute;

    const payload = {
        busStop: busStop,
        busRoute: busRoute
    };

    const qrCode = await QRCode.toDataURL(JSON.stringify(payload));

    return makeResponse({ res, data: qrCode, message: 'Inspector - QR code generated succesfully' });
};

export const scanQR = async (req, res) => {
    const ticket = await scanQRService(req.body);
    return makeResponse({ res, data: ticket, message: 'Ticket created successfully' });
};

export const getById = async (req, res) => {
    const ticket = await getTicketByIdService(req.params.id);
    return makeResponse({ res, data: ticket, message: 'Ticket retrieved succesfully' });
};

export const getAll = async (req, res) => {
    const tickets = await getAllTicketsService(req.query);
    return makeResponse({ res, data: tickets, message: 'Bus tickets retrieved succesfully' });
};