const dao = require('../dao/ticketDao');
const db = require('../dao/db');
const Ticket = require('../model/Ticket');

jest.mock('../dao/db', () => ({
    query: jest.fn()
}));

describe('getAllTickets function', () => {
    it('should return all tickets from db', async () => {
        db.query.mockResolvedValue({ 
            rows: [
                { number: 1, status: 1, service_id: 1, date: undefined, counter_number: 10},
                { number: 2, status: 0, service_id: 2, date: undefined, counter_number: 11 },
                { number: 3, status: 2, service_id: 3, date: undefined, counter_number: 12 },
                { number: 4, status: 1, service_id: 3, date: undefined, counter_number: 13 }
            ]
        });
        const expectedTickets = [
            new Ticket(1, 1, date = undefined, 1, 10),
            new Ticket(2, 0, date = undefined,2, 11),
            new Ticket(3, 2, date = undefined,3, 12),
            new Ticket(4, 1, date = undefined,3, 13)
        ];
        expect(await dao.getAllTickets()).toEqual(expectedTickets);
        expect(db.query).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if db query fails', async () => {
        db.query.mockRejectedValue('erroooor');
        try {
            await dao.getAllTickets();
        } catch (err) {
            expect(err).toEqual('erroooor');
        }
    });
});
