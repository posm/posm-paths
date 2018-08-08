'use strict';

const flatten = require('../helpers').flatten;

module.exports = flatten([
	require('./user').post,
	require('./sequence').get,
	require('./sequence').post
]);
