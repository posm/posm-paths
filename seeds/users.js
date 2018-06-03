'use strict';

const users = require('../testData/seeds').users;

Promise = require('bluebird');

exports.seed = async (knex, Promise) => {
    try {
        await knex('Users').del();
        return Promise.map(users, async (user) => {
            try {
                await knex('Users').insert({name: user.name})
            } catch (error) {
                console.error(error);
            }
        })
    } catch (error) {
        console.error(error);
    }
}