'use strict';

const Joi = require('joi');

/**
 * paths must be to supported images (now just jpgs?)
 * 
 * valid: '/surfing/is/great.jpg', '/396238e2-4c6d-11e8-842f-0ed5f89f718b/images/by/uuid/1234.jpg'
 * invalid: '/surfing/can/wait.png'
 */
const imageSchema = Joi.string().regex(/[.*\/]*\.(jpg)/i)
/**
 * locations must include lat, lon in the specified ranges.
 * 
 * valid: {lat: 89, lon: 110}
 * invalid: {lat: 110: lon: 89}
 */
const locSchema = Joi
    .object()
    .keys({
        lat: Joi.number().min(-90).max(90),
        lon: Joi.number().min(-180).max(180)
    })
    .requiredKeys(
        'lat',
        'lon'
    )

/**
 * Datetimes must match this (grossly long) regex.
 *
 * valid: '2008-10-23T14:27:07.240Z'
 * invalid: '2008-9-23T14:27:07.240Z'
 */
const timeStampSchema = Joi.object();
// Joi
//     .string()
//     .regex(/([1-2]{1}[0-9]{3})-([0-1]{1}[0-9]{1})-([0-3]{1}[0-9]{1})T([0-2]{1}[0-9]{1}):([0-6]{1}[0-9]{1}):([0-6]{1}[0-9]{1}).[0-9]{3}Z/)

module.exports = Joi
    .object()
    .keys({
        image: imageSchema,
        loc: locSchema,
        timestamp: timeStampSchema
    })
    .requiredKeys(
        'image',
        'loc'
        // 'timestamp'
    )