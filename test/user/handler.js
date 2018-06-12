'use strict';

const Joi = require('joi');
const chai = require('chai');
const expect = chai.expect;

const uuidv4 = require('uuid/v4');

const server = require('../server');
const mergeDefaults = require('../helpers').mergeDefaults;
const oldUserPayload = require('../../testData/payloads').postUser;
const routes =  [ 
    require('../../routes/user').get,
    require('../../routes/user').post
];

before(async () => await server.liftOff(routes))
describe('post', () => {
    it('replies 200 when successful adding user to db', async () => {
        try {
            // thanks stack exchange
            // https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
            let fakeName = '',
                letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

            for (let i = 0; i < 5; i++) {
                fakeName += letters.charAt(Math.floor(Math.random() * letters.length));
            }
            const request = mergeDefaults({
                      method: 'POST',
                      payload: { name: fakeName },
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
                      payload: { name: oldUserPayload.name },
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
describe('get', () => {
    it ('replies 200 and username when given valid uuid', async () => {
        try {
            const request = mergeDefaults({
                      method: 'GET',
                      url: `/user/${oldUserPayload.id}`
                  }),
                  r = await server.inject(request),
                  statusCode = r.statusCode,
                  result = r.result;

            expect(result.upload).to.equal('successful');
            expect(result.name).to.equal(oldUserPayload.name);
            expect(statusCode).to.equal(200);

        } catch (error) {
            console.error(error);
        }
    })
    it ('replies 400 when given user id invalid', async () => {
        try {
            const request = mergeDefaults({
                      method: 'GET',
                      url: `/user/${uuidv4()}`
                  }),
                  r = await server.inject(request),
                  statusCode = r.statusCode;

            expect(statusCode).to.equal(400);
        } catch (error) {
            console.error(error);
        }
    })
})
