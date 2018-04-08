const path = require('path'),
      dbPath = path.join(process.cwd(), 'db'),
      dbFile = path.join(dbPath, 'posmview.sqlite'),
      migrationsPath = path.join(dbPath, 'migrations');

const def = {
    migrations: { directory: migrationsPath, tableName: 'knex_migrations' },
    client: 'sqlite3',
    connection: { filename: dbFile},
    useNullAsDefault: true
}

module.exports = {
    development: def,
    staging: def,
    production: def
}