'use strict';

const Boom = require('boom');
const Sequence = require('../../adapters/sequence');
const Database = require('../../db');
const databaseLocation = require('../../config')[process.env.ENVIRONMENT || 'develop'].db;

Promise = require('bluebird');

module.exports = async (r, h) => {
	try {
		const paths = r.payload;
		const userId = r.query.userId;
		const type = r.query.type;
		const params = {};
		Object.keys(r.params).forEach(k => {
			if (['maxDist', 'maxDelta', 'maxSize', 'minDist'].indexOf(k) > -1) {
				params[k] = r.params[k];
			}
		})
		const sequences  = await Sequence.build(paths, type, userId, params);
		Database.connect(databaseLocation);
		await Promise.each(sequences, (sequence) => Database.addSequence(sequence).catch(err => { throw err; }))
		Database.close();
		return h.response({ upload: 'successful' }).code(200);

	} catch (error) {
		console.error(error);
		return Boom.badImplementation(error.message);
	}
}
