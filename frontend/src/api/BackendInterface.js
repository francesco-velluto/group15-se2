const APIUrl = 'http://localhost:5000/api';

export const getTicketDetails = (ticketId) => {
    return fetch(`${APIUrl}/tickets/${ticketId}`)
}

export const getAllAvailableServices = () => {
    return fetch(`${APIUrl}/services`)
}

export const createNewTicket = (serviceId) => {
    return fetch(`${APIUrl}/tickets`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(serviceId),
    })
}