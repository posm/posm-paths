'use strict'

const fs = require('fs');
const path = require('path');
const upSQL = fs.readFileSync(path.join(__dirname, '1533377087768-add-images-up.sql')).toString();
const downSQL = fs.readFileSync(path.join(__dirname, '1533377087768-add-images-up.sql')).toString();
const dbLoc = require('../config')[process.env.ENVIRONMENT || 'develop'].db;
const Database = require('../db');
Database.connect(dbLoc);

module.exports.up = function (next) {
  Database.execute(upSQL)
  .then(() => next())
  .catch(error => { console.error(error); next(); })
}

module.exports.down = function (next) {
  Database.execute(downSQL)
  .then(() => next())
  .catch(error => { console.error(error); next(); });
}
