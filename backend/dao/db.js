"use strict";

const { Client } = require('pg');

const db = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'Office-Queue-Management-System',
    password: 'postgres',
    port: 5432,
});

db.connect();

module.exports = db;