'use strict';

const fs = require('fs-extra');
const path = require('path');
const buildSequences = require('./build');
const { flatten } = require('../../helpers');

Promise = require('bluebird')

/**
 * 
 * @param {array} paths list of directory paths holding images to make sequences of
 * @param {number} cutDist maximum distance allowed between two photos
 * @param {cutTime} cutTime maximum time between two images
 * @param {cutSize} cutSize maximum size of a sequence.
 * @return {array} array of sequence configuration objects
 */

module.exports = (paths, cutDist, cutTime, cutSize) => {
    return new Promise((resolve, reject) => {
        Promise.map(paths, async (p) => {
            const images = await fs.readdir(p);
            return images.map(f => path.join(p, f));
        })
        .then(async (images) => {
            try {
                const params = { 
                          maxDist: cutDist || 0.2,
                          minDist: 0.1,
                          maxDetla: cutTime || 120, 
                          size: cutSize || 0 
                      },
                      sequences = await buildSequences(flatten(images), params);

                resolve(sequences);
            } catch (e) {
                reject(e);

            }

        })
    })
}