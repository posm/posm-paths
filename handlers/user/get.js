'use strict';

const Boom = require('boom');
const Database = require('../../db');
const databaseLocation = require('../../config')[process.env.ENVIRONMENT || 'develop'].db;

module.exports = async (r, h) => {
	try {
        Database.connect(databaseLocation);
        const id = r.params.id;
        const users = await Database.select(`SELECT name FROM Users WHERE id='${id}'`);

        if (users.length === 0) {
            return Boom.badRequest('User not in database')
        }

        Database.close();
        
        return h.response({ upload: 'successful', name: users[0].name }).code(200)

    } catch (error) {
        console.error(error);
        throw error;
    }
}