'use strict';

Promise = require('bluebird')

const readdir = require('fs-extra').readdir;
const path = require('path');
const ExifTool = require('exiftool-vendored');
const exif = new ExifTool();
const uuidv4 = require('uuid/v4');
const dayjs = require('dayjs');

class Sequence {
    constructor () {}

    build (source, type, minCutDist, maxCutDist, maxDelta, seqSize, userId) {
        return fromSource(source, type).then(images => {
            const params = {
                maxDist: maxCutDist,
                minDist: minCutDist,
                maxDelta: maxDelta,
                size: seqSize
            }
            return this.cut(flatten(images), params).then(sequences => {
                return sequences.map(sequence => {
                    sequence.userId = userId;
                    return sequence;
                })
                .catch((err) => { throw err; });
            })
            .catch((err) => { throw err; })
        })
        .catch((err) => { throw err; })
    }

    cut(images, params) {
        return Promise
            .map(images, (image) => meta(image))
            .then(metas => split(metas, params))
    }

    fromSource(source, type) {
        if (type === 'directory') {
            return Promise.map(source, (dir) => {
                return readdir(dir)
                    .then(files => files.map(f => path.join(p, f)))
            })
        }
    }

    makeDate() {
        return dayjs(tags.GPSDateTime.toString());
    }

    makeLoc(tags) {
        return {
            lon: Number(tags.GPSLongitude),
            lat: Number(tags.GPSLatitude)
        }
    }

    meta(image) {
        return exif.read(image).then(tags => {
            return {
                image: image,
                loc: makeLoc(tags),
                timestamp: makeDate(tags),
                id: uuidv4()
            }
        })
        .catch(err => { throw err; });
    }

    split(metas, params) {
        const sortedMetas = metas.sort((a, b) => a.timestamp - b.timestamp);
        const pelIndex = sortedMetas.length - 2;
        const sequences = [];
        const maxDist = params.maxDist;
        const maxDelta = params.maxDelta;
        const maxSize = params.maxSize;
        const minDist = params.minDist;
        let currentSequence = [];

        sortedMetas.slice(0 , pelIndex).forEach((meta, i) => {
            const partnerMeta = sortedMetas[i + 1],
                  distance = calcDistance(meta.loc, partnerMeta.loc),
                  tooClose = distance < minDist;
            
            // ... if image is not too close to its partner, add it to a sequence.
            if (!tooClose) {
                // ... if the current sequence length matches the maximum size,
                //     or images are too far apart (in space or time), 
                //     add the current sequence to the sequence map, then make a new sequence.
                const delta = calcDelta(meta.timestamp, partnerMeta.timestamp),
                      needNewSequence = currentSequence.length === maxSize || distance > maxDist || delta > maxDelta;
    
                if (needNewSequence) {
                    addSequence(sequences, currentSequence);
                    currentSequence = [];
    
                }
                
                // add a uuid then add it to the sequence!
                meta.id = uuidv4();
                currentSequence.push(meta);
    
            }  
        })

        if (currentSequence.length > 0) addSequence(sequences, currentSequence);
        return sequences;
    }
}

module.exports = Sequence;