'use strict';

const Joi = require('joi');
const chai = require('chai');
const expect = chai.expect;

const uuidv4 = require('uuid/v4');

const server = require('../server');
const mergeDefaults = require('../helpers').mergeDefaults;
const oldUserPayload = require('../../testData/payloads').postUser;
const routes =  [ 
    // require('../../routes/sequence').get,
    require('../../routes/sequence').post
];

before(async () => await server.liftOff(routes))
describe('post', () => {
    it('replies 200 when sequence post is successful', async () => {
        try {
            const request = mergeDefaults({
                      method: 'POST',
                      payload: ['/testData/danbjoseph'].map(p => process.cwd() + p),
                      url: '/sequence?userId=6cc99b2f-a00a-45c3-a74b-d532547dd852'
                  }),
                  r = await server.inject(request),
                  statusCode = r.statusCode;
                
            
            expect(statusCode).to.be.eql(200);

        } catch (error) {
            console.error(error);

        }
    })
//     it('replies 400 when unsuccessful because user already in db', async () => {
//     })
})
// describe('get', () => {
//     it ('replies 200 and username when given valid uuid', async () => {
//     })
//     it ('replies 400 when given user id invalid', async () => {
//     })
// })