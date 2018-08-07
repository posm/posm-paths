'use strict';

Promise = require('bluebird')

const readdir = require('fs-extra').readdir;
const path = require('path');
const { ExifTool } = require('exiftool-vendored');
const exif = new ExifTool();
const uuidv4 = require('uuid/v4');
const dayjs = require('dayjs');
const flatten = require('../../helpers').flatten;

let instance;

class Sequence {
    constructor () {
        if (!Sequence.instance) {
            Sequence.instance = this;
        }
        return Sequence.instance;
    }

    addSequence (sequences, sequence) {
        sequences.push({ sequenceId: uuidv4(), sequence: sequence });
        return sequences;
    }

    build (source, type, minCutDist, maxCutDist, maxDelta, seqSize, userId) {
        return this.fromSource(source, type).then(images => {
            const params = {
                maxDist: maxCutDist,
                minDist: minCutDist,
                maxDelta: maxDelta,
                size: seqSize
            }
            return this.cut(flatten(images), params).then(sequences => {
                if (userId) {
                    sequences.map(sequence => {
                        sequence.userId = userId;
                        return sequence;
                    })
                }
                return sequences
            })
            .catch((err) => { throw err; })
        })
        .catch((err) => { throw err; })
    }

    calcDelta(date, nextDate) {
        return nextDate.diff(date) / 1000;
    }

    // https://gist.github.com/rochacbruno/2883505
    calcDistance(loc, nextLoc) {
        const R = 6371e3;
        const diffLat = this.toRadian(nextLoc.lat) - this.toRadian(loc.lat);
        const diffLon = this.toRadian(nextLoc.lon) - this.toRadian(loc.lon);
        const a = Math.sin(diffLat / 2) * Math.sin(diffLat / 2) + Math.cos(this.toRadian(loc.lat)) *
                  Math.cos(this.toRadian(nextLoc.lat)) * Math.sin(diffLon / 2) * Math.sin(diffLon / 2);
        
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));    
        return R * c;
    }   

    cut(images, params) {
        return Promise
            .map(images, (image) => this.meta(image))
            .then(metas => this.split(metas, params))
    }

    fromSource(source, type) {
        if (type === 'directory') {
            return Promise.map(source, (dir) => {
                return readdir(dir)
                    .then(files => files.map(f => path.join(dir, f)))
            })
        }
    }

    makeDate(tags) {
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
                loc: this.makeLoc(tags),
                timestamp: this.makeDate(tags),
                id: uuidv4()
            }
        })
        .catch(err => { throw err; });
    }

    toRadian(coord) {
        return coord * (Math.PI / 100)
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
                  distance = this.calcDistance(meta.loc, partnerMeta.loc),
                  tooClose = distance < minDist;
            
            // ... if image is not too close to its partner, add it to a sequence.
            if (!tooClose) {
                // ... if the current sequence length matches the maximum size,
                //     or images are too far apart (in space or time), 
                //     add the current sequence to the sequence map, then make a new sequence.
                const delta = this.calcDelta(meta.timestamp, partnerMeta.timestamp),
                      needNewSequence = currentSequence.length === maxSize || distance > maxDist || delta > maxDelta;
    
                if (needNewSequence) {
                    this.addSequence(sequences, currentSequence);
                    currentSequence = [];
    
                }
                
                // add a uuid then add it to the sequence!
                meta.id = uuidv4();
                currentSequence.push(meta);
    
            }  
        })

        if (currentSequence.length > 0) this.addSequence(sequences, currentSequence);
        return sequences;
    }
}

instance = new Sequence();
Object.freeze(instance);
module.exports = instance;