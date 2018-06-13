'use strict';

const Boom = require('boom');
const db = require('../../connection');
const uuidv4 = require('uuid/v4');
const buildSequences = require('../../adapters/sequence');
const insertImages = require('./helpers').insertImages;
const insertSequence = require('./helpers').insertSequence;

module.exports = async (r, h) => {
	try {
		const paths = r.payload,
			  user = r.query.userId,
			  minCutDist = r.params.minDist || 0.5,
			  maxCutDist = r.params.maxDist || 300,
			  maxDelta = r.params.maxDelta || 120,
			  sequenceSize = r.params.size || 0,
			  sequences  = await buildSequences(paths, minCutDist, maxCutDist, maxDelta, sequenceSize, userId);

		sequences.forEach(async (sequence) => {
			try {
				await Promise.map([insertImages, insertSequence], async (builder) => {
					try {
						await builder(sequence);
					} catch (e) {
						throw e;
					}
				})		
			} catch (e) {
				throw e;
			}
		})

		return h.response({ upload: 'successful' }).code(200);

	} catch (error) {
		return Boom.badImplementation(error.message);
	}
}
