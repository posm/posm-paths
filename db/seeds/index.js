'use strict';

const users = require('./users');
const uuidv4 = require('uuid/v4');
const dbLoc = require('../../config')[process.env.ENVIRONMENT || 'develop'].db;
const Database = require('../');

Database.connect(dbLoc);

const userId = users[0].id
const imageIds = [...Array(5).keys()].map(k => uuidv4());

let seeds = { 
    users: () => {
        const values =  users.map(user => `('${user.id}', '${user.name}')`).join(',');
        const sql = `INSERT INTO Users VALUES ${values};`;
        return Database
            .execute(sql)
            .catch((err) => { throw err; });
    },
    images: () => {
        const images = imageIds.map((id, index) => {
            return {
                id: id,
                image:'.',
                timestamp: (new Date()).toISOString(),
                index: index,
                loc: { 
                    lat: Math.floor(Math.random() * Math.floor(10)), 
                    lon: Math.floor(Math.random() * Math.floor(10)) 
                }
            }
        })
        return Database
            .addImages(userId, uuidv4(), images)
            .catch((err) => { throw err; })
    }
}

Object
    .values(seeds)
    .forEach(async (seed) => await seed().catch(err => { console.error(err) ; }))

