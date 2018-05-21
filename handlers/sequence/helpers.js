'use strict';

exports.insertImages = (sequenceId, userId sequences) => {
	const sequence = sequences[sequenceId];

	Promise.map(sequence, image => {
		return Object
			     .values(image)
			     .concat([sequenceId, userId])
				 .join(',');
	})
	.then((values) => `the insert`)
	.catch((error) => { throw error });

}
