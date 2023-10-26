const dao = require('../dao/serviceDao');
const db = require('../dao/db');
const Service = require('../model/Service');

jest.mock('../dao/db', () => ({
    query: jest.fn()
}));

beforeEach(()=>{
    jest.resetAllMocks()
})

describe('getAllServices function', () => {
    it('should return all services from db', async () => {
        db.query.mockResolvedValue({ 
            rows: [
                { id: 1, tag_name: 'tag1', service_time: 10},
                { id: 2, tag_name: 'tag2', service_time: 15},
                { id: 3, tag_name: 'tag3', service_time: 20},  ]
        });
        const expectedService = [
            new Service(1, 'tag1', 10),
            new Service(2, 'tag2', 15),
            new Service(3, 'tag3', 20), ];
        expect(await dao.getAllServices()).toEqual(expectedService);
        expect(db.query).toHaveBeenCalledTimes(1);
    });

    it('should handle errror ', async () => {
        db.query.mockRejectedValue('erroooor');
        try {
            await dao.getAllServices();
        } catch (err) {
            expect(err).toEqual('erroooor');
        }
    });
});