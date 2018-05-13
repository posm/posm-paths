'use strict';

const meta = require('./meta');
const split = require('./split');

Promise = require('bluebird');

module.exports = (images, params) => {
    return Promise.map(images, async (image) => await meta(image))
    .then(async metas => await split(metas, params))
    .catch(e => { throw e; })
    
}