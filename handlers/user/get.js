'use strict';

const Boom = require('boom');
const db = require('../../connection');
const uuidv4 = require('uuid/v4');

module.exports = async (r, h) => {
	try {
        const id = r.params.id,
              ids = (await db('Users').select('id')).map(user => user.id);

        if (ids.indexOf(id) === -1) {
            return Boom.badRequest('User not in database')
        }


        const user = (await db('Users').select('name').where({id: id}))[0];

        return h.response({ upload: 'successful', name: user.name }).code(200)

    } catch (error) {
        console.error(error);
        throw error;
    }
}