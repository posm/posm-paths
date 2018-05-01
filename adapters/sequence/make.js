'use strict';

const dayjs = require('dayjs')

exports.date = (tags) => dayjs(tags.GPSDateTime.toString());

exports.loc = (tags) => { 
    return {
        lat: Number(tags.GPSLatitude),
        lon: Number(tags.GPSLongitude)
    }
}