'use strict';

const ticketDao = require("../dao/ticketDao");

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
        debugger;
        let serviceId = req.body.serviceId;
        if (!serviceId)
            return res.status(400).send('serviceId is required')

        if (serviceId<0 || serviceId>7)
            return res.status(404).send('Invalid serviceId')
        // TODO: implement new ticket
        try {
            const last_id = await ticketDao.getLastTicketNumberByService(serviceId);
            const new_number = last_id +1;
            let newRow = await ticketDao.insertTicket(serviceId, new_number);

            console.log(new_number);


            res.json(new_number);
            
        }catch (err) {
            res.status(500).json({ error: err });
        } 
        // TODO: use the relative Ticket model

    }

}