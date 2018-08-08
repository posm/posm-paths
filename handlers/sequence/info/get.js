'use strict';

const Boom = require('boom');
const Database = require('../../../db');
const databaseLocation = require('../../../config')[process.env.ENVIRONMENT || 'develop'].db;

const Formatter = require('../../../formatter');

module.exports = async (r, h) => {
	try {
        const whereAnd = Formatter.whereAnd(r.query);
        Database.connect(databaseLocation);
        let sequenceInfo = await Database.getSequenceInfo(whereAnd); 
        if (sequenceInfo.length === 0) {
            return Boom.badRequest('User not in database')
        }
        
        Database.close();
        const sequenceIds = sequenceInfo.map(info => info.seqId);
        return h.response({ ids: sequenceIds }).code(200)

    } catch (error) {
        console.error(error);
        throw error;
    }
}