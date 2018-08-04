'use strict';

Promise = require('bluebird');

const expect = require('chai').expect;
const migrate = Promise.promisifyAll(require('migrate'));
const path = require('path');
const migrationsPath = path.join(__dirname, '..', 'db', 'migrations');
const migrationStore = path.join(migrationsPath, '.migrate');
const migrationOpts = { migrationsDirectory: migrationsPath,  stateStore: migrationStore };

describe('migrations', () => {
    it('migrates db up and back down', () => {
        migrate.loadAsync(migrationOpts)
            .then((set) => { 
                set = Promise.promisifyAll(set);
                set.upAsync().then(() => set.downAsync())
            })
            .catch((err) => console.error(err));
    });
});
 