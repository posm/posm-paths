'use strict';

const pathsSchema = require('../../schema/paths');

module.exports = {
	method: 'POST',
	path: '/sequence',
	config: { handler: require('../../handlers/user').post }
}
