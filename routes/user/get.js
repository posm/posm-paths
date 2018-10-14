'use strict';

const Joi = require('joi');

module.exports = {
	method: 'GET',
	path: '/user/{id}',
	config: { 
		handler: require('../../handlers/user').get,
		validate: { 
			params: { id: Joi.string().guid({ version: ['uuidv4'] }) } 
		}
	}
}
