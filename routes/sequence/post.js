'use strict';

const sequencesSchema = require('../../schema/sequences.js');

module.exports = {
	method: 'POST',
	path: '/sequence',
	config: {
		handler: require('../../handlers/sequence').get,
		validate: {
			payload: sequencesSchema,
			failAction: async (r, h, err) => err
		}
	}
}
