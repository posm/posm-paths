'use strict';

const Joi = require('joi');
const chai = require('chai');
const expect = chai.expect;

const flatten = require('../../helpers').flatten;
const gjv = require('geojson-validation');
const uuidv1 = require('uuid/v1');

const server = require('../server');
const mergeDefaults = require('../helpers').mergeDefaults;
const users = require('../../db/seeds/users');
const danbjoseph = users[0];
const routes =  flatten([ 
    require('../../routes/sequence').get,
    require('../../routes/sequence').post
]);


before(async () => await server.liftOff(routes))
describe('post', () => {
    it('replies 200 when sequence post is successful', async () => {
        try {
            const request = mergeDefaults({
                method: 'POST',
                payload: ['/testData/danbjoseph'].map(p => process.cwd() + p),
                 url: `/sequence?userId=${danbjoseph.id}&type=directory`
            });
            const r = await server.inject(request);
            const statusCode = r.statusCode;
                
            expect(statusCode).to.be.eql(200);

        } catch (error) {
            console.error(error);

        }
    })
    .timeout(10000000)
    it('replies 400 when unsuccessful building sequence', async () => {
        const request = mergeDefaults({
            method: 'POST',
            payload: ['/not/on/comp'].map(p => process.cwd() + p),
            url: `/sequence?userId=${danbjoseph.name}&type=directory`
        });
        const r = await server.inject(request);
        const statusCode = r.statusCode;
        expect(statusCode).to.be.eql(400);
    })
})
describe('get', () => {
    it ('replies 200 and sequence images when given valid uuid', async () => {
        const sequenceIdsRequest = mergeDefaults({
            method: 'GET',
            url: `/sequence/info?userId=${danbjoseph.id}`
        });
        const sequenceIdResult = await server.inject(sequenceIdsRequest);
        let statusCode = sequenceIdResult.statusCode;
        const ids = sequenceIdResult.result.ids;

        const specificIdsRequest = mergeDefaults({
            method: 'GET',
            url: `/sequence/${ids[1]}`
        })
        const specificIdsResult = await server.inject(specificIdsRequest);
        statusCode = specificIdsResult.statusCode;
        let imagesFeatureCollection = specificIdsResult.result;
        expect(statusCode).to.be.eql(200);
        expect(gjv.isFeatureCollection(imagesFeatureCollection)).to.be.true;

    })
    it ('replies 400 when given sequence id invalid', async () => {
        const request = mergeDefaults({
            method: 'GET',
            url: `sequence/${uuidv1()}`
        });
        const r = await server.inject(request);
        const statusCode = r.statusCode;
        expect(statusCode).to.eql(400);
    })
    it('replies 200 and schema info that meets provided query parameters', async () => {
        const request = mergeDefaults({
            method: 'GET',
            url: `/sequence/info?userId=${danbjoseph.id}`
        })
        const r = await server.inject(request);
        const ids = r.result.ids;
        const statusCode = r.statusCode;
        const idsSchema = Joi.array().items(Joi.string().guid({ version: [ 'uuidv4' ] }));
        const validation = Joi.validate(ids, idsSchema);
        
        expect(statusCode).to.be.eql(200);
        expect(validation.error).to.be.null;
    });
    it('replies 400 if provided query parameters invalid', async () => {
        const request = mergeDefaults({
            method: 'GET',
            url: `/sequence/info?userId=${uuidv1()}`
        });
        const r = await server.inject(request);
        const statusCode = r.statusCode;

        expect(statusCode).to.eql(400);
    })
});