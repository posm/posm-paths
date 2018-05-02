
'use strict';

const calcDistance = require('./helpers').calcDistance;
const calcDelta = require('./helpers').calcDelta;
const addSequence = require('helpers').addSequence
const withinThresholds = require('helpers').withinThresholds;

Promise = require('bluebird');

/**
 * provided list of image metadata objects and thresholds for  
 */
module.exports = (metas, params) => {
    const sortedMetas = metas.sort((a, b) => a.timestamp - b.timestamp),
          pelIndex = sortedMetas.length - 2,
          lastIdx = sortedMetas.length - 1,
          sequences = {},
          sequenceless = [];
          maxDist = params.dist,
          maxDelta = params.delta,
          maxSize = params.maxSize;

    let currentSequence = [];

    Promise.all(sortedMetas, (meta, i) => {
        if (currentSequence.length === maxSize) {
            sequences = addSequence({}, currentSequence);
            currentSequence = [];

        }

        const partnerMeta = sortedMetas[i + (i <= pelIndex ? 1 : -1)],
              meetsThreshold = withinThresholds(meta, partnerMeta);

        if (meetsThreshold) {
            currentSequence.push(meta);

        } else {
            sequenceless.push(meta);
        }
        
    })
    .then(() => {
        return { sequences: sequences, sequenceless: sequenceless}
    })
    

};