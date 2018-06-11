'use strict';

const users = require('../testData/seeds').users;
const uuidv4 = require('uuid/v4');

Promise = require('bluebird');

exports.seed = async (knex, Promise) => {
    try {
        await knex('Users').del();
        return Promise.map(users, async (user) => {
            try {
                await knex('Users').insert({id: uuidv4(), name: user.name})
            } catch (error) {
                console.error(error);
            }
        })
    } catch (error) {
        console.error(error);
    }
}