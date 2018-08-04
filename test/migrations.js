'use strict';

const expect = require('chai').expect;
const migrate = require('migrate');

const path = require('path');
const migrationsPath = path.join(process.cwd(), 'migrations');
const migrationStore = path.join(migrationsPath, '.migrate');
const migrationOpts = { migrationsDirectory: migrationsPath, stateStore: migrationStore };

describe('migrations', () => {
    it('migrates db up and back down', () => {
        migrate.load(migrationOpts, (err, set) => {
            if (err) throw err
            console.log(set);
            set.up((err, res) => {
                if (err) throw err;
                set.down((err, res) => { if (err) throw err; })
            });
        });
    });
}); 