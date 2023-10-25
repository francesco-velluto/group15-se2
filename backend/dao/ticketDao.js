'use strict';

const db = require("./db");
const Ticket = require("../model/Ticket");

const mapObjToTickets = (ticket) => {
    const service = ticket.service_id;                  // it should be converted to a service model calling his dao and getting all his information by id
    return new Ticket(ticket.number, ticket.status, ticket.date, service, ticket.counter_number ?? undefined);
}


/**
 * Get all tickets from the system
 */
exports.getAllTickets = async () => {
    try {
        let tickets = await db.query('SELECT * FROM ticket');           // it gets all tickets from the db
        return tickets.rows.map(ticket => mapObjToTickets(ticket));     // it maps each object obtained from the db to the ticket model
    } catch (err) {
        console.log(err);
        throw err;
    }
}