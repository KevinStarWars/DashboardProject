(function () {
    'use strict';

    angular.module('Geothermal.pages.khristina')
        .controller('KhristinaCtrl',
            ['$scope', 'fetchDataFactory', 'baConfig', '$timeout',
        async function KhristinaCtrl($scope, fetchDataFactory, baConfig, $timeout) {
            let data = await fetchDataFactory.fetchData('1d8a69a5-b692-47b7-aacb-b7f26692c0ec.json');
            console.log(data);


            $scope.simpleLineOptions = {
                color: baConfig.colors.defaultText,
                fullWidth: true,
                height: "300px",
                chartPadding: {
                    right: 40
                }
            };
            $scope.simpleLineData = {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
                series: [
                    [34, 20, 13, 45, 50],
                    [10, 45, 30, 14, 12],
                    [34, 12, 12, 40, 50],
                    [10, 43, 25, 22, 16],
                    [3, 6, 10, 33, 43]
                ]
            };


            $timeout(function () {
                new Chartist.Line('#line-chart', $scope.simpleLineData, $scope.simpleLineOptions);
            });


            var map = AmCharts.makeChart( "chartdiv", {
                "type": "map",
                "theme": "light",
                "dataProvider": {
                    "map": "worldLow",
                    "zoomLevel": 5.5,
                    "zoomLongitude": 10,
                    "zoomLatitude": 52,
                    "images": [ {
                        "latitude": 40.416775,
                        "longitude": -3.703790,
                        "imageURL": "https://www.amcharts.com/images/weather/weather-rain.png",
                        "width": 32,
                        "height": 32,
                        "label": "Madrid: +22C"
                    }, {
                        "latitude": 48.856614,
                        "longitude": 2.352222,
                        "imageURL": "https://www.amcharts.com/images/weather/weather-storm.png",
                        "width": 32,
                        "height": 32,
                        "label": "Paris: +18C"
                    }, {
                        "latitude": 52.520007,
                        "longitude": 13.404954,
                        "imageURL": "https://www.amcharts.com/images/weather/weather-clouds.png",
                        "width": 32,
                        "height": 32,
                        "label": "Berlin: +13C"
                    }, {
                        "latitude": 52.229676,
                        "longitude": 21.012229,
                        "imageURL": "https://www.amcharts.com/images/weather/weather-clear.png",
                        "width": 32,
                        "height": 32,
                        "label": "Warsaw: +22C"
                    }, {
                        "latitude": 41.872389,
                        "longitude": 12.480180,
                        "imageURL": "https://www.amcharts.com/images/weather/weather-clear.png",
                        "width": 32,
                        "height": 32,
                        "label": "Rome: +29C"
                    }, {
                        "latitude": 51.507351,
                        "longitude": -0.127758,
                        "imageURL": "https://www.amcharts.com/images/weather/weather-showers.png",
                        "width": 32,
                        "height": 32,
                        "label": "London: +10C"
                    }, {
                        "latitude": 59.329323,
                        "longitude": 18.068581,
                        "imageURL": "https://www.amcharts.com/images/weather/weather-rain.png",
                        "width": 32,
                        "height": 32,
                        "label": "Stockholm: +8C"
                    } ]
                },

                "imagesSettings": {
                    "labelRollOverColor": "#000",
                    "labelPosition": "bottom"
                },

                "areasSettings": {
                    "rollOverOutlineColor": "#FFFFFF",
                    "rollOverColor": "#CC0000",
                    "alpha": 0.8
                },

                "export": {
                    "enabled": true
                }
            } );

        }])})();
