'use strict';

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
    var R = 6371e3,
        latRadians = [metaLoc.lat, nextMetaLoc.lat].map(lat => lat * (Math.PI / 180)),
        latDiffs = (latRadians[0] - latRadians[1]) * (Math.PI / 180),
        lonDiffs = (metaLoc.lon - nextMetaLoc.lon) * (Math.PI / 180),

        a = Math.pow(Math.sin(lonDiffs / 2), 2) +
           (Math.cos(latRadians[0]) * Math.cos(latRadians[1]) * Math.pow(lonDiffs/2, 2)),
            
        c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c;
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