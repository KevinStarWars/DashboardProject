(function () {
    'use strict';

    angular.module('Geothermal.pages.maps')
        .controller('MapCtrl',
            ['$timeout', 'fetchDataFactory',
                function MapCtrl($timeout, fetchDataFactory) {
                    async function initialize() {
                        var mapCanvas = document.getElementById('google-maps');
                        var mapOptions = {
                            center: new google.maps.LatLng(51.312801, 9.481544),
                            zoom: 7,
                            mapTypeId: google.maps.MapTypeId.ROADMAP
                        };
                        var map = new google.maps.Map(mapCanvas, mapOptions);
                        let geoData = await fetchDataFactory.fetchGeoData();
                        geoData.forEach(function (value) {
                            let longLat = {lat: parseFloat(value['latitude']), lng: parseFloat(value['longitude'])};
                            let marker = new google.maps.Marker({
                                position: longLat,
                                map: map
                                }
                            );
                            marker.addListener('click', function () {
                                let locationString = 'http://localhost:3000/#/' + value['name'];
                                window.open(locationString, '_self');
                            })
                        })
                    }

                    $timeout(async function(){
                        await initialize();
                    }, 200);
                }
                ])})();