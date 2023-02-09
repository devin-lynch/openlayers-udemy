import { Map, View } from 'ol/Map.js'
import TileLayer from 'ol/layer/Tile.js'
import OSM from 'ol/source/OSM.js'

window.onload = init // runs init function when window is fully loaded


function init() {
    const map = new Map({
        view: new ol.View({
            center: [0, 0],
            zoom: 2
        }),
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        target: "js-map"
    })
}

// init() line 5 instead