
'use strict';

const calcDistance = require('./helpers').calcDistance;
const calcDelta = require('./helpers').calcDelta;
const addSequence = require('./helpers').addSequence
const uuidv4 = require('uuid/v4');


Promise = require('bluebird');

/**
 * provided list of image metadata objects and thresholds used to define sequences,
 * build and reply an object of image sequences
 * 
 * @param metas {list} list of image metadata objects
 * @param params {object} map of user (or default) tresholds used to build sequences
 * @return {object} map of generated image sequences
 * 
 */
module.exports = (metas, params) => {
    const sortedMetas = metas.sort((a, b) => a.timestamp - b.timestamp),
          pelIndex = sortedMetas.length - 2,
          sequences = {},
          maxDist = params.maxDist,
          maxDelta = params.maxDelta,
          maxSize = params.maxSize,
          minDist = params.minDist;

    let currentSequence = [];
    // for the 1st to 2nd to last meta...
    sortedMetas.slice(0, pelIndex).forEach((meta, i) => {
        const partnerMeta = sortedMetas[i + 1],
              distance = calcDistance(meta.loc, partnerMeta.loc),
              tooClose = distance < minDist;
        
        // ... if image is not too close to its partner, add it to a sequence.
        if (!tooClose) {
            // ... if the current sequence length matches the maximum size,
            //     or images are too far apart (in space or time), 
            //     add the current sequence to the sequence map, then make a new sequence.
            const delta = calcDelta(meta.timestamp, partnerMeta.timestamp),
                  needNewSequence = currentSequence.length === maxSize || distance > maxDist || delta > maxDelta;

            if (needNewSequence) {
                addSequence(sequences, currentSequence);
                currentSequence = [];

            }
            
            // add a uuid then add it to the sequence!
            meta.id = uuidv4();
            currentSequence.push(meta);

        }  
    })

    if (currentSequence.length > 0) addSequence(sequences, currentSequence);
    return sequences;
};