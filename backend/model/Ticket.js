'use strict';

const statusEnum = {
    0: "waiting",
    1: "being served",
    2: "served"
}


/**
 * Ticket model
 */
module.exports = function Ticket(number = -1, status = 0, date = undefined, service_id = undefined, service_tag = undefined, counter_number = undefined) {
    this.number = number;
    this.service_id = service_id;
    this.service_tag = service_tag;
    this.date = date;
    this.counter_number = counter_number;

    if(status < 0 || status > 2) {
        status = 0;
    }

    this.status = statusEnum[status];
};
