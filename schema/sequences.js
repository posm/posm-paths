'use strict';

const Joi = require('joi');
const metadata = require('./metadata');

module.exports = Joi
    .object()
    .pattern(
        // uuid regex;
        /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i, 
        Joi.array().items(metadata)
    );