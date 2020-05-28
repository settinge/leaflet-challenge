var queryUrl ="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";
d3.json(queryUrl, function(data) {
    // Once we get a response, send the data.features object to the createFeatures function
    console.log(data);
    createFeatures(data.features);
});

var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
});

var myMap = L.map("map", {
    center: [
        37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap]
});

var legend = L.control({position: "bottomright"})
legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    grades=[0, 1, 2, 3, 4, 5];
    colors=[
        'black', 
        'brown', 
        'purple,', 
        'blue', 
        'green', 
        'white'
    ];
    for (var i=0; i<grades.length; i++) { 
        div.innerHTML+="<i style='background: " + colors[i] + "'></i>"+grades[i]+(grades[i+1]?"&ndash;" + grades[i+1]+"<br>": "+");
        //if name=='kevin'
        // div.innerHTML='hi';
        //return name == 'kevin' ? 'name is kevin': 'name is not kevin'
    };
    return div;
};


// var legendInfo = "<h1>Earthquake Strength</h1>" +
//             "<div class=\"labels\">" +
//               "<div class=\"min\">" + limits[0] + "</div>" +
//               "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
//             "</div>";
// div.innerHTML = legendInfo;
      
// limits.forEach(function(limit, index) {
// labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
//             });
        
// div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    
        

// streetmap.addTo(myMap);

// d3.json(queryUrl, function(data) {
//     // Once we get a response, send the data.features object to the createFeatures function
//     console.log(data);
//     createFeatures(data.features);
// });

function createFeatures(earthquakeData) {
    var earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeatureFunction, 
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng)
        }, 
        style: markerStyle
    });
    earthquakes.addTo(myMap);
    
    // Define a function we want to run once for each feature in the features array
    // Give each feature a popup describing the place and time of the earthquake
    function onEachFeatureFunction(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.place + " " +feature.properties.mag + 
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    }
   
    // var earthquakes = L.geoJSON(earthquakeData, {
    //     onEachFeature: onEachFeature
    // }); 

    function markerStyle(feature) {
        return {
            radius: feature.properties.mag*5,
            fillColor: getColor(feature.properties.mag), 
            strokeColor: "#0e0e0e",
            //"#000000",
            weight: 0.5,
            opacity: 0.5,
            fillOpacity: 0.5, 
            stroke: true
        };
    }; 
    function getColor(magnitude) {
        switch(true) {
            case magnitude > 5: 
                return 'black';
            case magnitude > 4: 
                return 'brown';
            case magnitude > 3:
                return 'purple'
            case magnitude > 2:
                return 'blue'
            case magnitude > 1:
                return 'green'

            default: 
                return 'white'
        };
    };
}
legend.addTo(myMap);
      
          // Add min & max
         
      
        
        