'use strict';

const Boom = require('boom');
const db = require('../../connection');
const uuidv4 = require('uuid/v4');
const insertImages = require('./helpers').insertImages;
const insertSequence = require('./helpers').insertSequence;

module.exports = async (r, h) => {
	try {
		const paths = r.payload,
			  userId = r.params.user,
			  minCutDist = r.params.minDist || 0.5,
			  maxCutDist = r.params.maxDist || 300,
			  maxDelta = r.params.maxDelta || 120,
			  sequenceSize = r.params.size || 0,
			  sequences  = await buildSequences(paths, minCutDist, maxCutDist, maxDelta, sequenceSize);

		sequences.forEach(async (sequence) => {
			try {
				const sequenceId = uuidv4();
				console.log(sequenceId);
				return {}
				// await Promise.map([insertImages, insertSequence], async (builder) => {
				// 	try {
				// 		await builder(sequenceId, sequence, userId);
				// 	} catch (e) {
				// 		throw e;
				// 	}
				// })		
			} catch (e) {
				throw e;
			}
		})

	} catch (error) {
		return Boom.badImplementation(error.message);
	}
}
