(function () {
        'use strict';

        angular.module('Geothermal.pages.marvin')
            .controller('LineChartDetailCtrl',
                ['$scope', 'baConfig', 'fetchDataFactory', 'layoutPaths', 'commonFunctions',
                    async function LineChartDetailCtrl($scope, baConfig, fdf, layoutPaths, commonFunctions) {

                        // List of relevant Properties
                        $scope.properties = {
                            EFFICIENCY:         "efficiency",
                            ELECTRICAL_POWER:   "electrical_power",
                            EXTRACTION_RATE:    "extraction_rate",
                            GEOTHERMAL_POWER:   "geothermal_power",
                        };

                        // Default value for the drop-down menu
                        $scope.selectedProperty = Property.EFFICIENCY;

                        let data = await fdf.getProperties($scope.selectedPlant, Property.TIME_STEP, $scope.selectedProperty, 24);
                        let line = makeLineChart(Property.TIME_STEP, $scope.selectedProperty, data);
                        zoomChart();

                        document.getElementById('line-chart-panel').style.display = 'inline';

                        // Broadcast listener, called when the selected plant is changed
                        $scope.$on('plant_changed', async function() {
                            data = await fdf.getProperties($scope.selectedPlant, Property.TIME_STEP, $scope.selectedProperty, 24);
                            line = makeLineChart(Property.TIME_STEP, $scope.selectedProperty, data);
                            zoomChart()
                        });

                        // Called when the selected property is changed
                        $scope.updateChart = async function (element) {
                            $scope.selectedProperty = element.p;
                            data = await fdf.getProperties($scope.selectedPlant, Property.TIME_STEP, $scope.selectedProperty, 24);
                            line = makeLineChart(Property.TIME_STEP, $scope.selectedProperty, data);
                            zoomChart();
                            document.getElementById("selected-property").nodeValue = element.p;
                        };

                        // Make a line chart. Value and category are the properties to be plotted
                        function makeLineChart(category, value, data) {
                            console.log("makeLineChart: " + category + " | " + value + " (" + data.length + ")");
                            console.log(data);
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
                                    "balloonFunction": function (item) {
                                        return getBalloonText(item);
                                    },
                                    //"balloonText": "<span style='font-size:18px;'>[[Math.round(value)]]</span>"
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

                        function getBalloonText(item) {
                            let unit = "";

                            switch ($scope.selectedProperty) {
                                case Property.EFFICIENCY:
                                    unit = "%";
                                    break;
                                case Property.ELECTRICAL_POWER:
                                    unit = "kW/h";
                                    break;
                                case Property.GEOTHERMAL_POWER:
                                    unit = "kW/h";
                                    break;
                                case Property.EXTRACTION_RATE:
                                    unit = "l/min";
                                    break;
                            }
                            return "<b>" + Math.round(item.values.value) + " " + unit + "</b>";
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