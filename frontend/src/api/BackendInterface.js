import { json } from "react-router-dom";

const APIUrl = 'http://localhost:8080/api';

export const getTicketDetails = (ticketId) => {
    return fetch(`${APIUrl}/tickets/${ticketId}`)
}

export const getAllAvailableServices = async () => {
    try {
        const response = await fetch(`${APIUrl}/services`);

        if (response.ok) {
            const { services } = await response.json();
            return services;
        } else {
            const errMessage = await response.text();
            throw new Error(response.statusText + " " + errMessage);
        }
    } catch (err) {
        throw new Error(err); // propagate error 
    }
}

export const createNewTicket = async (serviceId) => {
    
    try {
        const response = await fetch(`${APIUrl}/tickets`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({serviceId: serviceId}),
        });
        if (response.ok) {
            const ticket = await response.json();
            
            return ticket;
        } else {
            const errMessage = await response.text();
            throw new Error(response.statusText + " " + errMessage);
        }
    } catch (err) {
        throw new Error(err); // propagate error
    }
    return 
}