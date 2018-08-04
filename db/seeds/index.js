'use strict';

const users = require('../../testData/seeds').users;
const uuidv4 = require('uuid/v4');
const dbLoc = require('../../config')[process.env.ENVIRONMENT || 'develop'].db;
const Database = require('../');

Database.connect(dbLoc);

let seeds = [
    { 
        users: () => {
            const values =  users.map(user => `('${uuidv4()}', '${user.name}')`).join(',');
            const sql = `INSERT INTO Users VALUES ${values};`;
            return Database.execute(sql)
                .catch((err) => { throw err; });
        }
    }
];

if (process.argv.slice(2).length > 0) {
    seeds = seeds.filter(s => process.argv.includes(Object.keys(s)[0]));
}

seeds.forEach(s => Object.values(s)[0]());

