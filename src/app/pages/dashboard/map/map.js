(function () {
    'use strict';

    angular.module('Geothermal.pages.dashboard')
        .controller('MapCtrl',
            ['$timeout', 'fetchDataFactory',
                function MapCtrl($timeout, fetchDataFactory) {
                    async function initialize() {
                        let mapCanvas = document.getElementById('google-maps');
                        let mapOptions = {
                            center: new google.maps.LatLng(51.312801, 9.481544),
                            zoom: 7,
                            mapTypeId: google.maps.MapTypeId.ROADMAP
                        };
                        let map = new google.maps.Map(mapCanvas, mapOptions);
                        let geoData = await fetchDataFactory.fetchGeoData();
                        initializeMarkers(geoData, map);
                    }

                    function initializeMarkers(geoData, map){
                        geoData.forEach(function (value) {
                            let longLat = {lat: parseFloat(value['latitude']), lng: parseFloat(value['longitude'])};
                            let marker = new google.maps.Marker({
                                    position: longLat,
                                    map: map
                                }
                            );
                            let infoWindow = new google.maps.InfoWindow({
                                content: value['name']
                            });
                            marker.addListener('mouseover', function () {
                                infoWindow.open(map, this);
                            });
                            marker.addListener('mouseout', function () {
                                infoWindow.close();
                            });
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