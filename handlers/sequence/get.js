'use strict';

const Boom = require('boom');
const Database = require('../../db');
const databaseLocation = require('../../config')[process.env.ENVIRONMENT || 'develop'].db;

const Formatter = require('../../formatter');

module.exports = async (r, h) => {
	try {
        const id = r.params.id;
        const format = r.params.format;
        Database.connect(databaseLocation);
        let images = await Database.getSequence(id); 

        if (images.length === 0) {
            return Boom.badRequest('User not in database')
        }

        images = Formatter[format || 'toFeatureCollection'](images);

        Database.close();
        
        return h.response(images).code(200)

    } catch (error) {
        console.error(error);
        throw error;
    }
}