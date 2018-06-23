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
                            zoom: 6,
                            mapTypeId: google.maps.MapTypeId.ROADMAP
                        };
                        let map = new google.maps.Map(mapCanvas, mapOptions);
                        let geoData = await fetchDataFactory.fetchGeoData();
                        let allMarkers = initializeMarkers(geoData, map);
                        setZoomListener(map, allMarkers);
                    }

                    /**
                     * sets zoom listener for map
                     * @param map
                     * @param allMarkers
                     */
                    function setZoomListener(map, allMarkers){
                        map.addListener('zoom_changed', function () {
                            let zoom = map.getZoom();
                            switch (zoom){
                                case 0:
                                    allMarkers.forEach(function (marker) {
                                        removeMarker(marker);
                                    });
                                    console.log('level:' + zoom);
                                    break;
                                case 1:
                                    console.log('level:' + zoom);
                                    break;
                                case 2:
                                    console.log('level:' + zoom);
                                    break;
                                case 3:
                                    console.log('level:' + zoom);
                                    break;
                                case 4:
                                    console.log('level:' + zoom);
                                    break;
                                case 5:
                                    console.log('level:' + zoom);
                                    break;
                                case 6:
                                    console.log('level:' + zoom);
                                    break;
                                case 7:
                                    console.log('level:' + zoom);
                                    break;
                                case 8:
                                    console.log('level:' + zoom);
                                    break;
                                case 9:
                                    console.log('level:' + zoom);
                                    break;
                                case 10:
                                    console.log('level:' + zoom);
                                    break;
                                case 11:
                                    console.log('level:' + zoom);
                                    break;
                                case 12:
                                    console.log('level:' + zoom);
                                    break;
                                case 13:
                                    console.log('level:' + zoom);
                                    break;
                                case 14:
                                    console.log('level:' + zoom);
                                    break;
                                case 15:
                                    console.log('level:' + zoom);
                                    break;
                                case 16:
                                    console.log('level:' + zoom);
                                    break;
                                case 17:
                                    console.log('level:' + zoom);
                                    break;
                                case 18:
                                    console.log('level:' + zoom);
                                    break;
                                case 19:
                                    console.log('level:' + zoom);
                                    break;
                                case 20:
                                    console.log('level:' + zoom);
                                    break;
                                case 21:
                                    console.log('level:' + zoom);
                                    break;
                                case 22:
                                    console.log('level:' + zoom);
                                    break;
                                default:
                                    console.log('unknown zoom level - ' + zoom);
                            }
                        })
                    }

                    /**
                     * removes a marker from the map
                     *
                     * @param marker    -> marker to be removed
                     */
                    function removeMarker(marker){
                        marker.setMap(null);
                    }

                    /**
                     * initializes all markers on map
                     *
                     * @param geoData
                     * @param map
                     * @returns {Array}
                     */
                    function initializeMarkers(geoData, map){
                        let allMarkers = [];
                        geoData.forEach(function (value) {
                            let longLat = {lat: parseFloat(value['latitude']), lng: parseFloat(value['longitude'])};
                            let marker = new google.maps.Marker({
                                    position: longLat,
                                    map: map
                                }
                            );
                            allMarkers.push(marker);
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
                        });
                        return allMarkers;
                    }

                    $timeout(async function(){
                        await initialize();
                    }, 200);
                }
                ])})();