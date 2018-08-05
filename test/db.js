'use strict';

const expect = require('chai').expect;
const Database = require('../db');
const fs = require('fs-extra');
const gjv = require('geojson-validation');

Promise = require('bluebird');

describe('db', () => {
    describe('#connect', () => {
        it('connects to the db at the provided path', async () => {
            const dbLoc = require('../config').test.db;
            Database.connect(dbLoc);
            expect(Database.dbLoc).to.eql('./db/test-posm-paths.sqlite3');
        });
    });
    describe('#execute', () => {
        // fat stacks https://stackoverflow.com/questions/7739444/declare-variable-in-sqlite-and-use-it
        it('executes provided SQL statements', () => {
            const sql = `
                CREATE TEMP TABLE IF NOT EXISTS Surfing (Name Text PRIMARY KEY, Value TEXT);
                INSERT INTO Surfing VALUES ('Surfing', 'IsGreat');
            `;
            Database
                .execute(sql)
                .then(() => Database.select('SELECT * FROM SURFING'))
                .then((result) => expect(result).to.eql([ { Name: 'Surfing', Value: 'IsGreat' } ]))
                .catch((err) => console.error(err));
        })
        it('throws if provided SQL statements are invald', () => {
            const sql = `
                INSERT INTO iDontExist VALUES ('enter', 'the', 'void');
            `;

            Database
                .execute(sql)
                .catch((err) => expect(err).instanceOf(Error));
        })
    });
    describe('#select', () => {
        it('returns list of rows selected by statement', () => {
            Database
                .select('SELECT * FROM SURFING')
                .then((result) => expect(result).to.eql([ { Name: 'Surfing', Value: 'IsGreat' } ]));
        })
        it('throws if provided select statement is invalid', () => {
            Database
                .select('SELECT * FROM iDontExist')
                .catch((err) => expect(err).to.be.instanceOf(Error));
        })
    })
    describe('#executeSpatial', () => {
        // stack exchange! -> https://gis.stackexchange.com/questions/184850/how-to-use-spatialite-functions-in-a-python-script
        it('loads mod_spatialite and executes sqlite', () => {
            const line = 'LINESTRING(45.554194 -122.686101, 45.433001 -122.762632)';
            const sql = `
                CREATE TABLE my_line(id INTEGER PRIMARY KEY);
                SELECT AddGeometryColumn("my_line","geom" , 4326, "LINESTRING", 2);
                INSERT INTO my_line VALUES (1, GeomFromText('${line}', 4326));
            `
            const selectLine = 'SELECT AsGeoJSON(geom) from my_line;'
            Database
                .executeSpatial(sql)
                .then(() => Database.selectSpatial(selectLine))
                .then((rows) => {
                    const geojson = JSON.parse(rows[0]['AsGeoJSON(geom)']);
                    expect(gjv.isLineString(geojson)).to.be.true;
                });
        });
        it('throws an error if invalid sql provided', () => {
            const badSql = 'SELECT AddGeometryColumn("not_my_line","geom" , 4326, "LINESTRING", 2);'
            Database
                .executeSpatial(badSql)
                .catch((err) => expect(err).to.be.instanceof(Error));
        });
    });
});