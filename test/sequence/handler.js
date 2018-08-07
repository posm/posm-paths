'use strict';

const Joi = require('joi');
const chai = require('chai');
const expect = chai.expect;

const uuidv4 = require('uuid/v4');

const server = require('../server');
const mergeDefaults = require('../helpers').mergeDefaults;
const users = require('../../db/seeds/users');
const danbjoseph = users[0];
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
// describe('get', () => {
//     it ('replies 200 and username when given valid uuid', async () => {
//     })
//     it ('replies 400 when given user id invalid', async () => {
//     })
// })