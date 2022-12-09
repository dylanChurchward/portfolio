

var map_2 = L.map('map_2').setView([46.1970, -122.19], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 30,
    // tileSize: 512,
    // zoomOffset: -1
}).addTo(map_2);

var layerGroup = L.layerGroup().addTo(map_2);

// define all available volcanoes 
const helens = {name: "Mount Saint Helens", id: "helens", lat: "46.1914", lon: "-122.1956", start:"1980-05-03", end:"1980-05-19", quakesByDate: ""};
const kilauea = {name: "Kilauea", id: "kilauea", lat: "19.4069", lon: "-155.2834", start:"2021-09-12", end:"2021-9-30", quakesByDate: ""};


// volcano currently being displayed. starts with st. helens, can by changed by the user dynamically 
var volcano = helens;

// the day currently being displayed 
var day;

var lat = volcano.lat;
var lon = volcano.lon;

// array of all volcanoes
const volcanoes = [];
volcanoes.push(helens);
volcanoes.push(kilauea);

$("#volcano_name").html(volcano.name);


// Collect seismic activity information from the earthquake API 
async function queryForQuakes(theVolcano) {
    const url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=` + theVolcano.start + `&endtime=` + theVolcano.end + `&latitude=` + theVolcano.lat + `&longitude=` + theVolcano.lon + `&maxradiuskm=3`

    const response = await fetch(url, {
        method: 'GET'
    });

    // collect earthquake features 
    var quakes = await response.json();
    quakes = quakes.features; 

    // map for earthquake features to be collected in, arranged by date 
    var quakesByDate = new Map();
    var volcanoDataGathered = 0;
    const volcanoCount = 1;

    // populate map with appropriate dates, so none are skipped on days without seismic activity
    for (i = 15; i >= 0; i--) {
        var date = theVolcano.start.split("-");
        date = date[0] + "-" + (parseInt(date[1]) - 1) + "-" + (parseInt(date[2]) + i);
        quakesByDate.set(date, []);
    }

    // collect quake info by date, store in a map containing keys: dates, values: arrays of earthquakes 
    for (i = 0; i < quakes.length; i++) {
        var time = quakes[i].properties.time;
        var fullDate = new Date(time);
        var date = fullDate.getFullYear() + "-" + fullDate.getMonth() + "-" + fullDate.getDate();

        // filter out seismic activity from unwanted range
        if (quakesByDate.has(date)) {
            quakesByDate.get(date).push(quakes[i]); // if quakesByDate already has an array of quakes for this date, add this quake to the array 
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
    var quakes = theVolcano.quakesByDate.get(Array.from(theVolcano.quakesByDate.keys())[theDay]);

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
    $(".day").css({"background-color": "gray"});
    $(jquery).css({ "background-color": "#f55702"});
    displayQuakes(volcano, theButton);
}


$("#0").on("click", function() {
    selectButton(0);
    day = 0;
})

$("#1").on("click", function() {
    selectButton(1);
    day = 1;
})

$("#2").on("click", function() {
    selectButton(2);
    day = 2;
})

$("#3").on("click", function() {
    selectButton(3);
    day = 3;
})

$("#4").on("click", function() {
    selectButton(4);
    day = 4;
})

$("#5").on("click", function() {
    selectButton(5);
    day = 5;
})

$("#6").on("click", function() {
    selectButton(6);
    day = 6;
})

$("#7").on("click", function() {
    selectButton(7);
    day = 7;
})

$("#8").on("click", function() {
    selectButton(8);
    day = 8;
})

$("#9").on("click", function() {
    selectButton(9);
    day = 9;
})

$("#10").on("click", function() {
    selectButton(10);
    day = 10;
})

$("#11").on("click", function() {
    selectButton(11);
    day = 11;
})

$("#12").on("click", function() {
    selectButton(12);
    day = 12;
})

$("#13").on("click", function() {
    selectButton(13);
    day = 13;
})

$("#14").on("click", function() {
    selectButton(14);
    day = 14;
})

$("#start").on("click", function() {
    if (iterating) {
        iterating = false; 
        $(this).html("Start");
        $(this).css({ "background-color": "grey"});
    } else {
        iterateDays();
        $(this).html("Stop");
        $(this).css({ "background-color": "#f55702"});
    }
})

$("#left").on("click", function() {
    if (day < 14) {
        selectButton(day + 1);
        day++;
    }
})

$("#right").on("click", function() {
    if (day > 0) {
        selectButton(day - 1);
        day--;
    }
})

$("#helens").on("click", function() {
    setNewVolcano(helens);
    $("#history").html(helensHistory);
    $("#geological").html(helensGeological);
})

$("#kilauea").on("click", function() {
    setNewVolcano(kilauea);
    $("#history").html(kilaueaHistory);
    $("#geological").html(kilaueaGeological);
})

$("#instructions").on("click", function() {
    Swal.fire({
        title: 'How does the map work?',
        html: "<p>The numbers represent the number of days prior to the eruption</p><p>The blue circles represent earthquakes, and their diamater cooresponds to the magnitude</p><p>Click a day to see the earthquakes that happened on that day</p><p>Or click start to iterate over all of the days</p><p>Or use the arrow buttons to page through the days</p>",
        icon: 'question',
        confirmButtonText: 'Cool'
      })
})

$("#citations").on("click", function() {
    Swal.fire({
        title: 'Citations',
        html: '</p><p><b>Kilauea Information:</b></p><p>Recent Eruption | U.S. Geological Survey. wwwusgsgov. https://www.usgs.gov/volcanoes/kilauea/recent-eruption.</p><p>Geology and History | U.S. Geological Survey. wwwusgsgov. https://www.usgs.gov/volcanoes/kilauea/geology-and-history.</p></p><p><b>Mount Saint Helens Information:</b></p><p>Geology and History Summary for Mount St. Helens | U.S. Geological Survey. wwwusgsgov. https://www.usgs.gov/volcanoes/mount-st.-helens/geology-and-history-summary-mount-st-helens.</p><p>Holocene Activity Prior to May 18, 1980 Eruption | U.S. Geological Survey. wwwusgsgov. https://www.usgs.gov/volcanoes/mount-st.-helens/holocene-activity-prior-may-18-1980-eruption.</p><p><b>Earthquake Data:</b></p><p>USGS Earthquake Hazards Program. 2019. Usgsgov. https://earthquake.usgs.gov/.</p>',
        icon: 'success',
        confirmButtonText: 'Cool'
      })
})

function setNewVolcano(theVolcano) {
    iterating = false;
    // day = null;
    iterating = false; 
    volcano = theVolcano;
    $(".mountain").removeClass("active");
    // $("#general").addClass("active");
    // $("#general").addClass("show");
    // $("#general_link").addClass("active");
    $("#" + volcano.id).addClass("active");
    $("#volcano_name").html(volcano.name);
    map_2.setView([volcano.lat, volcano.lon], 13);
}



var iterating = false; 

async function iterateDays() {
    if (day == null || day == 0) {
        day = 14;
        selectButton(14);
    }

    iterating = true;
    while (day > 0) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (iterating == true) {
            selectButton(day - 1);
            day--;
        } else {
            break;
        }
    }
    iterating = false; 
    $("#start").html("Start");
    $("#start").css({ "background-color": "grey"});
}


var helensHistory = `<p>
In Washington state 50 miles northeast of Vancouver and 33 miles west of Mount Adams rests the volcano most likely
to erupt in the
contiguous United States: Mount Saint Helens. Like other mountains in the cascades, Mount Saint Helens formed as a
result of
the volcanism produced by the Juan de Fuca plate subducting under the North American plate off of the Pacific
Coast. While it is
famous for its 1980 eruption, Mount Saint Helens has had many active periods throughout its 275,000
year
existence.


</p>
<p>
As a matter of fact, it reached its peak height of 9,677 feet (prior to the most recent eruption) as the result of
a series of lavaflows
which deposited great quantities of andesite and basalt around 3,000 years ago. Additionally, regular eruptions
which released dacite
lavas were intersperesed between the andesite and basalt eruptions. Prior to the relatively recent series of deposits and
growth, the area consisted
of a collection of small dacite domes, surrounded by fans of volcanic debris.
</p>
<p>
In addition to the low energy lavaflow events that created much of the mountain that remains today,
Mount Saint Helens has seen
periods of explosive volcanic activity. For example, between 3,300 and 3,500 years ago massive amounts of tephra
were violently expelled from
the area. In fact, the eruption that set this period off was so violent and voluminous (four times larger than the
most recent eruption), that
material has been found as far as 590 miles away.
</p>`;

var helensGeological = ` <p>
On May 18th of 1980, a 5.1 magnitude earthquake one mile beneath Mount Saint Helens triggered the largest slope failure in recorded history. 
3.3 billion cubic yards of debris were released from the northern flank of Mount Saint Helens and traveled at 70 to 150 miles per hour, 
burying North Fork Toutle River to an average depth of 150 feet. Starting about a month prior to the slide the first sign of volcanic or
seismic activity manifested as a sequence of relatively small earthquakes. 

</p>
<p>
Over the following weeks, these small earthquakes steadyily 
continued and on March 27th culminated with the first volcanic eruption in over 100 years, taking the form of steam explosions. These explosions 
blasted a 75 meter wide crater into the mountain's summit ice cap. The crater continued to grow and eventually stretched 400 meters wide. 
The steam blasts continued but tapered off through April, eventually stopping altogether on April 22nd. Over this period, a bulge on the northen surface 
of the mountain was growing, indicating that a cryptodome was likely beneath the surface of the mountain and inflating with magma. 
</p>

<p>
Other than continued small earthquakes, the mountain was quiet until May 7th when small steam and ash eruptions resumed. This brings
us within the fourteen day window prior to the major eruption that is featured on the map. By this time, 10,000 small earthquakes had shaken 
the mountain and the deformation on the northern surface and swelled 450 feet, creating a remarkable bulge. This type of deformation (although
not always on this scale) along with a series of small to medium earthquakes are typical events leading to an explosive eruption of a composite 
volcano. The small steam and ash eruptions, accompanied by medium sized earthquakes centralized around the northern flank of the mountain 
continued until May 17th. 
</p>

<p>
  In the early morning hours of May 18th, our 5.1 magnitude earthquake triggered the largest slope failure in recorded history. The bulge that
  had been growing on the northern flank of the mountain slid away, which triggered a series of catastrophic events. The cryptodome which had 
  been inflating with magma and increasing in pressure suddenly found itself depressurized. This nearly instant depressurization resulted in 
  a lateral blast through the sliding debris. Hot debris from the blast accelerated to 300 miles per hour and blew past the sliding debris from 
  the slope failure. The blast flattened trees and buried the landscape in the areas surrounding the northern flank. Within a few hours, 
  the depressurization of the magma system sent pyroclastic flows down the mountain at 80 miles per hour and a massive pillar of ash and tephra 
  into the sky. 
</p>`;

var kilaueaHistory = `
    <p>
        Due to the nature of shield volcanoes, much of the geologic history of Kilauea remains a mystery to scientists. The 
        tendency for Kilauea and other shield volcanoes to have long periods with relatively low intensity but consistent effusive 
        eruptions results in many layers of rock being deposited atop one another in quick succession (on a geological time scale). 
        This buries much of the evidence that scientists would otherwise use to make inferences about the history of the volcano. 
        So, while scientists have found evidence that lavaflows erupting from the sea floor between 210,000 and 280,000 years ago
        marked the beginning of Kilauea, there are many details about its history that scientists still do not know. The outermost
        layers of rock deposited on the volcano represent about 2,500 years of volcanic activity, and it is only within this tiny 
        time frame that scientists can understand the history of the volcano with the granularity they desire.  
    </p>
    <p>
        Over the last 2,500 years, Kilauea has seen alternating periods of effusive and explosive eruptions. These periods are dictated
        by the level of magma being supplied by the underlying magma system and the resulting state of the caldera it produces atop the
        volcano. During periods when the magma system is supplying ample amounts of magma, the caldera fills with magma 
        which leads to effusive eruptions as the magma seeps from the caldera and other exit points on the volcano. These periods are
        referred to as shield building periods, as the volcano tends accumulate additional layers of rock and grows in height and 
        diameter. However, when the supply of magma diminishes, the caldera has a tendency to collapse. Depending on how deep the caldera 
        collapses, water may seep into the caldera which can cause phreatomatic eruptions. Phreatomatic eruptions which consist of a
        combination of water and lava tend to be far more explosive than effusive eruptions. During these periods there is little growth
        observed on shield volcanoes. These periods continue until the supply of magma increases, and the cycle continues. 

    </p>
    <p>
        On Kilauea, there was a prolonged period of effusive lava flows until about 2,200 years ago, when a large caldera collapsed to a depth that reached
        below the water level of the island, around 600 meters. This collapse lead to a period of about 1,200 years of explosive phreatomagmatic 
        eruptions and little growth. The largest of these eruptions happened sometime between 850 and 950 CE and sent golf ball sized stones 11 
        miles away and rocks weighing about ten pounds 3 miles away. 
    </p>
    <p>
        Around 1000 years ago, the magma system began supplying enough magma to fill the caldera and begin another period of shield building. 
        A new shield structure known as the Observatory shield grew atop the caldera, and lava erupted in various locations across the southwest 
        and east sides of the island, covering much of the deposits of the previous shield building periods. It was within a few hundred years of
        this new shield building period that scientists think humans first arrived on the island. 
    </p>
    <p>
        A major collapse around 1470 CE created the current caldera, which is now about 2.2 miles by 1.9 miles and 1970 feet deep. The forming
        of the caldera initiated a 300 year period of explosive eruptions, sometimes with lava fountains reaching heights of 2,000 feet. Explosive
        eruptions in 1790 sent pyroclastic flows 2.1 miles over the west side of the mountain, killing hundreds, potentially thousands of people, 
        making it the most deadly eruption form a U.S. volcano, although it was not part of the U.S. at the time.
    </p>
        In 1823 the volcano switched again to an effusive eruption period that it is still in today. While the volcano has mostly released 
        relatively low intensity effusive eruptions since then, there was one major exception in an explosive eruption 1924. This eruption lasted 
        17 days and hurled massive boulders, some weighing as much as several tons, half a mile from the caldera. Scientists predict that eventually
        the volcano will revert to another period of explosive activity. 
    </p>
`;


var kilaueaGeological = `
<p>
     
    Following Kilauea's previous eruption which lasted from December 2020 to May 2021, there was a period with very little seismic and 
    volcanic activity. However, in Augest of 2021 increased seismic acitivity and deformation in the form of inflation was observed in the 
    summit caldera. Scientists determined that these events indicated that magma was traveling and pooling in a location a little to the south of the summit 
    caldera. On the afternoon of September 29th, 2021, there was a drastic uptick in seismic activity as vents opened in the floor of the caldera
    and lava began to flow. Eventually, the lava escaping from these vents created a lake of lava covering the floor of the caldera, which 
    has continued to increase in depth. 

    </p>
    <p>

    Using an autonomous continuous laser rangefinder, scientitst have been measuring the depth of the lava lake since October, 2021.
    Initially, it was measured to be about 225 feet deep, and at the end of August 2022 it had grown to be 375 feet deep. However, the footprint 
    of the lava lake has not changed much since October, 2022, due to a magmatic intrustion which caused a great deal of magma to drain from the 
    caldera. Since then, not enough magma has been supplied to retake the lake's previous depth. In addition to the depth of the lake, scientists
    have observed increased levels of seismicity and gas emissions, particularly carbone dioxide, since the eruption began. (U.S. Geological Survey, 2022)
    
    </p>
    
   





</p>

`;


// collect earthquake data from earthquake API for each volcano we are interested in 
volcanoes.forEach(queryForQuakes);

$("#history").html(helensHistory);
    $("#geological").html(helensGeological);






      