'use strict';

const Boom = require('boom');
const uuidv4 = require('uuid/v4');
const buildSequences = require('../../adapters/sequence');
const insertImagesSequences = require('./helpers').insertImagesSequence;

module.exports = async (r, h) => {
	try {
		const paths = r.payload,
			  userId = r.query.userId,
			  minCutDist = r.params.minDist || 0.5,
			  maxCutDist = r.params.maxDist || 300,
			  maxDelta = r.params.maxDelta || 120,
			  sequenceSize = r.params.size || 0,
			  sequences  = await buildSequences(paths, minCutDist, maxCutDist, maxDelta, sequenceSize, userId);

		sequences.forEach(async (sequence) => {
			try {
				await insertImagesSequences(sequence)
			} catch (e) {
				throw e;
			}
		})

		return h.response({ upload: 'successful' }).code(200);

	} catch (error) {
		console.error(error);
		return Boom.badImplementation(error.message);
	}
}
