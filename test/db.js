'use strict';

const expect = require('chai').expect;
const Database = require('../db');
const readFile = require('fs-extra').readFile;
const gjv = require('geojson-validation');
const Joi = require('joi');
const uuidv4 = require('uuid/v4');

const uuidSchema = require('../schema/uuid');

const danbjospeh = require('../db/seeds/users')[0];
const config = require('../config');
const dbLoc = config[process.env.ENVIRONMENT || 'test'].db

Promise = require('bluebird');

describe('db', () => {
    describe('#connect', () => {
        it('connects to the db at the provided path', async () => {
            Database.connect(dbLoc);
            expect(Database.dbLoc).to.eql(dbLoc);
        });
    });
    // describe('#execute', () => {
    //     // fat stacks https://stackoverflow.com/questions/7739444/declare-variable-in-sqlite-and-use-it
    //     it('executes provided SQL statements', () => {
    //         const sql = `
    //             CREATE TEMP TABLE IF NOT EXISTS Surfing (Name Text PRIMARY KEY, Value TEXT);
    //             INSERT INTO Surfing VALUES ('Surfing', 'IsGreat');
    //         `;
    //         Database
    //             .execute(sql)
    //             .then(() => Database.select('SELECT * FROM SURFING'))
    //             .then((result) => expect(result).to.eql([ { Name: 'Surfing', Value: 'IsGreat' } ]))
    //             .catch((err) => { throw err; }) 
    //     })
    //     it('throws if provided SQL statements are invalid', () => {
    //         const sql = `
    //             INSERT INTO iDontExist VALUES ('enter', 'the', 'void');
    //         `;

    //         Database
    //             .execute(sql)
    //             .catch((err) => expect(err).instanceOf(Error));
    //     })
    // });
    // describe('#select', () => {
    //     it('returns list of rows selected by statement', () => {
    //         Database
    //             .select('SELECT * FROM SURFING')
    //             .then((result) => expect(result).to.eql([ { Name: 'Surfing', Value: 'IsGreat' } ]));
    //     })
    //     it('throws if provided select statement is invalid', () => {
    //         Database
    //             .select('SELECT * FROM iDontExist')
    //             .catch((err) => expect(err).to.be.instanceOf(Error));
    //     })
    // })
    // describe('#executeSpatial', () => {
    //     // stack exchange! -> https://gis.stackexchange.com/questions/184850/how-to-use-spatialite-functions-in-a-python-script
    //     it('loads mod_spatialite and executes sqlite', () => {
    //         const line = 'LINESTRING(45.554194 -122.686101, 45.433001 -122.762632)';
    //         const sql = `
    //             CREATE TABLE my_line(id INTEGER PRIMARY KEY);
    //             SELECT AddGeometryColumn("my_line","geom" , 4326, "LINESTRING", 2);
    //             INSERT INTO my_line VALUES (1, GeomFromText('${line}', 4326));
    //         `
    //         const selectLine = 'SELECT AsGeoJSON(geom) FROM my_line;'
    //         Database
    //             .executeSpatial(sql)
    //             .then(() => Database.selectSpatial(selectLine))
    //             .then((rows) => {
    //                 const geojson = JSON.parse(rows[0]['AsGeoJSON(geom)']);
    //                 expect(gjv.isLineString(geojson)).to.be.true;
    //             });
    //     });
    //     it('throws an error if invalid sql provided', () => {
    //         const badSql = 'SELECT AddGeometryColumn("not_my_line","geom" , 4326, "LINESTRING", 2);'
    //         Database
    //             .executeSpatial(badSql)
    //             .catch((err) => expect(err).to.be.instanceof(Error));
    //     });
    // });
    // describe('#selectSpatial', () => {
    //     it('loads mod_spatialite and executes select statement', () => {
    //         Database
    //             .selectSpatial('SELECT AsGeoJSON(geom) FROM my_line')
    //             .then((rows) => {
    //                 const geojson = JSON.parse(rows[0]['AsGeoJSON(geom)']);
    //                 expect(gjv.isLineString(geojson)).to.be.true;
    //             });
    //     })
    //     it('throw an error if invalid select statement provided', () => {
    //         Database
    //             .selectSpatial('SELECT AsGeoJSON(geometry) FROM my_line')
    //             .catch((err) => expect(err).to.be.instanceOf(Error));

    //     });
    // })
    // describe('#addUsers', () => {
    //     it ('inserts rows for provided users into database', () => {
    //         const messi = 'transucentmessi';
    //         return Database
    //             .addUsers(messi)
    //             .then(() => Database.select(`SELECT * FROM Users WHERE name='${messi}';`))
    //             .then((user) => {
    //                 expect(user[0].name).to.eql(messi);
    //                 expect(Joi.validate(user[0].id, uuidSchema).error).to.be.null;
    //             })
    //             .catch((err) => { throw err; });
    //     })
    // });
    // describe('#addImages', () => {
    //     const images = [...Array(5).keys()].map((index) => {
    //         return {
    //             id: uuidv4(),
    //             image: '.',
    //             timestamp: (new Date()).toISOString(),
    //             index: index,
    //             loc: {
    //                 lat: Math.floor(Math.random() * Math.floor(10)),
    //                 lon: Math.floor(Math.random() * Math.floor(10))
    //             }
    //         }
    //     });
    //     it('inserts images into database', () => {
    //         return Database
    //             .addImages(danbjospeh.id, uuidv4(), images)
    //             .catch((err) => { throw err; })
    //     });
    //     it('throw error if sql is incorrect', () => {
    //         return Database
    //             .addImages(uuidv4(), uuidv4(), images)
    //             .catch(err => { expect(err).to.be.instanceOf(Error); });
            
    //     })
    // });
    describe('#getSequence', () => {
        it('returns sequence as GeoJSON', () => {
            return Database
                .getSequence('8a29f8e9-3431-41d5-92e8-ef6e3f54389f')
        })
    })
})

