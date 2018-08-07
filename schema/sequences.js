'use strict';

const Joi = require('joi');
const metadata = require('./metadata');

module.exports = Joi
    .array()
    .items(
        Joi.object().keys({
            userId: Joi.string().guid({ versionO: [ 'uuidv4' ]}),
            sequenceId: Joi.string().guid({ version: [ 'uuidv4' ] }),
            sequence: Joi.array().items(metadata)
        })
    );