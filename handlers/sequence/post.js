'use strict';

const Boom = require('boom');
const Sequence = require('../../adapters/sequence');

Promise = require('bluebird');

module.exports = async (r, h) => {
	try {
		const paths = r.payload;
		const userId = r.query.userId;
		const minCutDist = r.params.minDist || 0.5;
		const maxCutDist = r.params.maxDist || 300;
		const maxDelta = r.params.maxDelta || 120;
		const sequenceSize = r.params.size || 0;
		const sequences  = await Sequence.build(paths, minCutDist, maxCutDist, maxDelta, sequenceSize, userId);

		await Promise.each(sequences, (sequence) => Database.addSequence(sequence).catch(err => { throw err; }))

		return h.response({ upload: 'successful' }).code(200);

	} catch (error) {
		console.error(error);
		return Boom.badImplementation(error.message);
	}
}
