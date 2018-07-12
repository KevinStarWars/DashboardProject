(function () {
        'use strict';

        angular.module('Geothermal.pages.khristina')
            .controller('LineChartTwoCtrl',
                ['$scope', 'baConfig', 'fetchDataFactory', 'layoutPaths', 'commonFunctions',
                    async function LineChartTwoCtrl($scope, baConfig, fetchDataFactory, layoutPaths, commonFunctions) {

                        // List of relevant Properties
                        $scope.properties = {
                            EFFICIENCY:         "efficiency",
                            ELECTRICAL_POWER:   "electrical_power",
                            EXTRACTION_RATE:    "extraction_rate",
                            GEOTHERMAL_POWER:   "geothermal_power",
                        };

                        // Default value for the drop-down menu
                        $scope.selectedProperty = Property.EFFICIENCY;
                        $scope.selectedPlant = '1d8a69a5-b692-47b7-aacb-b7f26692c0ec';

                        let test_data = fetchDataFactory.getProperties($scope.selectedPlant, Property.TIME_STEP, $scope.selectedProperty, 24);
                        console.log(test_data);


                        let data = await fetchDataFactory.getProperties($scope.selectedPlant, Property.TIME_STEP, $scope.selectedProperty, 24);
                        console.log(data);

                        let line = makeLineChart(Property.TIME_STEP, $scope.selectedProperty, data);
                        zoomChart();

                        document.getElementById('line-chart-panel').style.display = 'inline';

                        // Broadcast listener, called when the selected plant is changed
                        $scope.$on('plant_changed', async function() {
                            data = await fetchDataFactory.getProperties($scope.selectedPlant, Property.TIME_STEP, $scope.selectedProperty, 24);
                            line = makeLineChart(Property.TIME_STEP, $scope.selectedProperty, data);
                            zoomChart()
                        });

                        // Called when the selected property is changed
                        $scope.updateChart = async function (element) {
                            $scope.selectedProperty = element.p;
                            data = await fetchDataFactory.getProperties($scope.selectedPlant, Property.TIME_STEP, $scope.selectedProperty, 24);
                            line = makeLineChart(Property.TIME_STEP, $scope.selectedProperty, data);
                            zoomChart();
                            document.getElementById("selected-property").nodeValue = element.p;
                        };

                        // Make a line chart. Value and category are the properties to be plotted
                        function makeLineChart(category, value, data) {
                            console.log("makeLineChart: " + category + " | " + value + " (" + data.length + ")");
                            console.log(data);
                            return AmCharts.makeChart("line-chart-div2", {
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
                                        "color":"#ffb41e"
                                    },
                                    "bullet": "round",
                                    "bulletBorderAlpha": 1,
                                    "bulletColor": "#ffd526",
                                    "bulletSize": 8,
                                    "hideBulletsCount": 50,
                                    "lineThickness": 2,
                                    "title": "red line",
                                    "lineColor": "#248837",
                                    "type": "smoothedLine",
                                    "useLineColorForBulletBorder": true,
                                    "valueField": value,
                                    "balloonFunction": function (item) {
                                        return getBalloonText(item);
                                    },
                                    //"balloonText": "<span style='font-size:18px;'>[[Math.round(value)]]</span>"
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
                        $scope.changePlant = async function (element) {
                            $scope.selectedPlant = element.name;
                            document.getElementById("selected").nodeValue = element.name;

                            // Broadcast change to child controllers
                            $scope.$broadcast('plant_changed');
                        };

                        $scope.powerplants = await fetchDataFactory.getAllNames();
                        console.log("powerplants " + $scope.powerplants);
                        $scope.selectedPlant = $scope.powerplants[0];
                        console.log("selected main " + $scope.selectedPlant);

                    }
                ]
            )

    }
)
();