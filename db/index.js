'use strict';

const sqlite3 = require('sqlite3').verbose();;
const uuidv4  = require('uuid/v4');

Promise = require('bluebird');

class Database {
    constructor() {
        if (!Database.instance) {
            this._spatialite = process.env.SPATIALITE_LOCATION + '/mod_spatialite';
        }
        return Database.instance
    };
    get dbLoc () {
        return this._dbLoc;
    }
    get db () {
        return this._db;
    }
    connect(dbLoc) {
        try {
            const db = new sqlite3.Database(dbLoc);
            this._dbLoc = dbLoc;
            this._db = Promise.promisifyAll(db);
        } catch (error) {
            throw error;
        }
    }
    close() {
        this._db.close();
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
    addUsers(...users) {
        users = users.map(user => `('${uuidv4()}', '${user}')`).join(',')
        const sql =  `INSERT INTO Users VALUES ${users};`
        return this
            .execute(sql)
            .then((result) => result)
            .catch((err) => { throw err; });

    }
    addImages(userId, sequenceId, images) {
        images = images.map((image, index) => {
            return `(
                '${image.id}',
                '${image.image}',
                '${image.timestamp}',
                '${index}',
                '${sequenceId}',
                '${userId}',
                GeomFromText('POINT(${image.loc.lat} ${image.loc.lon})', 4326)
            )`
        }).join(',');
        const sql = `INSERT INTO Images VALUES ${images}`;
        return this
            .executeSpatial(sql)
            .then((result) => result)
            .catch((err) => { throw err; })
    }
    addSequence(sequence) {
        const values = `(
            '${uuidv4()}',
            '${userId}',
            
        )`;
        const sql = `INSERT INTO Sequences VALUES ${values};`;
        return this
            .execute(sql)
            .then((result) => result)
            .catch((err) => { throw err; })
    }
};

const instance = new Database();
module.exports = instance;