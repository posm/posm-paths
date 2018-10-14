'use strict';

const Joi = require('joi');

module.exports = {
	method: 'POST',
	path: '/user',
	config: { 
		handler: require('../../handlers/user').post,
		validate: {
			payload: Joi.object().keys({ name: Joi.string() }),
			failAction: async (request, h, err) => err
		}
	}
}
