(function () {
    'use strict';

    angular.module('Geothermal.pages.dashboard')
        .controller('MapCtrl',
            ['$timeout', 'fetchDataFactory', 'commonFunctions',
                function MapCtrl($timeout, fetchDataFactory, commonFunctions) {

            let allMarkers = [];

                    async function initialize() {
                        let mapCanvas = document.getElementById('google-maps');
                        let mapOptions = {
                            center: new google.maps.LatLng(51.312801, 9.481544),
                            zoom: 5,
                            mapTypeId: google.maps.MapTypeId.ROADMAP
                        };
                        let map = new google.maps.Map(mapCanvas, mapOptions);

                        await initializeMarkers(map);
                        setZoomListener(map, allMarkers);
                    }

                    /**
                     * sets zoom listener for map
                     * for zoom = 5: usual markers are shown
                     * for zoom = 6: warnings are shown
                     * for zoom = 7: glyphs are shown
                     *
                     * @param map
                     * @param allMarkers
                     */
                    function setZoomListener(map, allMarkers){
                        map.addListener('zoom_changed', async function () {
                            let zoom = map.getZoom();
                            switch (zoom){
                                case 5:
                                    removeLegend();
                                    await initializeMarkers(map);
                                    break;
                                case 6:
                                    showLegend();
                                    showWarningLegend();
                                    initializeWarnings(map);
                                    break;
                                case 7:
                                    showGlyphLegend();
                                    await initializeGlyphs(map);
                                    break;
                            }
                        })
                    }

                    /**
                     * removes all markers from the map
                     *
                     */
                    function removeMarkers(){
                        allMarkers.forEach(function (marker) {
                            marker.setMap(null);
                        });
                    }

                    /**
                     * initializes all markers on map
                     *
                     * @param map
                     * @returns {Array}
                     */
                    async function initializeMarkers(map){

                        let geoData = await fetchDataFactory.fetchGeoData();
                        removeMarkers();

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
                                let locationString = 'http://localhost:3000/#/detailView/' + value['name'];
                                console.log(locationString);
                                window.open(locationString, '_self');
                            })
                        });
                    }

                    /**
                     * initializes all warning markers on map
                     *
                     * @param map
                     * @returns {Array}
                     */
                    async function initializeWarnings(map){

                        let geoData = await fetchDataFactory.fetchGeoData();
                        let firstAndLastValues = await fetchDataFactory.getFirstAndLastValues();
                        removeMarkers();
                        let markerData = [];
                        for (let i = 0; i < geoData.length; i++){
                            markerData.push({...firstAndLastValues[i], ...geoData[i]})
                        }
                        let warnings = [];
                        markerData.forEach(function (data) {
                           if (parseFloat(data['last'][Property.EXTRACTION_RATE])/parseFloat(data['first'][Property.EXTRACTION_RATE]) < 0.5 ||
                               parseFloat(data['last'][Property.EFFICIENCY])/parseFloat(data['first'][Property.EFFICIENCY]) < 0.5 ||
                               parseFloat(data['last'][Property.ELECTRICAL_POWER])/parseFloat(data['first'][Property.ELECTRICAL_POWER]) < 0.5 ||
                               parseFloat(data['last'][Property.ELECTRICAL_POWER])/parseFloat(data['first'][Property.ELECTRICAL_POWER]) < 0.5){
                               warnings.push({
                                   name: data['name'],
                                   longitude: data['longitude'],
                                   latitude: data['latitude'],
                                   warning: true
                               })
                           } else {
                               warnings.push({
                                   name: data['name'],
                                   longitude: data['longitude'],
                                   latitude: data['latitude'],
                                   warning: false
                               })
                           }
                        });

                        warnings.forEach(function (value) {
                            let longLat = {lat: parseFloat(value['latitude']), lng: parseFloat(value['longitude'])};
                            if (value['warning']) {
                                let marker = new google.maps.Marker({
                                        position: longLat,
                                        map: map,
                                        icon: {
                                            path: fontawesome.markers.WARNING,
                                            strokeColor: 'black',
                                            fillColor: commonFunctions.getWarningColor(),
                                            fillOpacity: 0.7
                                        }
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
                                    let locationString = 'http://localhost:3000/#/detailView/' + value['name'];
                                    window.open(locationString, '_self');
                                })
                            } else {
                                let marker = new google.maps.Marker({
                                        position: longLat,
                                        map: map,
                                        icon: {
                                            path: fontawesome.markers.CHECK,
                                            strokeColor: 'black',
                                            fillColor: commonFunctions.getWorkingColor(),
                                            fillOpacity: 0.7
                                        }
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
                                    let locationString = 'http://localhost:3000/#/detailView/' + value['name'];
                                    window.open(locationString, '_self');
                                })
                            }
                        });
                    }

                    async function initializeGlyphs(map){
                        let geoData = await fetchDataFactory.fetchGeoData();

                        let lastValues = await fetchDataFactory.getLastValues();
                        let glyphs = await commonFunctions.createGlyph(lastValues);
                        let markerData = [];
                        for (let i = 0; i < geoData.length; i++){
                            markerData.push({...glyphs[i], ...geoData[i]})
                        }
                        removeMarkers();

                        markerData.forEach(function (value) {
                            let longLat = {lat: parseFloat(value['latitude']), lng: parseFloat(value['longitude'])};
                            let marker = new google.maps.Marker({
                                    position: longLat,
                                    map: map,
                                    icon: {
                                        anchor: new google.maps.Point(16, 16),
                                        url: value['HtmlString']
                                    }
                                }
                            );
                            allMarkers.push(marker);
                            let infoWindow = new google.maps.InfoWindow({
                                content: value['id']
                            });
                            marker.addListener('mouseover', function () {
                                infoWindow.open(map, this);
                            });
                            marker.addListener('mouseout', function () {
                                infoWindow.close();
                            });
                            marker.addListener('click', function () {
                                let locationString = 'localhost:3000/#/detailView/' + value['name'];
                                window.open(locationString, '_self');
                            })
                        });
                    }

                    function showLegend(){
                        document.getElementById("map-wrapper").classList.remove("col-lg-12");
                        document.getElementById("map-wrapper").classList.remove("col-md-12");
                        document.getElementById("map-wrapper").classList.remove("col-sm-12");
                        document.getElementById("map-wrapper").classList.add("col-sm-10");
                        document.getElementById("map-wrapper").classList.add("col-lg-10");
                        document.getElementById("map-wrapper").classList.add("col-md-10");
                        document.getElementById("legend-wrapper").classList.add("col-md-2");
                        document.getElementById("legend-wrapper").classList.add("col-sm-2");
                        document.getElementById("legend-wrapper").classList.add("col-lg-2");
                    }

                    function showGlyphLegend(){
                        removeLegendContent();
                        document.getElementById("legend-wrapper").innerHTML =
                            '<p><span style="color: ' + commonFunctions.getEfficiencyColor() + '; ">EFFICIENCY</span></p>' +
                            '<p><span style="color: ' + commonFunctions.getElectricalPowerColor() + '; ">ELECTRICAL POWER</span></p>' +
                            '<p><span style="color: ' + commonFunctions.getGeothermalPowerColor() + '; ">GEOTHERMAL POWER</span></p>' +
                            '<p><span style="color: ' + commonFunctions.getExtractionRateColor() + '; ">EXTRACTION RATE</span></p>';
                    }

                    function removeLegendContent(){
                        document.getElementById("legend-wrapper").innerHTML = "";
                    }

                    function removeLegend(){
                        document.getElementById("map-wrapper").classList.remove("col-lg-10");
                        document.getElementById("map-wrapper").classList.remove("col-md-10");
                        document.getElementById("map-wrapper").classList.remove("col-sm-10");
                        document.getElementById("map-wrapper").classList.add("col-sm-12");
                        document.getElementById("map-wrapper").classList.add("col-lg-12");
                        document.getElementById("map-wrapper").classList.add("col-md-12");
                        document.getElementById("legend-wrapper").classList.remove("col-md-2");
                        document.getElementById("legend-wrapper").classList.remove("col-sm-2");
                        document.getElementById("legend-wrapper").classList.remove("col-lg-2");
                    }

                    function showWarningLegend(){
                        removeLegendContent();
                        document.getElementById("legend-wrapper").innerHTML =
                            '<p><i class="fa fa-warning" style="color: ' + commonFunctions.getWarningColor() + '"></i> Warning</p>' +
                            '<p><i class="fa fa-check" style="color: ' + commonFunctions.getWorkingColor() + '"></i> Everything is working fine</p>';
                    }

                    $timeout(async function(){
                        await initialize();
                    }, 200);
                }
                ])})();