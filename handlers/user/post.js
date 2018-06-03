'use strict';

const Boom = require('boom');
const db = require('../../connection');
const uuidv4 = require('uuid/v4');

module.exports = async (r, h) => {
	try {
        const user = r.params.user,
              users = await db('Users').select('name')[0];

        if (users.contains(user)) {
            Boom.badRequest('user already exists');
        
        }

        await db('Users').insert({id: uuidv4(), name: user});
       
    } catch (error) {
        throw error;
    }
}