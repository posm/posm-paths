'use strict';

const fc = require('turf-featurecollection');
const flatten = require('../helpers').flatten;

let instance;

class Formatter {
    constructor() {
        if (!Formatter.instance) {
            Formatter.instance = this;
        }
        return Formatter.instance
    }
    toFeatureCollection(rows) {
        try {
            const features = rows.map(row => {
                const base = { type: 'Feature' }
                let properties = {};
                const geometry = JSON.parse(row['geometry']);
                delete row['geometry'];
                Object.entries(row).forEach(entry => properties = Object.assign(properties, { [entry[0]] : entry[1] }));
                return Object.assign(base, { geometry: geometry, properties: properties });
            })
                
            return fc(features);
        } catch (err) {
            throw err;
        }
        
    }
    whereAnd(config) {
        const conditionals = Object.entries(config).map(entry => {
            const colKey = entry[0];
            const values = flatten([`'${entry[1]}'`]).join(',');
            return `${colKey} IN (${values})`; 
        }).join(' AND ');
        return `WHERE ${conditionals}`;
    }
}

instance = new Formatter();
Object.freeze(instance);
module.exports = instance;