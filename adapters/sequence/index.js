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

    addSequence (sequences, images) {
        sequences.push({ sequenceId: uuidv4(), images: images });
        return sequences;
    }

    build (source, type, userId, params) {
        return this.fromSource(source, type).then(images => {
            return this.cut(flatten(images), params || {}).then(sequences => {
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
        return nextDate.diff(date) / 1000; // second difference
    }

    // https://www.movable-type.co.uk/scripts/latlong.html
    // response is in meters
    calcDistance(loc, nextLoc) {
        const R = 6371e3; // meters
        const radLat1 = this.toRadian(loc.lat);
        const radLat2 = this.toRadian(nextLoc.lat)
        const radDiffLat = this.toRadian(nextLoc.lat - loc.lat);
        const radDiffLon = this.toRadian(nextLoc.lon - loc.lon);

        const a = Math.sin(radDiffLat/2) * Math.sin(radDiffLat/2) +
                  Math.cos(radLat1) * Math.cos(radLat2) *
                  Math.sin(radDiffLon/2) * Math.sin(radDiffLon/2);

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
        if (tags.GPSDateTime === undefined) console.log(tags);
        return dayjs(tags.GPSDateTime.toString())
    }

    makeLoc(tags) {
        return {
            lon: Number(tags.GPSLongitude),
            lat: Number(tags.GPSLatitude)
        }
    }

    meta(image) {
        return exif.read(image).then(tags => {
            const spatial = !tags.hasOwnProperty('GPSLongitude') && !tags.hasOwnProperty('GPSLatitude');
            if (spatial) {
                return {
                    image: image,
                    loc: this.makeLoc(tags),
                    timestamp: this.makeDate(tags),
                    id: uuidv4()
                }
            } else {
                return {}
            }
        })
        .catch(err => { throw err; });
    }

    toRadian(coord) {
        return coord * (Math.PI / 180)
    }
    
    split(metas, params) {
        metas = metas.sort((a, b) => a.timestamp - b.timestamp);
        const sequences = [];
        const minDist = params.minDist || 0.5; // meters, half a meter
        const maxDist = params.maxDist || 300;
        const maxDelta = params.maxDelta || 120; // seconds, 2 minutes a part
        const maxSize = params.maxSize || 100;
        let currentImages = [];

        for (let i = 0, metasLength = metas.length; i < metasLength; i++) {
            const meta = metas[i]
            meta.id = uuidv4();
            
            if (i === metasLength - 1) {
                currentImages.push(meta)                
            } else {

                const partnerMeta = metas[i + 1];
                const distance = this.calcDistance(meta.loc, partnerMeta.loc);
                const tooClose = distance < minDist;
                
                // ... if image is not too close to its partner, add it to a sequence.
                if (!tooClose) {
                    // ... if the current sequence length matches the maximum size,
                    //     or images are too far apart (in space or time), 
                    //     add the current sequence to the sequence map, then make a new sequence.
                    const delta = this.calcDelta(meta.timestamp, partnerMeta.timestamp);
                    const needNewSequence = currentImages.length === maxSize || distance > maxDist || delta > maxDelta;
                    if (needNewSequence) {
                        this.addSequence(sequences, currentImages);
                        currentImages = [];
        
                    }
                    // add a uuid then add it to the sequence!
                    currentImages.push(meta);
                }  
            }
        }

        if (currentImages.length > 0) this.addSequence(sequences, currentImages);
        return sequences;
    }
}

instance = new Sequence();
Object.freeze(instance);
module.exports = instance;