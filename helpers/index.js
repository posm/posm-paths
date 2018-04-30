'use strict';

/**
 * flattens array of nested elements
 * 
 * @param {array} nested array of (potentially nested array) elements
 * @return {array} flattened array of elements in nested
 */
exports.flatten = (nested) => {
    return nested.reduce((flatt, el) => {
        return flatt.concat(Array.isArray(el) ? flatten(el) : el)

    });
}