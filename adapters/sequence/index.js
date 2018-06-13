'use strict';

const fs = require('fs-extra');
const path = require('path');
const buildSequences = require('./build');
const flatten = require('../../helpers').flatten;

Promise = require('bluebird')

/**
 * 
 * @param {array} paths list of directory paths holding images to make sequences of
 * @param {number} maxCutDist maximum distance allowed between two photos
 * @param {number} minCutDist minimum distance allowed between two photos
 * @param {number} cutTime maximum time between two images
 * @param {number} cutSize maximum size of a sequence.
 * @param {string} userId (optional) userId that when present attached to each sequence
 * @return {array} array of sequence configuration objects
 */

module.exports = (paths, minCutDist, maxCutDist, maxDelta, sequenceSize, userId) => {
    return new Promise((resolve, reject) => {
        Promise.map(paths, async (p) => {
            const images = await fs.readdir(p);
            return images.map(f => path.join(p, f));
        })
        .then(async (images) => {
            try {
                const params = { 
                    maxDist: maxCutDist,
                    minDist: minCutDist,
                    maxDelta: maxDelta,
                    size: sequenceSize
                };

                let sequences = await buildSequences(flatten(images), params);
                if (userId)  {
                    sequences = sequences.map(sequence => {
                        sequence.userId = userId
                        return sequence
                    });    
                }

                resolve(sequences);
            } catch (e) {
                reject(e);

            }

        })
    })
}