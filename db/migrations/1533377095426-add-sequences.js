'use strict';

const dbLoc = require('../../config')[process.env.ENVIRONMENT || 'test'].db;
const Database = require('../');

const path = require('path');
const readFile = require('fs-extra').readFile;

const up = path.join(__dirname, '..', 'sql', '1533377095426-add-sequences-up.sql')
const down = path.join(__dirname, '..', 'sql', '1533377095426-add-sequences-down.sql')

Database.connect(dbLoc);

exports.up = (next) => {
    readFile(up).then(sql => {
        Database
            .execute(sql.toString())
            .then(() => next())
            .catch((err) => { throw err; })
    })
}

exports.down = (next) => {
    readFile(down).then(sql => {
        Database
            .execute(sql.toString())
            .then(() => next())
            .catch((err) => { throw err; })
    })
}