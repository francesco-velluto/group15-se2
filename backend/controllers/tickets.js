'use strict';

const ticketDao = require("../dao/ticketDao");
const serviceDao = require("../dao/serviceDao");
const handlingDao = require("../dao/handledDao");
const dayjs = require("dayjs");

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
        
        let ticketNumber = req.params.ticketNumber;


        if (ticketNumber == null)
            res.status(404).send('Ticket number is required');
        // TODO: implement get ticket details
        try {
            const exists = await ticketDao.controlTicketNumber(ticketNumber);
            if (!exists.exists)
                res.status(400).send('Ticket absent');

            const ticket = await ticketDao.getTicketDetails(ticketNumber);
            //waiting time estimation done by Ferraro Elia

            let estimated_waiting_time;

            if (ticket.status !== "waiting") {
                estimated_waiting_time = null;
            }
            else {
                const service = (await serviceDao.getAllServices()).find((s) => (s.id === ticket.service_id));

                const nr = (await ticketDao.getAllTickets()).filter((t) => (t.service_id == ticket.service_id && t.status === "waiting" && dayjs(t.date).isBefore(ticket.date))).length;

                const counter_handlings = await handlingDao.getAllHandlings();

                const filtered_handlings = counter_handlings.filter((h) => (counter_handlings.find((ch) => (ch.service_id === service.id && h.number === ch.number))));
                const handling_map = new Map();

                filtered_handlings.forEach((fh) => {
                    if (handling_map.has(fh.number)) {
                        handling_map.set(fh.number, handling_map.get(fh.number) + 1);
                    }
                    else {
                        handling_map.set(fh.number, 1);
                    }
                })

                let sum = 0.0;
                for (const fh of handling_map.values()) {
                    sum += 1 / fh;
                }
                estimated_waiting_time = service.service_time * ((nr) / (sum) + 0.5); //this is the final estimated time to be included the the response data
            }
            ticket.estimated_waiting_time = estimated_waiting_time? estimated_waiting_time : 0;
            res.json(ticket);

        } catch (err) {
            res.status(500).json({ error: err });
        }
        // TODO: use the relative Ticket model

        // testing db connection done by Magliari Elio
        //const tickets = await ticketDao.getAllTickets();
        //console.log(tickets);






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
        if (serviceId == null)
            return res.status(400).send('serviceId is required')

        if (serviceId < 0 || serviceId > 7)
            return res.status(404).send('Invalid serviceId')
        // TODO: implement new ticket
        try {
            const last_id = await ticketDao.getLastTicketNumberByService();
            const new_number = last_id + 1;
            await ticketDao.insertTicket(serviceId, new_number);

            res.json(new_number);

        } catch (err) {
            res.status(500).json({ error: err });
        }
        // TODO: use the relative Ticket model

    }

}