'use strict';

const injectDefaults = require('../config')['development'].injectDefaults;

module.exports = {
    mergeDefaults: (request) => Object.assign(injectDefaults, request)
}