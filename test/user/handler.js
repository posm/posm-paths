'use strict';

const Joi = require('joi');
const chai = require('chai');
const expect = chai.expect;
const server = require('../server');
const mergeDefaults = require('../helpers').mergeDefaults;
const newUserPayload = require('../../testData/payloads').postUser[0];
const oldUserPayload = require('../../testData/payloads').postUser[1];
const routes =  [ 
    require('../../routes/user').post
];

before(async () => await server.liftOff(routes))
describe('post', () => {
    it('replies 200 when successful adding user to db', async () => {
        try {
            const request = mergeDefaults({
                      method: 'POST',
                      payload: newUserPayload,
                      url:'/user'
                  }),
                  r = await server.inject(request),
                  statusCode = r.statusCode;

            expect(statusCode).to.equal(200);

        } catch (error) {
            console.error(error);

        }
    })
    it('replies 400 when unsuccessful because user already in db', async () => {
        try {
            const request = mergeDefaults({
                      method: 'POST',
                      payload: oldUserPayload,
                      url: '/user'
                  }),
                  r = await server.inject(request),
                  statusCode = r.statusCode;

            expect(statusCode).to.equal(400);

        } catch (error) {
            console.error(error);
        }
    })
})
