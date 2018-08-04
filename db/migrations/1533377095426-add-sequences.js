'use strict'

const fs = require('fs');
const path = require('path');
const upSQL = fs.readFileSync(path.join(__dirname, '..', 'sql', '1533377095426-add-sequences-up.sql')).toString();
const downSQL = fs.readFileSync(path.join(__dirname, '..', 'sql', '1533377095426-add-sequences-down.sql')).toString();

const dbLoc = require('../../config')[process.env.ENVIRONMENT || 'develop'].db;
const Database = require('../');
Database.connect(dbLoc);

module.exports.up = function (next) {
  Database.execute(upSQL)
  .then(() => next())
  .catch(error => { console.error(error); next(); })
}

module.exports.down = function (next) {
  Database.execute(downSQL)
  .then(() => next())
  .catch(error => { console.error(error); next(); })
}
