const expect = require('chai').expect;  

const baseSequence = require('../../baseSequence').getInstance();
const nyc = process.cwd() + '/testData/nyc.geojson';

describe('baseSequence', () => {
    describe('init', () => {
        it('#generates sets up event emitter and tile source for provided or default tiles', async () => {
            await baseSequence.init(nyc);
            expect(baseSequence.tileLoc).to.eql(nyc);
            return;
        })
    })
    describe('#fromPoint', () => {
        it('returns tile given xyz', async () => {
            await baseSequence.init(nyc)
            const tiles = baseSequence.fromPoint(13,-73.9751,40.6268)
            expect(tiles).to.deep.equal([13, 2412, 3082]); 
            return;
        });
    })

    describe('#clusters', () => {
        it('returns clusters for given bbox and zoom', async () => {
            await baseSequence.init(nyc);
            const bbox = [-74.007491,40.685416,-73.917197,40.733562]
            const clusters = baseSequence.clusters(bbox, 15);
            expect(clusters.length).to.eql(1217);
            // expect(clusters[0].point_count).to.eql(4);
        })
    })
    describe('#getTiles', () => {
        it('returns tiles found in tile matching given point & zoom', () => {
            const tiles = baseSequence.getTiles(13,-73.9751,40.6268)
            expect(tiles.features.length).not.to.be.null;
        });
        it('returns null if no tiles found', () => {
            const tiles = baseSequence.getTiles(13, 0, 0);
            expect(tiles).to.be.null;
        });
    });
});