const fs = require('fs-extra');
const sqlite3 = require('sqlite3').verbose();;
const config = require('../config');

Promise = require('bluebird');

class Database {
    constructor() {
        if (!Database.instance) {
            this._spatialite = process.env.SPATIALITE_LOCATION;
            this._dbLoc = config[process.env.ENVIRONMENT].db;
        }
        return Database.instance
    };
    get dbLoc () {
        return this._dbLoc;
    }
    get db () {
        return this._db;
    }
    connect() {
        try {
            const db = new sqlite3.Database(this._dbLoc);
            this._db = Promise.promisifyAll(db);
        } catch (error) {
            throw error;
        }
    }
    execute(sql) {
        return this._db
            .execAsync(sql)
            .then((result) => result)
            .catch((err) => { throw err; });
    }
    select(sql) {
        return this._db
            .allAsync(sql)
            .then((result) => result)
            .catch((err) => { throw err });
    }
    executeSpatial(sql) {
        return this._db
            .loadExtensionAsync(this._spatialite)
            .then((res) => this.execute(sql))
            .catch((err) => { throw err; });
    }
    selectSpatial(sql) {
        return this._db
            .loadExtensionAsync(this._spatialite)
            .then(() => this.select(sql))
            .catch((err) => { throw err; });
    }
};

const instance = new Database();
module.exports = instance;