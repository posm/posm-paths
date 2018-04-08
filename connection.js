'use strict';

const connection = require('./knexfile')[process.env.NODE_ENV || 'develop'];
module.exports = require('knex')(connection)