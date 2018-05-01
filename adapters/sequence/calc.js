'use strict';

const point = require('turf').point;
const distance = require('turf').distance;
const dayjs = require('dayjs')

/**
 * returns euclidean distance between two img locs.
 * 
 * @param {object} metaLoc current img's loc
 * @param {object} nextMeta next img's loc
 * @return {number} euclidean distance between two points
 */
exports.distance = (metaLoc, nextMetaLoc) => {
    return distance(
        point([metaLoc.lon, metaLoc.lat]),
        point([metaLoc.lon, metaLoc.lat]),
        { units: 'miles'}
    )

}

/**
 * 
 * @param {string} metaDate current img's timestamp
 * @param {string} nextMetaDate next img's timestamp
 * @return {number} milisecond diff between two dates.ee
 * 
 */
exports.delta = (metaDate, nextMetaDate) => metaDate.diff(nextMetaDate);
