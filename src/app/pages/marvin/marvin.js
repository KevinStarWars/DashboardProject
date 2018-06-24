(function () {
    'use strict';

    angular.module('Geothermal.pages.marvin')
        .controller('MarvinCtrl',
            ['$scope', 'fetchDataFactory', 'baConfig', '$timeout',

                async function MarvinCtrl($scope, fdf, baConfig, $timeout) {

                    // Update function to change the chart after selecting different properties
                    $scope.updateChart = async function () {
                        let data = await fdf.getProperties(file, $scope.prop1, $scope.prop2, 24);
                        console.log(data);
                        line = makeLineChart($scope.prop1, $scope.prop2, data);
                    };

                    // List of values for the drop-down menu
                    $scope.values = Property;

                    // Default values for the drop-down menu
                    $scope.prop1 = Property.TIME_STEP;
                    $scope.prop2 = Property.ELECTRICAL_POWER;

                    let file = '1d8a69a5-b692-47b7-aacb-b7f26692c0ec';
                    let data = await fdf.getProperties(file, $scope.prop1, $scope.prop2, 24);

                    let line = makeLineChart($scope.prop1, $scope.prop2, data);

                    line.addListener("rendered", zoomChart);

                    zoomChart();

                    // Make a line chart. Value and category are the properties to be plotted
                    function makeLineChart(category, value, data) {
                        console.log("makeLineChart: " + category + " | " + value + " (" + data.length + ")");
                        return AmCharts.makeChart("linediv", {
                            "type": "serial",
                            "theme": "light",
                            "marginRight": 40,
                            "marginLeft": 40,
                            "autoMarginOffset": 20,
                            "mouseWheelZoomEnabled":true,
                            "dataDateFormat": "YYYY-MM-DD",
                            "valueAxes": [{
                                "id": "v1",
                                "axisAlpha": 0,
                                "position": "left",
                                "ignoreAxisWidth":true
                            }],
                            "balloon": {
                                "borderThickness": 1,
                                "shadowAlpha": 0
                            },
                            "graphs": [{
                                "id": "g1",
                                "balloon":{
                                    "drop":true,
                                    "adjustBorderColor":false,
                                    "color":"#ffffff"
                                },
                                "bullet": "round",
                                "bulletBorderAlpha": 1,
                                "bulletColor": "#FFFFFF",
                                "bulletSize": 5,
                                "hideBulletsCount": 50,
                                "lineThickness": 2,
                                "title": "red line",
                                "useLineColorForBulletBorder": true,
                                "valueField": value,
                                "balloonText": "<span style='font-size:18px;'>[[value]]</span>"
                            }],
                            "chartScrollbar": {
                                "graph": "g1",
                                "oppositeAxis":false,
                                "offset":30,
                                "scrollbarHeight": 80,
                                "backgroundAlpha": 0,
                                "selectedBackgroundAlpha": 0.1,
                                "selectedBackgroundColor": "#888888",
                                "graphFillAlpha": 0,
                                "graphLineAlpha": 0.5,
                                "selectedGraphFillAlpha": 0,
                                "selectedGraphLineAlpha": 1,
                                "autoGridCount":true,
                                "color":"#AAAAAA"
                            },
                            "chartCursor": {
                                "pan": true,
                                "valueLineEnabled": true,
                                "valueLineBalloonEnabled": true,
                                "cursorAlpha":1,
                                "cursorColor":"#258cbb",
                                "limitToGraph":"g1",
                                "valueLineAlpha":0.2,
                                "valueZoomable":true
                            },
                            "valueScrollbar":{
                                "oppositeAxis":false,
                                "offset":50,
                                "scrollbarHeight":10
                            },
                            "categoryField": category,
                            "categoryAxis": {
                                "parseDates": true,
                                "dashLength": 1,
                                "minorGridEnabled": true
                            },
                            "export": {
                                "enabled": true
                            },
                            "dataProvider": data,
                        });
                    }

                    function zoomChart() {
                        line.zoomToIndexes(line.dataProvider.length - 40, line.dataProvider.length - 1);
                    }

                }])


})();