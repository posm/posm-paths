'use strict';

const db = require('../../connection');
const fs = require('fs-extra');

/**
 * Provided parameters for a sequence and its images,
 * inserts images into the image table
 * @param {Array} sequence list of sequence images
 */
exports.insertImagesSequence = async (sequenceMap) => {		
	try {
		const sequenceId = sequenceMap.sequenceId,
			  userId = sequenceMap.userId;

		let imageInserts = [],
		    imageFeatures = [];

		sequenceMap.sequence.forEach((image, index) => {
			imageInserts.push(`
				INSERT INTO Images (
					id, path, time, seqIdx, seqId, userId, loc
				) VALUES (
					'${image.id}', 
					'${image.image}', 
					'${image.timestamp}', 
					 ${index},
					'${sequenceId}', 
					'${userId}', 
					GeomFromText('POINT(${image.loc.lat} ${image.loc.lon})', 4326)
				);`
			);
			imageFeatures.push({
				type: 'Feature',
				geometry: {
				type: 'Point',
					coordinates: [image.loc.lon, image.loc.lat]
				},
				properties: { id: image.id }
			})
		});

		db.raw(`
			INSERT INTO Sequences (
				id, userId, images
			) VALUES (
				'${sequenceId}', 
				'${userId}', 
				json('${JSON.stringify(imageFeatures)}')
			);
			SELECT load_extension("mod_spatialite");
			${imageInserts}
		`)
		.then((res) => {console.log(res)})
		.then((error) => {console.error(error)})

	} catch (error) {
		console.error(error);
		throw error;

	}
}

// /**
//  * Provided parameters for a sequence record,
//  * inserts sequence into Sequences table
//  * @param {Array} sequence list of sequence images
//  */
// exports.insertSequence = async (sequenceMap) => {
// 	try {
// 		// adapt images into list of geojson point features; thanks geojson homepage -> http://geojson.org/
// 		const imageFeatures = await Promise.map(sequenceMap.sequence, image => { 
// 			return {
// 				type: 'Feature',
// 				geometry: {
// 					type: 'Point',
// 					coordinates: [image.loc.lat, image.loc.lon]
// 				},
// 				properties: { id: image.id }
// 			}
// 		});

// 		await db('Sequences').insert({
// 			id: sequenceMap.sequenceId,
// 			userId: sequenceMap.userId,
// 			images: JSON.stringify(imageFeatures)
// 		})
	      
	
// 		await fs.writeFile('values.txt', 'surf');
// 	} catch (error) {
// 		console.error(error);
// 		throw error;
// 	}
// }