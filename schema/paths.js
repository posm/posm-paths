'use strict';

const Joi = require('joi');

module.exports = Joi
    .array()
    .items(Joi.string().regex(/\/?[a-z0-9]*/))