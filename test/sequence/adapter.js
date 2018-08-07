'use strict'

const fs = require('fs-extra');
const path = require('path');
const chai = require('chai');
const Joi = require('joi');

/* schemas that define valid/expected function outputs */
const metadataSchema = require('../../schema').metadata;
const sequencesSchema = require('../../schema').sequences;

const Sequence = require('../../adapters/sequence');

const expect = chai.expect;
Promise = require('bluebird');

describe('sequence', () => {
    it('meta reads then selializes an image\'s exif metadata', async () => {
        try {
            const image = './testData/exif-gps-samples/DSCN0010.JPG';
            const metadata = await Sequence.meta(image)
            const validation = Joi.validate(metadata, metadataSchema);

            expect(validation.value).to.be.eql(metadata);
            expect(validation.error).to.be.null;
            return;
        } catch (e) {
            console.error(e);

        }
    })
    it ('given a path of images, generates a list of sequence objects', async () => {
        try {
            const paths = ['/testData/exif-gps-samples', '/testData/danbjoseph'].map(p => process.cwd() + p);
            const sequences = await Sequence.build(paths, 'directory');
            const validation = Joi.validate(sequences, sequencesSchema);

            expect(validation.value).to.be.eql(sequences)
            expect(validation.error).to.be.null;
            return;
        } catch (e) {
            console.error(e);

        }
    })
    .timeout(10000000)
})