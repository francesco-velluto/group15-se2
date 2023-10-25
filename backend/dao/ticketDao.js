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

/**
 * Get the last ticket number related to a service
 */
exports.getLastTicketNumberByService = async(service)=>{
    try{
        let r = await db.query('SELECT MAX(number) from ticket WHERE service_id = $1', [service]);
        if (r.rows[0].max == null)
            return 0;
        else return r.rows[0].max;
    }catch(err){
        console.log(err);
        throw err;
    }
}

/**
 * Insert a new ticket in the table
 */
exports.insertTicket = async(service, num)=>{
    try{
        const timestamp = new Date();
        let r = await db.query('INSERT INTO ticket (number, service_id, status, date, counter_number) VALUES ($1, $2, 0, $3, 1);', [num, service, timestamp]);
        return ({tickeNumber: num});
    }catch(err){
        console.log(err);
        throw err;
    }
}