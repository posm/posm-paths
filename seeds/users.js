'use strict';

const users = require('../testData/seeds').users;
const uuidv4 = require('uuid/v4');
const dbLoc = require('../config').test.db;
const Database = require('../db');

Database.connect(dbLoc);

module.exports = (next) => {
    const values =  users.map(user => `(${uuidv4()}, ${user.name})`).join(',');
    const sql = `INSERT INTO Users VALUES ${values};`;
    Database.execute(sql)
    .then(() => next())
    .catch(() => { console.error(error); next(); });
}