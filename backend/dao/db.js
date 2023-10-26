"use strict";

const { Client } = require('pg');

const db = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'Office-Queue-Management-System',
    password: 'group15-postgres',
    port: 5432,
});

db.connect();

module.exports = db;