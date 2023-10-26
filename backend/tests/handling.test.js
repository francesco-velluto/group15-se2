const dao = require('../dao/handledDao');
const db = require('../dao/db');
const Handling = require('../model/Handling');

jest.mock('../dao/db', () => ({
    query: jest.fn()
}));

beforeEach(()=>{
    jest.resetAllMocks()
})

describe('getAllHandling function', () => {
    it('should return all handling from db', async () => {
        db.query.mockResolvedValue({ 
            rows: [
                { counter_number: 1, service_id: 0},
                { counter_number: 2, service_id: 1},
                { counter_number: 3, service_id: 2},  ]
        });
        const expectedHandling = [
            new Handling(1, 0),
            new Handling(2, 1),
            new Handling(3, 2), ];
        expect(await dao.getAllHandlings()).toEqual(expectedHandling);
        expect(db.query).toHaveBeenCalledTimes(1);
    });

    it('should handle errror ', async () => {
        db.query.mockRejectedValue('erroooor');
        try {
            await dao.getAllHandlings();
        } catch (err) {
            expect(err).toEqual('erroooor');
        }
    });
});