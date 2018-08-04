'use strict'

const fs = require('fs');
const path = require('path');
const upSQL = fs.readFileSync(path.join(__dirname, '..', 'sql', '1533377102405-add-images-up.sql')).toString();
const downSQL = fs.readFileSync(path.join(__dirname, '..', 'sql', '1533377102405-add-images-down.sql')).toString();

const dbLoc = require('../../config')[process.env.ENVIRONMENT || 'develop'].db;
const Database = require('../');
Database.connect(dbLoc);

module.exports.up = function (next) {
  Database.executeSpatial(upSQL)
  .then(() => next())
  .catch(error => { console.error(error); next(); })
}

module.exports.down = function (next) {
  Database.executeSpatial(downSQL)
  .then(() => next())
  .catch(error => { console.error(error); next(); });
}
