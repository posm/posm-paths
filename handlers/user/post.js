'use strict';

const Boom = require('boom');
const databaseLocation = require('../../config')[process.env.ENVIRONMENT || 'develop'].db;
const Database = require('../../db');

module.exports = async (r, h) => {
	try {
        Database.connect(databaseLocation);
        
        const userName = r.payload.name
        const users = await Database.select('SELECT name FROM Users');

        if (users.map(user => user.name).indexOf(userName) > -1) {
            return Boom.badRequest('user already exists');
        }

        await Database.addUsers(userName)
        Database.close()

        return h.response({ upload: 'successful' }).code(200)

    } catch (error) {
        console.error(error);
        throw error;
    }
}