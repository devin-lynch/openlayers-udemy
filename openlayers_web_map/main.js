// import { Map, View } from 'ol/Map.js'
// import TileLayer from 'ol/layer/Tile.js'
// import OSM from 'ol/source/OSM.js'

// https://openlayers.org/en/latest/apidoc/

window.onload = init // runs init function when window is fully loaded


function init() {

    // controls
    const fullScreenControl = new ol.control.FullScreen() // fullscreen toggle top right
    const mousePositionControl = new ol.control.MousePosition() // shows coordinates on mouse position top right
    const overviewMapControl = new ol.control.OverviewMap({ // small inset map on bottom left
        collapsed: false, // has the overview map open by default (true)
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM() // OSM = OpenStreetMap
            })
        ]
    })
    const scaleLineControl = new ol.control.ScaleLine()
    const zoomSliderControl = new ol.control.ZoomSlider() // adds zoom slider on left screen
    const zoomToExtentControl = new ol.control.ZoomToExtent() // adds full zoomout shortcut above slider

    const map = new ol.Map({
        view: new ol.View({
            center: [-12080385, 7567433],
            zoom: 3,
            maxZoom: 6, // zoom restrictions
            minZoom: 2, // zoom restrictions
            rotation: 0,
            // rotation: 0.5 // rotates in clockwise direction. arrow in top right corner will reset rotation
        }),
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM() // OSM = OpenStreetMap
            })
        ],
        target: "js-map",
        keyboardEventTarget: document, // allows keyboard panning
        controls: ol.control.defaults().extend([ // adding on to the default controls
            fullScreenControl,
            mousePositionControl,
            overviewMapControl,
            scaleLineControl,
            zoomSliderControl,
            zoomToExtentControl,
        ])
    })

    console.log(ol.control.defaults());

    const popupContainerElement = document.getElementById('popup-coordinates')
    const popup = new ol.Overlay({
        element: popupContainerElement,
        positioning: 'center-left' // leaves the start of the coordinates coordinates right on the cursor pointer and it reads to the right (instead of below it)
    })

    map.addOverlay(popup) // be sure to add it to the map!

    map.on('click', function(e){
        const clickedCoordinate = e.coordinate
        popup.setPosition(undefined); // hides the position -- prevents several popups when clicking multiple times
        popup.setPosition(clickedCoordinate)
        popupContainerElement.innerHTML = clickedCoordinate
    })

    // dragRotate Interaction
    const dragRotateInteraction = new ol.interaction.DragRotate({
        condition: ol.events.condition.altKeyOnly
    })

    map.addInteraction(dragRotateInteraction) // be sure to add it to the map!

    const drawInteraction = new ol.interaction.Draw({
        type: 'Polygon',
        freehand: true
    })

    map.addInteraction(drawInteraction) // don't forget to add it to the map!

    drawInteraction.on('drawend', function(e){ // triggers when drawing is stopped
        // console.log("Drawing finished!");
        let parser = new ol.format.GeoJSON(); // file format for storing geospacial data in a key: value format.
        let drawnFeatures = parser.writeFeaturesObject([e.feature]) // writeFeatures accepts an array
        console.log(drawnFeatures); // can find the coordinates in .features[0].geometry.coordinates
        console.log(drawnFeatures.features[0].geometry.coordinates);
    })
}

// init() invoked on line 7 instead