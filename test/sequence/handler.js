'use strict';

// const Joi = require('joi');
// const chai = require('chai');
// const expect = chai.expect;

// const uuidv4 = require('uuid/v4');

// const server = require('../server');
// const mergeDefaults = require('../helpers').mergeDefaults;
// const users = require('../../db/seeds/users');
// const danbjoseph = users[0];
// const routes =  [ 
//     // require('../../routes/sequence').get,
//     require('../../routes/sequence').post
// ];

// const db = require('../../connection');

// before(async () => await server.liftOff(routes))
// describe('post', () => {
//     it('replies 200 when sequence post is successful', async () => {
//         try {
//             const request = mergeDefaults({
//                       method: 'POST',
//                       payload: ['/testData/danbjoseph'].map(p => process.cwd() + p),
//                       url: `/sequence?userId=${danbjoseph.id}`
//                   }),
//                   r = await server.inject(request),
//                   statusCode = r.statusCode;
                
//             expect(statusCode).to.be.eql(200);

//         } catch (error) {
//             console.error(error);

//         }
//     })
//     it('replies 400 when unsuccessful because user already in db', async () => {
//     })
// })
// describe('get', () => {
//     it ('replies 200 and username when given valid uuid', async () => {
//     })
//     it ('replies 400 when given user id invalid', async () => {
//     })
// })