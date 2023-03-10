// import { Map, View } from 'ol/Map.js'
// import TileLayer from 'ol/layer/Tile.js'
// import OSM from 'ol/source/OSM.js'

// https://openlayers.org/en/latest/apidoc/

window.onload = init // runs init function when window is fully loaded


function init() {

    // // controls
    // const fullScreenControl = new ol.control.FullScreen() // fullscreen toggle top right
    // const mousePositionControl = new ol.control.MousePosition() // shows coordinates on mouse position top right
    // const overviewMapControl = new ol.control.OverviewMap({ // small inset map on bottom left
    //     collapsed: false, // has the overview map open by default (true)
    //     layers: [
    //         new ol.layer.Tile({
    //             source: new ol.source.OSM() // OSM = OpenStreetMap
    //         })
    //     ]
    // })
    // const scaleLineControl = new ol.control.ScaleLine()
    // const zoomSliderControl = new ol.control.ZoomSlider() // adds zoom slider on left screen
    // const zoomToExtentControl = new ol.control.ZoomToExtent() // adds full zoomout shortcut above slider

    const map = new ol.Map({
        view: new ol.View({
            center: [ 0, 0 ],
            zoom: 3,
            // extent: [12400753.576694038, -5658730.000549673, 17174426.336716905, -980228.5067132516],
            // maxZoom: 12, // zoom restrictions
            // minZoom: 2, // zoom restrictions
            // rotation: 0,
            // // rotation: 0.5 // rotates in clockwise direction. arrow in top right corner will reset rotation
            // extent: [12391470.089912523, -5650678.772867478, 17494241.27714418, -961725.7097416269] // values are [minx, miny, maxx, maxy] (far left, bottom, far right, top). setting this will not allow user to pan outside of set coordinates.
        }),
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM(), // OSM = OpenStreetMap
                zIndex: 1, // highest number will be on top!
                visible: false, // set to true by default
                extent: [12400753.576694038, -5658730.000549673, 17174426.336716905, -980228.5067132516],
                // extent: [12391470.089912523, -5650678.772867478, 17494241.27714418, -961725.7097416269], // values are [minx, miny, maxx, maxy] (far left, bottom, far right, top)
                opacity: 0.5,
            })
        ],
        target: "js-map", // targets the div container
        // keyboardEventTarget: document, // allows keyboard panning
        // controls: ol.control.defaults().extend([ // adding on to the default controls
        //     fullScreenControl,
        //     mousePositionControl,
        //     overviewMapControl,
        //     scaleLineControl,
        //     zoomSliderControl,
        //     zoomToExtentControl,
        // ])

        
    })
    
    // Layer Group
    const layerGroup = new ol.layer.Group({
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM({
                    url: 'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
                }),
                zIndex: 0,
                visible: false, // set to true by default
                // extent: [12400753.576694038, -5658730.000549673, 17174426.336716905, -980228.5067132516],
                // extent: [12391470.089912523, -5650678.772867478, 17494241.27714418, -961725.7097416269], // values are [minx, miny, maxx, maxy] (far left, bottom, far right, top)
                opacity: 0.5,
            }),
            // Bing Maps Basemap Layer
            new ol.layer.Tile({
                source: new ol.source.BingMaps({
                    key: 'AuZu48QTf4LDbLHuNfxbMD2HEOu-QRtfBrbCDhS3QeFwU4XEzMyPsFuVtvGHKUzO', // requires a key to use BingMaps!! bingmapsportal.com
                    imagerySet: 'AerialWithLabels', // other options include AerialWithLabels, Road, CanvasDark, CanvasGray, OrdnanceSurvey(not working)
                }),
                visible: false,
            })
        ]
    })
    map.addLayer(layerGroup);

    // CartoDB BaseMap Layer (https://openlayers.org/en/latest/apidoc/module-ol_source_CartoDB-CartoDB.html)
    const cartoDBBaseLayer = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: 'http://{1-4}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png'
            // STYLE OPTIONS: 
                // light_all,
                // dark_all,
                // light_nolabels,
                // light_only_labels,
                // dark_nolabels,
                // dark_only_labels,
                // rastertiles/voyager,
                // rastertiles/voyager_nolabels,
                // rastertiles/voyager_only_labels,
                // rastertiles/voyager_labels_under
        }),
        visible: true
    })
    map.addLayer(cartoDBBaseLayer)

    // TileDebug -- not working currently
    const tileDebugSource = new ol.source.TileDebug()
    const tileDebugLayer = new ol.layer.Tile({
        source: tileDebugSource,
        visible: false,
    })
    map.addLayer(tileDebugLayer)


    // Base Vector Layers
    // Vector Tile Layer OpenStreetMap
    // const openstreetMapVectorTile = new ol.layer.VectorTile({
    //     source: new ol.source.VectorTile({
    //         url: 'https://api.maptiler.com/tiles/v3/{z}/{x}/{y}.pbf?key=eNZMd85Lie6HD3TUfd5e',
    //         format: new ol.format.MVT(),
    //         attributions: '<a href="https://www.maptiler.com/copyright/" target="_blank">?? MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">?? OpenStreetMap contributors</a>',
    //         visible: false,
    //         title: 'VectorTileLayersOpenstreetMap'
    //     })
    // })

    // map.addLayer(openstreetMapVectorTile);

    map.on('click', function(e) {
        console.log(e.coordinate);
    })

    // map.on('click', function(e) {
    //     console.log(e);
    // })
    

//     console.log(ol.control.defaults());

//     const popupContainerElement = document.getElementById('popup-coordinates')
//     const popup = new ol.Overlay({
//         element: popupContainerElement,
//         positioning: 'center-left' // leaves the start of the coordinates coordinates right on the cursor pointer and it reads to the right (instead of below it)
//     })

//     map.addOverlay(popup) // be sure to add it to the map!

//     map.on('click', function(e){
//         const clickedCoordinate = e.coordinate
//         popup.setPosition(undefined); // hides the position -- prevents several popups when clicking multiple times
//         popup.setPosition(clickedCoordinate)
//         popupContainerElement.innerHTML = clickedCoordinate
//     })

//     // dragRotate Interaction
//     const dragRotateInteraction = new ol.interaction.DragRotate({
//         condition: ol.events.condition.altKeyOnly
//     })

//     map.addInteraction(dragRotateInteraction) // be sure to add it to the map!

//     const drawInteraction = new ol.interaction.Draw({
//         type: 'Polygon',
//         freehand: true
//     })

//     map.addInteraction(drawInteraction) // don't forget to add it to the map!

//     drawInteraction.on('drawend', function(e){ // triggers when drawing is stopped
//         // console.log("Drawing finished!");
//         let parser = new ol.format.GeoJSON(); // file format for storing geospacial data in a key: value format.
//         let drawnFeatures = parser.writeFeaturesObject([e.feature]) // writeFeatures accepts an array
//         console.log(drawnFeatures); // can find the coordinates in .features[0].geometry.coordinates
//         console.log(drawnFeatures.features[0].geometry.coordinates);
//     })
}

// init() invoked on line 7 instead