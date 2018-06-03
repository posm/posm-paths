'use strict';

const pathsSchema = require('../../schema/paths');

module.exports = {
	method: 'POST',
	path: '/sequence',
	config: {
		handler: require('../../handlers/sequence').post,
		validate: {
			payload:pathsSchema,
			failAction: async (r, h, err) => err
		}
	}
}
