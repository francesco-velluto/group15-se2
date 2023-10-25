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
                { number: 1, status: 1, service_id: 1 },
                { number: 2, status: 0, service_id: 2 },
                { number: 3, status: 2, service_id: 3 },
                { number: 4, status: 1, service_id: 3 }
            ]
        });
        const expectedTickets = [
            new Ticket(1, 1, 1),
            new Ticket(2, 0, 2),
            new Ticket(3, 2, 3),
            new Ticket(4, 1, 3)
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
