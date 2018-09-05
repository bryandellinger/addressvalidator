import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css';
import validate from 'jquery-validation';
import * as toastr from 'toastr';
import 'toastr/build/toastr.css';
import PageLoader from './pageLoader';
var geocoder = require('google-geocoder');
var Promise = require("bluebird");
var loadGoogleMapsApi = require('load-google-maps-api-2');
//const indexTemplate = require("./index.handlebars");

$(function() {

    let googleMaps = null;
    const pageLoader = new PageLoader();
    const geo = geocoder({key: 'AIzaSyBYleXzEg8q2YS1-LRghs_RbZ0D7t59mMM'});

    loadGoogleMapsApi({
        key: 'AIzaSyBYleXzEg8q2YS1-LRghs_RbZ0D7t59mMM',
        libraries: ['places']
    }).then(function(_googleMaps) {
        googleMaps = _googleMaps
        var autocomplete = new googleMaps.places.Autocomplete($("#address")[0]);
        console.log('here');
        console.log(autocomplete);
            googleMaps.event.addListener(autocomplete, 'place_changed', function() {
                var place = autocomplete.getPlace();
                console.log(place.address_components);
        });
    });

    function findAddress(address) {
        return new Promise(function(resolve, reject) { //returning promise
            geo.find(address, function(err, res) {
                if (err) {
                    reject(err); //promise reject
                } else {
                    resolve(res); //promise resolve
                }
            })
        })
    }

    function drawMap(lat, lng) {
                const map = new googleMaps.Map(document.querySelector('.map'), {
                    center: {
                        lat: lat,
                        lng: lng
                    },
                    zoom: 12
                })
                var marker = new googleMaps.Marker({
                    position: {
                        lat: lat,
                        lng: lng
                    },
                    map: map,
                    title: $('#name')
                        .val()
                });
    }

    $("#form")
        .validate({
            rules: {
                "name": {
                    required: true,
                    minlength: 5
                },
                "address": {
                    required: true,
                }
            },
            messages: {
                "name": {
                    required: "Please, enter a name"
                },
                "address": {
                    required: "Please, enter an address",
                }
            },
            submitHandler: function(form) { // for demo
                $('.address')
                    .val('');
                const address = $('#address')
                    .val();
                findAddress(address)
                    .then(function(response) {
                        console.log('response');
                        console.log(response[0]);
                        drawMap(response[0].location.lat, response[0].location.lng) //resolve callback(success)
                        populateAddress(response);
                        if (!response[0] || response[0].location_type === "GEOMETRIC_CENTER" || response[0].location_type === "RANGE_INTERPOLATED") {
                            toastr.warning('this address is an approximation,  please ensure it is accurate');
                        } else if (response[0] && response[0].location_type === "ROOFTOP") {
                            toastr.success('This is a valid address');
                        } else {
                            toastr.error('unable to resolve address');
                        }
                        return false; // for demo
                    })
                    .catch(function(error) {
                        $('.map')
                            .empty();
                        toastr.error('unable to resolve address');
                        console.log(error) //reject callback(failure)
                        return false; // for demo
                    })
            }
        });

    function populateAddress(response) {
        $('#formattedAddress')
            .val(response[0].formatted_address);
        $('#streetnumber')
            .val(response[0].street_number ? response[0].street_number.long_name : 'unable to find');
        $('#route')
            .val(response[0].route ? response[0].route.long_name : 'unable to find');
        $('#locality')
            .val(response[0].locality ? response[0].locality.long_name : '');
        $('#state')
            .val(response[0].administrative_area_level_1 ? response[0].administrative_area_level_1.long_name : 'unable to find');
        $('#county')
            .val(response[0].administrative_area_level_2 ? response[0].administrative_area_level_2.long_name : 'unable to find');
        $('#township')
            .val(response[0].administrative_area_level_3 ? response[0].administrative_area_level_3.long_name : 'unable to find');
        $('#zip')
            .val(response[0].postal_code ? response[0].postal_code.long_name : 'unable to find');
        $('#country')
            .val(response[0].country ? response[0].country.long_name : 'unable to find');
    }
})