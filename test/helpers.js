'use strict';

const injectDefaults = require('../config')[process.env.ENVIRONMENT || 'develop'].injectDefaults;

module.exports = {
    mergeDefaults: (request) => Object.assign(injectDefaults, request)
}