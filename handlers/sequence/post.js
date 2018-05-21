'use strict';

const Boom = require('boom');
const db = require('../../connection');
const uuidv4 = require('uuid/v4');

module.exports = async (r, h) => {
	try {
	} catch (error) {
		return Boom.badImplementation(error.message);
	}
}
