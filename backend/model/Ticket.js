'use strict';

const statusEnum = {
    0: "waiting",
    1: "being served",
    2: "served"
}


/**
 * Ticket model
 */
module.exports = function Ticket(id = -1, status = 0, service = undefined) {
    this.number = id;
    this.service = service;

    if(status < 0 || status > 2) {
        status = 0;
    }

    this.status = statusEnum[status];
};
