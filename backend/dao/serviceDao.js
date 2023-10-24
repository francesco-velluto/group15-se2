'use strict';

const db = require("./db");
const Service = require("../model/Service");

const mapObjToService = (service) => {
    return new Service(service.id, service.tag_name);
}


/**
 * Get all services from the system
 */
exports.getAllServices = async () => {
    try {
        let services = await db.query('SELECT * FROM service');                 // it gets all services from the db
        return services.rows.map(service => mapObjToService(service));      // it maps each object obtained from the db to the service model
    } catch (err) {
        console.log(err);
        throw err;
    }
}

