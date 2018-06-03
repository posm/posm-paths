const path = require('path'),
      config = require('./config')[process.env.NODE_ENV || 'development'],
      dbPath = path.join(__dirname, 'db'),
      dbFile = path.join(dbPath, config.db);

// get some super secrets from .env file.
// here, just the MAPILLARY_CLIENT goodness.
// see this readme -> https://github.com/motdotla/dotenv
require('dotenv').config();

module.exports = {
    development: {
        client: 'sqlite3',
        connection: { filename: dbFile },
        useNullAsDefault: true,
        mapillaryClient: process.env.MAPILLARY_CLIENT
    }
}