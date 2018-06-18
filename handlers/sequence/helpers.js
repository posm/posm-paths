'use strict';

const db = require('../../connection');

/**
 * Provided parameters for a sequence and its images,
 * inserts images into the image table
 * @param {Array} sequence list of sequence images
 */
exports.insertImages = async (sequenceMap) => {		
	try {
		const sequenceId = sequenceMap.sequenceId,
			  userId = sequenceMap.userId;

		let values = await Promise.map(sequenceMap.sequence, image => `('${image.id}', '${image.image}', '${image.timestamp}', '${sequenceId}', '${userId}', GeomFromText('POINT(${image.loc.lat} ${image.loc.lon})'))`);
		console.log(values.slice(0,5).join(','))
		await db.raw(`
			SELECT load_extension('mod_spatialite');
			INSERT INTO Images (
				id, path, time, seqId, userId, loc
			) VALUES ${values.join(',')}
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
exports.insertSequence = async (sequenceMap) => {
	try {
		// adapt images into list of geojson point features
		// thanks geojson homepage -> http://geojson.org/
		const imageFeatures =  await Promise.map(sequenceMap.sequence, image => { 
			return {
				type: 'Feature',
				geometry: {
					type: 'Point',
					coordinates: [image.loc.lat, image.loc.lon]
				},
				properties: { id: image.id }
			}
		});

		await db.raw(`
	        INSERT INTO Sequences (
				id, userId, images
			) VALUES (
				'${sequenceMap.sequenceId}',
				'${sequenceMap.userId}',
				json('${JSON.stringify(imageFeatures)}')
			);
		`)
	
	} catch (error) {
		console.error(error);
		throw error;
	}
}