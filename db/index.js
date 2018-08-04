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
            Promise.promisifyAll(db);
            this._db = db;
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
            .then(() => this.execute(sql))
            .catch((err) => { throw err; })
    }
    // async addImage() {
    //     try {

    //     } catch (error) {
    //         throw new Error(error);
    //     }
    // }
    // async addSequence() {
    //     try {

    //     } catch (error) {
    //         throw new Error(error);
    //     }
    // }
    // async addUser() {
    //     try {

    //     } catch (error) {
    //         throw new Error(error);
    //     }
    // }
    // async getUser()  {
    //     try {

    //     } catch (error) {
    //         throw new Error(error);
    //     }
    // }
    // async getImage()  {
    //     try {

    //     } catch (error) {
    //         throw new Error(error);
    //     }
    // }
    // async getSequence()  {
    //     try {

    //     } catch (error) {
    //         throw new Error(error);
    //     }
    // }
};

const instance = new Database();
module.exports = instance;