$(document).ready(function () {
    var mymap = L.map('mapid').setView([42.48112, 25.48645], 13);
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
        maxZoom: 18
    }).addTo(mymap);

    var greenIcon = new L.Icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    var blueIcon = new L.Icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    L.uGeoJSONLayer({
        endpoint: '/geojson',
        onEachFeature: function (feature, layer) {
            if (feature.properties && feature.properties.title) {
                layer.bindPopup(feature.properties.title);
            }
        },
        pointToLayer: function (feature, latlng) {
            if (feature.properties.is_visited) {
                return L.marker(latlng, {icon: greenIcon})
            } else {
                return L.marker(latlng, {icon: blueIcon})
            }
        }
    }).addTo(mymap);

    // load sidebar
    $.ajax({
        url: '/geojson',
        method: 'post',
        data: {
            north: 90,
            south: -90,
            east: 180,
            west: -180
        },
        dataType: 'json',
        success: function(data){
            for (var i in data.features) {
                $('.list-group').append('<a href="#" class="list-group-item small">' + data.features[i].properties.title + '</a>')
            }
        }
    })
})
