'use strict';


/**
 * Service model
 */
module.exports = function Service(id = -1, tag_name = '', service_time = 0) {
    this.id = id;
    this.tag_name = tag_name;
    this.service_time = service_time;
};
