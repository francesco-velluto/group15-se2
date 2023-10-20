const express = require('express');
const router = express.Router();

const { getAvailableServices } = require('../controllers/services');
const { getTicketDetails, newTicket } = require('../controllers/tickets');

/**
 * Get all available services
 *
 * GET /api/services
 * @params: none
 * @body: none
 * @returns: { services: [ { id: number, name: string } ] }
 * @error: 500 - internal server error if something went wrong
 */
router.get('/services', getAvailableServices);

/**
 * Create a new ticket for a service request
 *
 * POST /api/tickets
 * @params: none
 * @body: { serviceId: number }
 * @returns: { ticketNumber: string }
 * @error: 404 - not found if serviceId is not valid
 * @error: 500 - internal server error if something went wrong
 */
router.post('/tickets', newTicket);
/**
 * Get ticket details by ticket number
 *
 * GET /api/tickets/:ticketNumber
 * @params: ticketNumber
 * @body: none
 * @returns: { ticketNumber: string, service: string, status: string, estimatedTime: date }
 * @error: 404 - if ticketNumber doesn't exist
 * @error: 500 - internal server error if something went wrong
 */
router.get('/tickets/:ticketNumber', getTicketDetails);