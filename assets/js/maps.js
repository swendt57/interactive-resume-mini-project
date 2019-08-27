// These stop cloud9 from complaining
/* global $ */
/* global google */
/* global mapSrc */

//TODO move this to external file
const apiKey = "AIzaSyD9Hxr-55XV9DtkcRQqR7bPtFMX8EM5kqI";
const mapSrc = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;

// node class key: AIzaSyA6CSwrxY1WzAX4BJj8an7UXuQWSRakXa0

$.getScript(mapSrc, function() {
    console.log("map api loaded");
});

function initMap() {
    let map = new google.maps.Map(document.getElementById("map"), {
        zoom: 3,
        center: {
            lat: 46.619261,
            lng: -33.134766
        }
    });

    let labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    let locations = [
        { lat: 40.785091, lng: -73.968285 },
        { lat: 41.084045, lng: -73.874256 },
        { lat: 40.754932, lng: -73.984016 },
        { lat: 32.729529, lng: -117.096421 }
    ];

    //this is a JS function, not a Google one
    let markers = locations.map(function(location, i) {
        return new google.maps.Marker({
            position: location,
            label: labels[i % labels.length]
        });
    });

    let markerCluster = new MarkerClusterer(map, markers, { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });

}