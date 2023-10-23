"use strict";

const db = require("../dao/db");
const serviceDao = require("../dao/serviceDao");

module.exports = {

    /**
     * Get all available services
     *
     * @params: none
     * @body: none
     * @returns: { services: [ { id: number, name: string } ] }
     * @error: 500 - internal server error if something went wrong
     */
    getAvailableServices: async (req, res) => {
        // TODO: implement get all available services

        // TODO: use the relative Service model

        try {
            const services = await serviceDao.getAllServices();
            res.json({ services });
        } catch (err) {
            res.status(500).json({ error: err });
        }        
    }
}
