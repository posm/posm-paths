'use strict';

const Joi = require('joi');
const metadata = require('./metadata');

module.exports = Joi
    .array()
    .items(
        Joi.object().keys({
            sequenceId: Joi.string().regex(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i),
            sequence: Joi.array().items(metadata)
        })
    );