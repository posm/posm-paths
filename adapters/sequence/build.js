'use strict';

const meta = require('./meta');
const split = require('./split');

Promise = require('bluebird');

module.exports = (images, params) => {
    return Promise.map(images, async (image) => await meta(image))
    .then(metas => {
        const sortedMetas = metas.sort((a, b) => a.date - b.date);
        return split(sortedMetas)
    })
    .catch(e => { throw e; })
    
}