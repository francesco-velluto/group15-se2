import { getAllAvailableServices, getTicketDetails, createNewTicket } from '../src/api/BackendInterface'; 

describe('getAllAvailableServices function', () => {
  it('should fetch all available services', async () => {
    const mockResolvedValue = {
      services: [
        {
          id: 2,
          service_time: 0,
          tag_name: "Postal Stamps",
        },
        {
          id: 3,
          service_time: 0,
          tag_name: "Money Orders",
        },
      ],
    };

    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResolvedValue),})
    );

    const services = await getAllAvailableServices();
    expect(services).toEqual(mockResolvedValue.services);

    global.fetch.mockRestore();
  });

  it('should handle errors ', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: false,
        text: () => Promise.resolve('Errooooor'),
        status: 404,
        statusText: 'Not Found',
      })
    );

    await expect(getAllAvailableServices()).rejects.toThrowError('Not Found Errooooor');

    global.fetch.mockRestore();
  });
});




describe('getTicketDetails function', () => {
  it('should fetch the ticket details', async () => {
    const tickeNumber = 1
    const mockResolvedValue = {number: tickeNumber, status: 1, service_id: 1, date: undefined, counter_number: 10};

    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResolvedValue),
      })
    );

    expect(await getTicketDetails(tickeNumber)).toEqual(mockResolvedValue);

    global.fetch.mockRestore();
  });

  it('should handle errors', async () => {
    const tickeNumber = 1;

    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: false,
        text: () => Promise.resolve('Errooooor'),
        status: 404,
        statusText: 'Not Found',
      })
    );

    await expect(getTicketDetails(tickeNumber)).rejects.toThrowError('Not Found Errooooor');

    global.fetch.mockRestore();
  });

  it('should propagate errors ', async () => {
    const tickeNumber = 1;

    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.reject(new Error('Errooooor'))
    );

    await expect(getTicketDetails(tickeNumber)).rejects.toThrowError('Errooooor');

    global.fetch.mockRestore();
  });
});




describe('createNewTicket function', () => {
  it('should create a new ticket', async () => {
    const mockServiceId = 2;
    const mockResolvedValue = {number: 1, status: 1, service_id: mockServiceId, date: undefined, counter_number: 10};

    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResolvedValue),
      })
    );

    const ticket = await createNewTicket(mockServiceId);
    expect(ticket).toEqual(mockResolvedValue);

    global.fetch.mockRestore();
  });

  it('should handle errors correctly', async () => {
    const mockServiceId = 2;

    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: false,
        text: () => Promise.resolve('Erroooooooor'),
        status: 404,
        statusText: 'Not Found',
      })
    );

    await expect(createNewTicket(mockServiceId)).rejects.toThrowError('Not Found Erroooooooor');

    global.fetch.mockRestore();
  });

  it('should propagate errors ', async () => {
    const mockServiceId = 2;

    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.reject(new Error('Erroooooooor'))
    );

    await expect(createNewTicket(mockServiceId)).rejects.toThrowError('Erroooooooor');

    global.fetch.mockRestore();
  });
});


