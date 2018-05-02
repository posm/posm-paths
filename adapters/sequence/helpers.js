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
    return distance(
        point([metaLoc.lon, metaLoc.lat]),
        point([metaLoc.lon, metaLoc.lat])
        // { units: 'miles'}
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
exports.calcDelta = (metaDate, nextMetaDate) => metaDate.diff(nextMetaDate);

/**
 * given a sequence map, adds a new sequence array and returns the map.
 * 
 * @param {object} sequenceMap current sequence map
 * @param {array} sequence sequence to be added to sequenceMap
 * @return {object} updated sequenceMap
 */
exports.addSequence = (sequenceMap, sequence) => { sequenceMap[uuidv4()] = sequence; return sequenceMap };

/**
 * given thwo partner meta objects, determines if the two are within user defined time/distnace thresholds
 * 
 * @param {object} meta metadata object at current index of images
 * @param {object} partnerMeta metadata object for (either next or previous) partner meta object
 */
exports.withinThresholds = (meta, partnerMeta) => {
    const distance = calcDistance(meta.loc, nextMeta.loc);
          delta = calcDelta(meta.timestamp, nextMeta.timestamp),
          toMuchTime = delta > maxDelta
          toFar = distance > maxDistance;

    return !toFar && !toMuchTime;
}