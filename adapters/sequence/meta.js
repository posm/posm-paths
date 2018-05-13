'use strict';

const { ExifTool } = require('exiftool-vendored');
const exif = new ExifTool();
const makeLoc = require('./make').loc;
const makeDate = require('./make').date;

Promise = require('bluebird');

/**
 * Given an image path, replies object with relevant metadata
 * 
 * @param {string} image path to image
 * @return {object} object holding an image's geographic, time, and fs path metadata
 */
module.exports = (image) => {
    return new Promise((resolve, reject) => 
        exif.read(image)
        .then(tags => {
            resolve({ 
                image: image,
                loc: makeLoc(tags),
                timestamp: makeDate(tags)
            });
        })
        .catch(e => reject(e))
    )
}