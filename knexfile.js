const path = require('path'),
      dbPath = path.join(process.cwd(), 'db'),
      dbFile = path.join(dbPath, 'posmview.db'),

const def = {
    client: 'sqlite3',
    connection: { filename: dbFile},
    useNullAsDefault: true
}

module.exports = {
    development: def,
    staging: def,
    production: def
}