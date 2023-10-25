const ticketDao = require('../dao/ticketDao');
const serviceDao = require('../dao/serviceDao');
const db = require('../dao/db');
const Ticket = require('../model/Ticket');
const { getTicketDetails } = require('../controllers/tickets');
const { getAvailableServices } = require('../controllers/services');

jest.mock('../dao/db');

test('Should return a ticket given its number 1', async()=>{
    const ticket = await getTicketDetails(1);

    expect(ticket.number).toBe(1);
    expect(ticket.status).toBe("being served");
    expect(ticket.service).not.toBe(2);
    expect(ticket.service).toBe(0);
    expect(ticket.counter_number).toBe(1);

});

test('Should return all services in the office', async()=>{
    const services = await getAvailableServices();

    expect(services).toHaveLength(8);
    expect(services).not.toBeNull();
    expect(services).toContainEqual({id: 3, tag_name: "Money Orders", service_time: 25});

});