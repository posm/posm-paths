'use strict'

const d3_dispatch = require('d3-dispatch').dispatch;
// const geojsonvt = require('geojson-vt');
const superCluster = require('supercluster');

const singleton = Symbol();
const singletonEnforcer = Symbol();

const Database = require('../db')
const databaseLocation = require('../config')[process.env.ENVIRONMENT || 'develop'].db;
const baseLocation = require('../config')[process.env.ENVIRONMENT || 'develop'].base;
const writeFile = require('fs-extra').writeFile;
const readFile = require('fs-extra').readFile;
const exists = require('fs-extra').exists;

class BaseSequence {
    constructor(enforcer) {
        if (enforcer !== singletonEnforcer) {
            throw new Error('Cannot construct singleton');
        };
    }
    static getInstance() {
        if (!this[singleton]) {
            this[singleton] = new BaseSequence(singletonEnforcer);
        }
        return this[singleton];
    }

    get tileLoc() {
        return this._tileLoc;
    }
    
    get tileIndex() { 
        return this._tileIndex;
    }

    async rebuild() {
        try {
            Database.connect(databaseLocation);
            const sequences = await Database.getAllImages();
            await writeFile(baseLocation, JSON.stringify(sequences));
            Database.close(); 
            return;
        } catch (err) {
            throw err;
        }
    }

    async init(tileLoc) {
        this._tileLoc = tileLoc || baseLocation;
        this._tileIndex = superCluster({ radius: 40, maxZoom: 16 });
        if (await exists(this._tileLoc)) {
            await this.retile()
        }
        const that = this;
    
        this._dispatcher = d3_dispatch('rebuild', 'tile');
        this._dispatcher.on('rebuild', async () => {
            try {
                await that.rebuild();
                await that.retile(); 
                return;
            } catch (err) {
                throw err;
            }
        })

        this._dispatcher.on('tile', (_) => {
            that.tile.apply(that, arguments);
        })
    }

    async retile() {
        try {
            const geojson = await readFile(this._tileLoc).then((res) => JSON.parse(res.toString('utf-8')));
            this._tileIndex.load(geojson.features);
            return;
        } catch (err) {
            throw err;
        }
    }

    // https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#Lon..2Flat._to_tile_numbers_2
    fromPoint(zoom,lon,lat) {
        const tileX = (Math.floor((lon+180)/360*Math.pow(2,zoom)))
        const tileY = (Math.floor((1-Math.log(Math.tan(lat*Math.PI/180) + 1/Math.cos(lat*Math.PI/180))/Math.PI)/2 *Math.pow(2,zoom)))
        return [zoom,tileX,tileY]
    }

    clusters(bbox, zoom) {
        return this._tileIndex.getClusters(bbox, zoom);
    }

    getTiles(z,x,y) {
        return this._tileIndex.getTile.apply(this._tileIndex, this.fromPoint(z,x,y));
    }

    call(_) {
        this._dispatcher.call.apply(this._dispatcher, arguments);
    }

}

module.exports = BaseSequence;

