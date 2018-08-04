'use strict';

const expect = require('chai').expect;
const Database = require('../db');
const fs = require('fs-extra');


Promise = require('bluebird');

describe('db', () => {
    describe('#connect', () => {
        it('connects to the db at the provided path', async () => {
            expect(Database.connect.bind(Database)).not.to.throw(Error);
            expect(Database.dbLoc).to.eql(':memory:');
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
                .catch((err) => expect(err).instanceOf(Error));
        })
    })
    // // stack exchange! -> https://gis.stackexchange.com/questions/184850/how-to-use-spatialite-functions-in-a-python-script
    // it('can load libspatialite extension and do spatial things!', () => {
    //     // aware of the callback hell. goal here was just to prove mod_spatialite would work...
    //     db.loadExtension(libspatialite, (err) => {
    //         const spatialMakin = 'SELECT InitSpatialMetaData(1);';
    //         const dbMakin = 'CREATE TABLE my_line(id INTEGER PRIMARY KEY)';
    //         const geomMakin = 'SELECT AddGeometryColumn("my_line","geom" , 4326, "LINESTRING", 2);';
    //         const line = 'LINESTRING(45.554194 -122.686101, 45.433001 -122.762632)'
    //         const lineMakinStatement = `INSERT INTO my_line VALUES (1, GeomFromText('${line}', 4326));`
    //         const lineSelectinStatement = 'SELECT AsGeoJSON(geom) FROM my_line;'
    //         db.run(spatialMakin, (err, row) => { 
    //             db.run(dbMakin, (err, row) => {
    //                 db.run(geomMakin, (err, row) => { 
    //                     db.run(lineMakinStatement, (err, row) => {
    //                         db.each(lineSelectinStatement, (err, row) => {
    //                             const geojson = JSON.parse(row['AsGeoJSON(geom)']);
    //                             expect(gjv.isLineString(geojson)).to.be.true;
    //                         });
    //                     });
    //                 });
    //             });
    //         });
    //         db.close();
    //     })
    // })
})