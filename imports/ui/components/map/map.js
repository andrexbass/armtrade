import { ReactiveVar } from 'meteor/reactive-var'
import './map.html';


if (Meteor.isClient) {
    var MAP_ZOOM = 15;

    Meteor.startup(function () {
        GoogleMaps.load({
            key: 'AIzaSyCnhZDqVEhZvzJirmcaTfI1yKBHMfbGjC4',
            libraries: 'places'
        });
    });

    Template.map.onCreated(function () {
        var self = this;

        GoogleMaps.ready('map', function (map) {
            var marker;

            // Cria e move o marcador quando a latitude muda
            self.autorun(function () {
                var latLng = Geolocation.latLng();
                if (!latLng)
                    return;

                // If the marker doesn't yet exist, create it.
                if (!marker) {
                    marker = new google.maps.Marker({
                        position: new google.maps.LatLng(latLng.lat, latLng.lng),
                        map: map.instance
                    });
                }
                // The marker already exists, so we'll just change its position.
                else {
                    marker.setPosition(latLng);
                }

                // Center and zoom the map view onto the current position.
                map.instance.setCenter(marker.getPosition());
                map.instance.setZoom(MAP_ZOOM);
            });
        });
    });

    Template.map.helpers({
        geolocationError: function () {
            var error = Geolocation.error();
            return error && error.message;
        },
        mapOptions: function () {
            var latLng = Geolocation.latLng();
            if (GoogleMaps.loaded() && latLng) {
                return {
                    center: new google.maps.LatLng(latLng.lat, latLng.lng),
                    zoom: MAP_ZOOM
                };
            }
        }
    });


    Template.map.onRendered(function () {
        this.autorun(function () {
            if (GoogleMaps.loaded()) {
                $("#autocomplete").geocomplete({
                    map: ".map-container",
                    mapOptions: {
                        zoom: MAP_ZOOM
                    },
                    markerOptions: {
                        draggable: true
                    },
                    details: "form"
                });

                var lat_and_long = "-15.7979736, -47.869904";
                $("#autocomplete").geocomplete("find", lat_and_long);

                $("#autocomplete").bind("geocode:dragged", function (event, latLng) {
                    $("input[name=lat]").val(latLng.lat());
                    $("input[name=lng]").val(latLng.lng());
                });

                // var autocomplete = new google.maps.places.autocomplete((document.getElementById('autocomplete')),{types: ['geocode'] });
            }
        });
    });

    Template.map.events({
        'click button': function () {
            // Trigger geocoding request.
            $("#autocomplete").trigger("geocode");
        }
    })

}
