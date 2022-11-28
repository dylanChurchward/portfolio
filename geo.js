

var map_2 = L.map('map_2').setView([46.1914, -122.1956], 13);
L.tileLayer('https://api.maptiler.com/maps/outdoor-v2/{z}/{x}/{y}.png?key=fmh8Jdc7o7BTaDnW6sh0', {
    maxZoom: 30,
    tileSize: 512,
    zoomOffset: -1
}).addTo(map_2);

var layerGroup = L.layerGroup().addTo(map_2);

// define all available volcanoes 
const helens = {lat: "46.1914", lon: "-122.1956", start:"1980-05-05", end:"1980-05-19", quakesByDate: ""};

// volcano currently being displayed. starts with st. helens, can by changed by the user dynamically 
var currentVolcano = helens;

// array of all volcanoes
const volcanoes = [];
volcanoes.push(helens);


// Collect seismic activity information from the earthquake API 
async function queryForQuakes(theVolcano) {
    const url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=` + theVolcano.start + `&endtime=` + theVolcano.end + `&latitude=` + theVolcano.lat + `&longitude=` + theVolcano.lon + `&maxradiuskm=3`

    const response = await fetch(url, {
        method: 'GET'
    });

    // save earthquake data to theVolcano object 
    var quakes = await response.json();
    quakes = quakes.features; 

    var quakesByDate = new Map();
    var volcanoDataGathered = 0;
    const volcanoCount = 1;


    // collect quake info by date, store in a map containing keys: dates, values: arrays of earthquakes 
    for (i = 0; i < quakes.length; i++) {
        var time = quakes[i].properties.time;
        var fullDate = new Date(time);
        var date = fullDate.getFullYear() + "-" + fullDate.getMonth() + "-" + fullDate.getDate();

        if (quakesByDate.has(date)) {
            quakesByDate.get(date).push(quakes[i]); // if quakesByDate already has an array of quakes for this date, add this quake to the array 
        } else {
            quakesByDate.set(date, [quakes[i]]); // if quakesByDate doesn't have an array for this date, create one including this quake 
        }

    }

    // save quakeByDate to each volcano object 
    theVolcano.quakesByDate = quakesByDate;

    volcanoDataGathered++;

    if (volcanoDataGathered == volcanoCount) {
        // call function to make all buttons clickable 
    } else {
        // display a loading thing?? 
        // buttons remain unclickable 
    }
}


const geojsonMarkerOptions = {
    radius: 5,
    fillColor: "#0000FF",
    color: "#0000",
    weight: 5,
    opacity: 1,
    fillOpacity: 0.6
}

// adds markers to the map for each earthquake near the given volcano on the given day
function displayQuakes(theVolcano, theDay) {
    console.log(theVolcano)
    var quakes = theVolcano.quakesByDate.get(Array.from(theVolcano.quakesByDate.keys())[theDay]);

    console.log(theVolcano)

    // iterate through each earthquake and add a pin for each one. magnitude * 2 = radius of pin 
    for (i = 0; i < quakes.length; i++) {

        const geojsonMarkerOptions = {
            radius: quakes[i].properties.mag * 2,
            fillColor: "#0000FF",
            color: "#0000",
            weight: 5,
            opacity: 1,
            fillOpacity: 0.6
        }

        var circle = L.circleMarker([quakes[i].geometry.coordinates[1], quakes[i].geometry.coordinates[0]], geojsonMarkerOptions).addTo(layerGroup);
    }
}

// Buttons!

function selectButton(theButton) {
    var jquery = "#" + theButton;
    layerGroup.clearLayers();
    console.log(jquery)
    $(".day").css({"background-color": "gray"});
    $(jquery).css({ "background-color": "#f55702"});
    displayQuakes(currentVolcano, theButton);
}


$("#0").on("click", function() {
    selectButton(0);
})

$("#1").on("click", function() {
    selectButton(1);
})

$("#2").on("click", function() {
    selectButton(2);
})

$("#3").on("click", function() {
    selectButton(3);
})

$("#4").on("click", function() {
    selectButton(4);
})

$("#5").on("click", function() {
    selectButton(5);
})

$("#6").on("click", function() {
    selectButton(6);
})

$("#7").on("click", function() {
    selectButton(7);
})

$("#8").on("click", function() {
    selectButton(8);
})

$("#9").on("click", function() {
    selectButton(9);
})

$("#10").on("click", function() {
    selectButton(10);
})

$("#11").on("click", function() {
    selectButton(11);
})

$("#12").on("click", function() {
    selectButton(12);
})

$("#13").on("click", function() {
    selectButton(13);
})

$("#14").on("click", function() {
    selectButton(14);
})









// collect earthquake data from earthquake API for each volcano we are interested in 
volcanoes.forEach(queryForQuakes);


