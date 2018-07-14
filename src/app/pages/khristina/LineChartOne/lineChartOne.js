(function () {
        'use strict';

        angular.module('Geothermal.pages.khristina')
            .controller('LineChartOneCtrl',
                ['$scope', 'baConfig', 'fetchDataFactory', 'layoutPaths', 'commonFunctions',
                    async function LineChartOneCtrl($scope, baConfig, fetchDataFactory, layoutPaths, commonFunctions) {

                        let downsampleRate = 500;

                        // List of relevant Properties
                        $scope.properties = {
                            EFFICIENCY:         "efficiency",
                            ELECTRICAL_POWER:   "electrical_power",
                            EXTRACTION_RATE:    "extraction_rate",
                            GEOTHERMAL_POWER:   "geothermal_power",
                        };

                        let data = await fetchDataFactory.getProperties($scope.selectedPlantOne, Property.TIME_STEP, $scope.selectedProperty, downsampleRate);

                        let line = makeLineChart(Property.TIME_STEP, $scope.selectedProperty, data);
                        zoomChart();

                        document.getElementById('line-chart-panel').style.display = 'inline';

                        // Broadcast listener, called when the selected plant is changed
                        $scope.$on('plant_changed_one', async function() {
                            data = await fetchDataFactory.getProperties($scope.selectedPlantOne, Property.TIME_STEP, $scope.selectedProperty, downsampleRate);
                            line = makeLineChart(Property.TIME_STEP, $scope.selectedProperty, data);
                            zoomChart();
                        });


                        $scope.$on('propertyChanged', async function () {
                            data = await fetchDataFactory.getProperties($scope.selectedPlantOne, Property.TIME_STEP, $scope.selectedProperty, downsampleRate);
                            line = makeLineChart(Property.TIME_STEP, $scope.selectedProperty, data);
                            zoomChart();
                        });

                        // Make a line chart. Value and category are the properties to be plotted
                        function makeLineChart(category, value, data) {
                            return AmCharts.makeChart("line-chart-div", {
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
                                    "borderThickness": 3,
                                    "shadowAlpha": 1
                                },
                                "graphs": [{
                                    "id": "g1",
                                    "balloonText": "[[category]]<br><b><span style='font-size:14px;'>[[value]]</span></b>",
                                    "balloon":{
                                        "drop":true,
                                        "adjustBorderColor":false,
                                        "color":"#ff0c03"
                                    },
                                    "bullet": "round",
                                    "bulletBorderAlpha": 1,
                                    "bulletColor": "#ff0a13",
                                    "bulletSize": 8,
                                    "hideBulletsCount": 50,
                                    "lineThickness": 2,
                                    "title": "red line",
                                    "lineColor": "#d1655d",
                                    "type": "smoothedLine",
                                    "useLineColorForBulletBorder": true,
                                    "valueField": value
                                }],
                                "chartScrollbar": {
                                    "graph": "g1",
                                    "oppositeAxis":false,
                                    "gridAlpha":0,
                                    "offset":30,
                                    "scrollbarHeight": 80,
                                    "backgroundAlpha": 0,
                                    "selectedBackgroundAlpha": 0.1,
                                    "selectedBackgroundColor": "#888888",
                                    "graphFillAlpha": 0,
                                    "graphLineAlpha": 0.5,
                                    "selectedGraphFillAlpha": 0,
                                    "selectedGraphLineAlpha": 1,
                                    "graphLineColor":"#42a2c2",
                                    "selectedGraphLineColor":"#2e886c",
                                    "autoGridCount":true,
                                    "color":"#193c88"
                                },
                                "chartCursor": {
                                    "categoryBalloonDateFormat": "YYYY",
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
                                    "minorGridAlpha": 0.1,
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
                    }
                ]
            )

    }
)
();