'use strict';

const Boom = require('boom');
const BaseSequence = require('../../baseSequence');
const baseSequence = BaseSequence.getInstance();

module.exports = async (r, h) => {
	try {
        
        const bbox = r.query.bbox.split(',').map(c => Number(c));
        const zoom = Number(r.query.zoom);

        const clusters = baseSequence.clusters(bbox, zoom);

        if (!clusters.length) {
            return Boom.badRequest('No images in the database!')
        }
        
        return h.response(clusters).code(200)
    } catch (error) {
        console.error(error);
        throw error;
    }
}