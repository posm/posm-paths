'use strict';

module.exports = {
    test: {
        db: ':memory:'
    },
    development: {
        db: './db/posm-paths.sql'
    }
}