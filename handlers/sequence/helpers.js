'use strict';

/**
 * Provided parameters for a sequence and its images,
 * inserts images into the image table
 * @param {String} sequenceId sequence uuid
 * @param {Array} sequence list of sequence images
 * @param {String} userId user uuid
 */
exports.insertImages = (sequenceId, sequence, userId) => {
	Promise.map(sequence, image => {
		return `(${image.id}, ${image.image}, ${image.timestamp}, ${sequenceId}, ${userId}, ${loc}),`
	})
	.then(async (values) => {
		try {
			await db.raw(
				`INSERT INTO Images (
					id, path, time, seqId, userId, loc	
				) VALUES ${values}`
			)
		} catch (e) {
			throw e;
		}
	})
	.catch((error) => { throw error });

}

/**
 * Provided parameters for a sequence record,
 * inserts sequence into Sequences table
 * @param {String} sequenceId sequence uuid
 * @param {Array} sequence list of sequence images
 * @param {String} userId user uuid
 */
exports.insertSequence = (sequenceId, sequence, userId) => {
	Promise.map(sequence, image => { return { id : image.id, loc: image.loc }})
	.then(async (sequenceImages) => {
		try {	
			await db.raw(
				`INSERT INTO Sequences (
					id, userId, images
				) VALUES (${sequenceId}, ${userId}, JSON(${sequenceImages})`
			)
		} catch (e) {
			throw e;
		}
	})
	.catch((error) => { throw error });
	
}