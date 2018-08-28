'use strict'

const fs = require('fs-extra');
const uuidv4 = require('uuid/v4');
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
    describe('#calcDistance', () => {
        it('calculates Haverstein distance between two points', () => {
            const point1 = { lat: 40, lon: -122 };
            const point2 = { lat: 40.2, lon: -122.009 };
            const dist = Sequence.calcDistance(point1, point2);
            expect(dist).to.not.be.null
        })
    })
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
    it ('given a path of images sufficiently close together in space in time, returns sequence of same length', async () => {
        try {
            const paths = [ '/testData/danbjoseph2' ].map(p => process.cwd() + p);
            const sequences = await Sequence.build(paths, 'directory');
            const validation = Joi.validate(sequences, sequencesSchema);

            expect(validation.value).to.be.eql(sequences)
            expect(validation.error).to.be.null;

            expect(sequences[0].images.length).to.eql(8);

        } catch (e) {
            console.error(e);

        }
    })
    // it('given path with images less than max size, makes one big sequence', async () => {
    //     try {
    //         const paths = ['/testData/100MSDCF'].map(p => process.cwd() + p);
    //         const sequences = await Sequence.build(paths, 'directory', uuidv4(), { maxSize: 10000 });
    //         expect(sequences.length).to.eql(1);
    //     } catch (e) {
    //         console.log(e);
    //     }
    // })
    // .timeout(10000000)
    // it('given multiple image paths, makes multiple sequenecs', async () => {
    //     try {
    //         const paths = ['/testData/100MSDCF', '/testData/103MSDCF'].map(p => process.cwd() + p);
    //         const sequences = await Sequence.build(paths, 'directory', uuidv4(), { maxSize: 1000 });
    //         const validation = Joi.validate(sequences, sequencesSchema);

    //         expect(validation.value).to.be.eql(sequences)
    //         expect(validation.error).to.be.null;

    //     } catch (e) {
    //         console.log(e);
    //     }
    // })
    // .timeout(10000000)
})