// create the leaflet map centered on nola
var map = L.map('map', { center: [29.95, -90.07], zoom: 13 });

// add the base tile layer with correct attribution
var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
var osm = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 18, attribution: osmAttrib});
osm.addTo(map);

// add an empty layer for bike easy theft reports and bike racks
var thefts = L.geoJson();
var racks = L.geoJson();
var layerControl = L.control.layers(null, null).addTo(map);


// load bike easy thefts
$.getJSON('data/thefts.json', function(data) {
    thefts =
        L.geoJson(data, {
            onEachFeature: function (feature, layer) {
                var tmpl = '<ul>'
                tmpl += '<li><span>Title of theft report: </span>{title}</li>'
                tmpl += '<li><span>Make of bike: </span>{make}</li>'
                tmpl += '<li><span>Description of bike: </span>{description}</li>'
                tmpl += '<li><span>Value of bike: </span>{value}</li>'
                tmpl += '<li><span>Location of theft: </span>{location}</li>'
                tmpl += '<li><span>Date of theft: </span>{date}</li>'
                tmpl += '<li><span>Time of theft: </span>{time}</li>'
                tmpl += '<li><span>Was bike secured?: </span>{secured}</li>'
                tmpl += '<li><span>How was bike secured (type of lock, secured to what)?: </span>{secured_how} & {secured_what}</li>'
                tmpl += '<li><span>Was bike found?: </span>{recovered}</li>'
                tmpl += '<li><span>Found location: </span>{found_location}</li>'
                tmpl += '<li><span>Was police report filed?: </span>{police_report_filed}</li>'
                tmpl += '</ul>'
                layer.bindPopup(L.Util.template(tmpl, feature.properties));
            },
            pointToLayer: function(feature, latlng) {
                var bikeEasyIcon = L.icon({iconUrl: 'bike-easy-icon.png'});
                return new L.marker(latlng, {icon: bikeEasyIcon});
            }
        }).addTo(map);
        layerControl.addOverlay(thefts, 'Bike Easy Theft Reports');
 });


$.getJSON('data/racks.json', function(data) {
    racks =
        L.geoJson(data, {
            onEachFeature: function (feature, layer) {
                layer.bindPopup(L.Util.template('<b>{name}</b><br>{description}', feature.properties))
            },
            pointToLayer: function(feature, latlng) {
                var bikeRackIcon = L.icon({iconUrl: 'cycling.png', iconSize: [16, 16] });
                return new L.marker(latlng, {icon: bikeRackIcon} );
            }
        }).addTo(map);
       layerControl.addOverlay(racks, 'Bike Racks');
});