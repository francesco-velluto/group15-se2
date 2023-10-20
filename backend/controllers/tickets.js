module.exports = {
    /**
     * Get ticket details by ticket number
     *
     * @params: ticketNumber
     * @body: none
     * @returns: { ticketNumber: string, service: string, status: string, estimatedTime: date }
     * @error: 404 - if ticketNumber doesn't exist
     * @error: 500 - internal server error if something went wrong
     */
    getTicketDetails: (req, res) => {
        // TODO: implement get ticket details
    },

    /**
     * Create a new ticket for a service request
     *
     * @params: none
     * @body: { serviceId: number }
     * @returns: { ticketNumber: string }
     * @error: 404 - not found if serviceId is not valid
     * @error: 500 - internal server error if something went wrong
     */
    newTicket: (req, res) => {
        // TODO: implement new ticket
    }
}