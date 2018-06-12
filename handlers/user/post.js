'use strict';

const Boom = require('boom');
const db = require('../../connection');
const uuidv4 = require('uuid/v4');

module.exports = async (r, h) => {
	try {
        const userName = r.payload.name,
              users = (await db('Users').select('name')).map(user => user.name);

        if (users.indexOf(userName) > -1) {
            return Boom.badRequest('user already exists');
        }

        await db('Users').insert({id: uuidv4(), name: userName});
        return h.response({ upload: 'successful' }).code(200)

    } catch (error) {
        console.error(error);
        throw error;
    }
}