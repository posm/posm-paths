'use strict';

const Boom = require('boom');
const db = require('../../connection');
const uuidv4 = require('uuid/v4');

module.exports = async (r, h) => {
	try {
        const user = r.payload,
              users = await db('Users').select('name');

        if (users.indexOf(user) === -1) {
            Boom.badRequest('user already exists');
        }

        await db('Users').insert({id: 3, name: user.name});
        return h.response({ upload: 'successful' }).code(200)

    } catch (error) {
        throw error;
    }
}