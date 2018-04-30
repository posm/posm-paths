'use strict';

exports.date = (tags) => tags.GPSDateTime.toString();

exports.loc = (tags) => { 
    return {
        lat: Number(tags.GPSLatitude),
        lon: Number(tags.GPSLongitude)
    }
}