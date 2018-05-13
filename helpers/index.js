'use strict';

// total wizard! thanks!
// https://stackoverflow.com/questions/10865025/merge-flatten-an-array-of-arrays-in-javascripts
const isArray = (elementInQuestion) => Array.isArray(elementInQuestion);
const flattener = (elementsToFlatten) => {
    return elementsToFlatten.reduce((flatElements, element) => {
        return flatElements.concat(isArray(element) ? flattener(element) : element);
    }, []);
}


/**
 * flattens array of nested elements
 * 
 * @param {array} nested array of (potentially nested array) elements
 * @return {array} flattened array of elements in nested
 */
exports.flatten = (nestedElements) => flattener(nestedElements)