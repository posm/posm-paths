'use strict';

const chai = require('chai');
const expect = chai.expect;

const flatten = require('../../helpers').flatten;

const server = require('../server');
const mergeDefaults = require('../helpers').mergeDefaults;
const routes =  flatten([ 
    require('../../routes/base').get
]);

const nyc = process.cwd() + '/testData/nyc.geojson';
const baseSequence = require('../../baseSequence').getInstance();

before(async () => {
    await server.liftOff(routes)
    await baseSequence.init(nyc);
})
describe('get', () => {
    it ('replies 200 and sequence images when given valid uuid', async () => {
        
        
        const baseSequenceRequest = mergeDefaults({
            method: 'GET',
            url: '/base?zoom=16&bbox=-74.007491,40.685416,-73.917197,40.733562'
        })
        
        const r = await server.inject(baseSequenceRequest);
        const statusCode = r.statusCode;
        const clusters = JSON.parse(r.payload);

        expect(statusCode).to.eql(200);
        expect(clusters.length).to.not.be.null;
        
    });
})