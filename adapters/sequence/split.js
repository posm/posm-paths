'use strict';

const calcDistance = require('./calc').distance;
const calcDelta = require('./calc').delta;

Promise = require('bluebird');

/**
 * map/sort each image into lists of 'geo-time-objs'
 * filter conditional that
 *  - a. the image meets the decided cut off distances
 *  - b. the image meets the decided cut off time-delta
 *  - c. we don't have too many images in the sequence.
 */

module.exports = (metas, params) => {
          // sort by date time
    const sortedMetas = metas.sort((a, b) => a - b),
          // pelumniariate babi!
          pelmIndex = sortedMetas.length - 2;

    Promise.map(sortedMetas, (meta, i) => {
        if (i <= pelmIndex) {
            const nextMeta = sortedMetas [i + 1]
            meta.distance = calcDistance(meta.loc, nextMeta.loc);
            meta.delta = calcDelta(meta.date, nextMeta.date);
        
        }
        
        return meta;
    })
    

};