// import { Map, View } from 'ol/Map.js'
// import TileLayer from 'ol/layer/Tile.js'
// import OSM from 'ol/source/OSM.js'

window.onload = init // runs init function when window is fully loaded


function init() {
    const map = new ol.Map({
        view: new ol.View({
            center: [-12080385, 7567433],
            zoom: 3,
            maxZoom: 6, // zoom restrictions
            minZoom: 2, // zoom restrictions
            rotation: 0.5 // rotates in clockwise direction. arrow in top right corner will reset rotation
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