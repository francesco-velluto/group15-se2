const dao = require('../dao/ticketDao');
const db = require('../dao/db');
const Ticket = require('../model/Ticket');

jest.mock('../dao/db', () => ({
    query: jest.fn()
}));

beforeEach(()=>{
    jest.resetAllMocks()
})

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

    it('should handle errror ', async () => {
        db.query.mockRejectedValue('erroooor');
        try {
            await dao.getAllTickets();
        } catch (err) {
            expect(err).toEqual('erroooor');
        }
    });
});





describe('getLastTicketNumberByService function', () => {
    it('should return 0 if no tickets exist', async () => {
        db.query.mockResolvedValue({ rows: [{ max: null }] });
        expect(await dao.getLastTicketNumberByService()).toBe(0);
      });
    
      it('should return the maximum ticket number', async () => {
        db.query.mockResolvedValueOnce({ rows: [{ max: 5 }] });
    
        expect(await dao.getLastTicketNumberByService()).toBe(5);
      });

    it('should handle error', async () => {
        db.query.mockRejectedValue('erroooor');
        try {
            await dao.getLastTicketNumberByService();
        } catch (err) {
            expect(err).toEqual('erroooor');
        }
    });
});




  

  describe('getTicketDetails function', () => {
    it('should return ticket details', async () => {
        db.query.mockResolvedValue({ 
            rows: [{ number: 1, status: 1, service_id: 1, date: undefined, counter_number: 10} ]});
        const expectedTicket = [
            new Ticket(1, 1, date = undefined, 1, 10)];
        expect(await dao.getAllTickets()).toEqual(expectedTicket);
        expect(db.query).toHaveBeenCalledTimes(1);
    });

    it('should handle errror ', async () => {
        db.query.mockRejectedValue('erroooor');
        try {
            await dao.getAllTickets();
        } catch (err) {
            expect(err).toEqual('erroooor');
        }
    });
});






describe('controlTicketNumber function', () => {
    it('should return exists: false a ticket with the given number does not exist', async () => {
      const mockTicketNumber = 1;
      db.query.mockResolvedValueOnce( {rows: [{ count: 0 }] });
  
      const result = await dao.controlTicketNumber(mockTicketNumber);
      expect(result.exists).toBe(false);
    });
  
    it('should return exists: true if tickets with the given number exist', async () => {
      const mockTicketNumber = 1;
      db.query.mockResolvedValueOnce({ rows: [{ count: 1 }] });
  
      const result = await dao.controlTicketNumber(mockTicketNumber);
      expect(result.exists).toBe(true);
    });
  
    it('should handle errror ', async () => {
        db.query.mockRejectedValue('erroooor');
        try {
            await dao.controlTicketNumber();
        } catch (err) {
            expect(err).toEqual('erroooor');
        }
    });
  });
  