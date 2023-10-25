'use strict';

const db = require("./db");
const Handling = require("../model/Handling");

const mapObjToHandling = (handling) => {
    return new Handling(handling.counter_number, handling.service_id);
}


exports.getAllHandlings = async () => {

    try {
        let handlings = await db.query('SELECT * FROM handled');                 // it gets all services from the db
        return handlings.rows.map(h => mapObjToHandling(h));      // it maps each object obtained from the db to the service model
    } catch (err) {
        console.log(err);
        throw err;
    }

}