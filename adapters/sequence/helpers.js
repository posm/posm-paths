'use strict';

const point = require('turf').point;
const distance = require('turf').distance;
const dayjs = require('dayjs')
const uuidv4 = require('uuid/v4');

/**
 * returns euclidean distance between two img locs.
 * 
 * @param {object} metaLoc current img's loc
 * @param {object} nextMeta next img's loc
 * @return {number} euclidean distance between two points
 */
exports.calcDistance = (metaLoc, nextMetaLoc) => {
    return Math.sqrt(
        Math.pow(nextMetaLoc.lon - metaLoc.lon, 2) + 
        Math.pow(nextMetaLoc.lat - metaLoc.lat, 2)
    )
}

/**
 * given two timestamp object, calculates the milisecond delta
 * 
 * @param {string} metaDate current img's timestamp
 * @param {string} nextMetaDate next img's timestamp
 * @return {number} milisecond diff between two dates.ee
 * 
 */
exports.calcDelta = (metaDate, nextMetaDate) => nextMetaDate.diff(metaDate) / 1000;

/**
 * given a sequence map, adds a new sequence array and returns the map.
 * 
 * @param {object} sequenceMap current sequence map
 * @param {array} sequence sequence to be added to sequenceMap
 * @return {object} updated sequenceMap
 */
exports.addSequence = (sequenceMap, sequence) => { sequenceMap[uuidv4()] = sequence; return sequenceMap };