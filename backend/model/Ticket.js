'use strict';

const statusEnum = {
    0: "waiting",
    1: "being served",
    2: "served"
}


/**
 * Ticket model
 */
module.exports = function Ticket(number = -1, status = 0, date = undefined, service = undefined, counter_number = undefined) {
    this.number = number;
    this.service = service;
    this.date = date;
    this.counter_number = counter_number;

    if(status < 0 || status > 2) {
        status = 0;
    }

    this.status = statusEnum[status];
};
