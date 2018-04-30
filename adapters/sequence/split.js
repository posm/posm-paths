'use strict';

/**
 * map/sort each image into lists of 'geo-time-objs'
 * filter conditional that
 *  - a. the image meets the decided cut off distances
 *  - b. the image meets the decided cut off time-delta
 *  - c. we don't have too many images in the sequence.
 */

module.exports = (metas, params) => {
    console.log(metas[0])
    return metas
};