'use strict';

const pathsSchema = require('../../schema/paths');
const Joi = require('joi');

module.exports = {
	method: 'POST',
	path: '/sequence',
	config: {
		handler: require('../../handlers/sequence').post,
		validate: {
			query: {
				userId: Joi.string().guid({ versionO: [ 'uuidv4' ]}),
				type: Joi.string()
			},
			payload: pathsSchema,
			failAction: async (r, h, err) => err
		}
	}
}
