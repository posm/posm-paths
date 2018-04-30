'use strict'

const fs = require('fs-extra');
const path = require('path');
const chai = require('chai');
const Joi = require('joi');

/* schemas that define valid/expected function outputs */
const metadataSchema = require('../../schema').metadata;

/* seqeunce adapter components */
const meta = require('../../adapters/sequence/meta');

const sequenceAdapter = require('../../adapters/sequence');

const expect = chai.expect;
Promise = require('bluebird');

describe('sequence', () => {
    it('meta reads then selializes an image\'s exif metadata', async () => {
        try {
            const image = './testData/exif-gps-samples/DSCN0010.JPG',
                  metadata = await meta(image),
                  validation = Joi.validate(metadata, metadataSchema);

            expect(validation.value).to.be.eql(metadata);
            expect(validation.error).to.be.null;

        } catch (e) {
            console.error(e);

        }
    })
    // it ('does a thing', async () => {
    //     try {
    //         const locs = ['./testData/exif-gps-samples'].map(p => path.join(process.cwd(), p));
    //         await sequenceAdapter(locs);

    //     } catch (e) {
    //         console.error(e);

    //     }
    // })
})