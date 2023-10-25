'use strict';

const ticketDao = require("../dao/ticketDao");
const serviceDao = require("../dao/serviceDao");
const handlingDao = require("../dao/handledDao");

const getWaitTimeEstimation = async (ticketNumber) => {

    if(!ticketNumber){
        return null;
    }

    const tickets = await ticketDao.getAllTickets();

    const ticket = tickets.find((t) => (t.number === ticketNumber))

    if(!ticket){
        return null;
    }

    if(ticket.status !== "waiting"){

        return null;

    }
    else{
        const service = (await serviceDao.getAllServices()).find((s) => (s.id === ticket.service));

        const nr = tickets.filter((t) => (t.service == ticket.service && t.status === "waiting")).length;

        const counter_handlings = await handlingDao.getAllHandlings();

        const filtered_handlings = counter_handlings.filter((h) => (counter_handlings.find((ch) => (ch.service_id === service.id && h.number === ch.number))));
        
        const handling_map = new Map();

        filtered_handlings.forEach((fh) => {
            if(handling_map.has(fh.number)){
                handling_map.set(fh.number, handling_map.get(fh.number) + 1);
            }
            else{
                handling_map.set(fh.number, 1);
            }
        })

        let sum = 0.0;

        
        for (const fh of handling_map.values()) {
            sum += 1 / fh;
        }

        return service.service_time * ((nr)/(sum) + 0.5); //estimated waiting time
    }
}

module.exports = {
    /**
     * Get ticket details by ticket number
     *
     * @params: ticketNumber
     * @body: none
     * @returns: { ticketNumber: string, service: string, status: string, estimatedTime: number }
     * @error: 404 - if ticketNumber doesn't exist
     * @error: 500 - internal server error if something went wrong
     */
    getTicketDetails: async (req, res) => {
        //let ticketNumber = req.params.ticketNumber;

        // TODO: implement get ticket details

        // TODO: use the relative Ticket model
        
        // testing db connection done by Magliari Elio
        const tickets = await ticketDao.getAllTickets();

        console.log(tickets);

        const estimated_waiting_time = getWaitTimeEstimation(req.params.ticketNumber); // waiting time estimation for the single ticket


        //waiting time estimation done by Ferraro Elia

        

        

    },

    /**
     * Create a new ticket for a service request
     *
     * @params: none
     * @body: { serviceId: number }
     * @returns: { ticketNumber: string }
     * @error: 400 - bad request if serviceId is not present
     * @error: 404 - not found if serviceId is not valid
     * @error: 500 - internal server error if something went wrong
     */
    newTicket: async (req, res) => {
        let serviceId = req.body.serviceId;
        if(!serviceId)
            return res.status(400).send('serviceId is required')

        // TODO: implement new ticket

        // TODO: use the relative Ticket model

    }
}