'use strict';

module.exports = {
    test: {
        db: './db/test-posm-paths.sqlite3',
        host: 'localhost',
        injectDefaults: { simulate: { error: false }}
    },
    develop: {
        db: './db/posm-paths.sqlite3',
        host: 'localhost',
        injectDefaults: { simulate: { error: false }}
    }
}