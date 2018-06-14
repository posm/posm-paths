'use strict';

const db = require('../../connection');

/**
 * Provided parameters for a sequence and its images,
 * inserts images into the image table
 * @param {Array} sequence list of sequence images
 */
exports.insertImages = async (sequenceMap) => {
	const sequenceId = sequenceMap.sequenceId,
		  userId = sequenceMap.userId,
		  sequence = sequenceMap.sequence;
		
	try {
		let values = await Promise.map(sequence, image => `${image.id}, ${image.image}, ${image.timestamp}, ${sequenceId}, ${userId}, GeomFromText('POINT(${image.loc.lat} ${image.loc.lon})'))`)
		values = `(${values.join(',\n')})`
	
		await db.raw(`
			SELECT load_extension('mod_spatialite');
			INSERT INTO Images (
				id, path, time, seqId, userId, loc
			) VALUES ${values}
		`)

	} catch (error) {
		console.error(error);
		throw error;

	}
}

/**
 * Provided parameters for a sequence record,
 * inserts sequence into Sequences table
 * @param {Array} sequence list of sequence images
 */
exports.insertSequence = (sequence) => {
	const sequenceId = sequence.sequenceId,
		  userId = sequence.userId;
		  
	Promise.map(sequence, image => { return { id : image.id, loc: image.loc }})
	.then(async (sequenceImages) => {
		try {	
			await db.raw(`
				INSERT INTO Sequences (
					id, userId, images
				) VALUES (${sequenceId}, ${userId}, JSON(${sequenceImages})
			`)
		} catch (e) {
			throw e;
		}
	})
	.catch((error) => { throw error });
	
}