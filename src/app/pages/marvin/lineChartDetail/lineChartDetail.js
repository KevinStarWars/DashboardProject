(function () {
        'use strict';

        angular.module('Geothermal.pages.marvin')
            .controller('LineChartDetailCtrl',
                ['$scope', 'baConfig', 'fetchDataFactory', 'layoutPaths', 'commonFunctions',
                    async function LineChartDetailCtrl($scope, baConfig, fdf, layoutPaths, commonFunctions) {

                        let plant = "";
                        if ($scope.selectedPlantTwo === undefined){
                            plant = "1d8a69a5-b692-47b7-aacb-b7f26692c0ec";
                        } else {
                            plant = $scope.selectedPlantTwo;
                        }

                        // List of relevant Properties
                        $scope.properties = {
                            EFFICIENCY:         "efficiency",
                            ELECTRICAL_POWER:   "electrical_power",
                            EXTRACTION_RATE:    "extraction_rate",
                            GEOTHERMAL_POWER:   "geothermal_power",
                        };

                        // Default value for the drop-down menu
                        $scope.selectedProperty = Property.EFFICIENCY;

                        let data = await fdf.getProperties(plant, Property.TIME_STEP, $scope.selectedProperty, 24);
                        $scope.dateFrom = getDateObjectFromString(data[0][Property.TIME_STEP]);
                        $scope.dateTo = getDateObjectFromString(data[data.length -1][Property.TIME_STEP]) -1;

                        let line = makeLineChart(Property.TIME_STEP, $scope.selectedProperty, data);
                        line.addListener('rendered', zoomChart);

                        document.getElementById('line-chart-panel').style.display = 'inline';

                        // Broadcast listener, called when the selected plant is changed
                        $scope.$on('plant_changed', async function() {
                            if ($scope.selectedPlantTwo === undefined){
                                plant = "1d8a69a5-b692-47b7-aacb-b7f26692c0ec";
                            } else {
                                plant = $scope.selectedPlantTwo;
                            }
                            data = await fdf.getProperties(plant, Property.TIME_STEP, $scope.selectedProperty, 24);
                            $scope.dateFrom = getDateObjectFromString(data[0][Property.TIME_STEP]);
                            $scope.dateTo = getDateObjectFromString(data[data.length -1][Property.TIME_STEP]) -1;
                            line = makeLineChart(Property.TIME_STEP, $scope.selectedProperty, data);
                        });

                        // Called when the selected property is changed
                        $scope.updateChart = async function (element) {
                            if ($scope.selectedPlantTwo === undefined){
                                plant = "1d8a69a5-b692-47b7-aacb-b7f26692c0ec";
                            } else {
                                plant = $scope.selectedPlantTwo;
                            }
                            $scope.selectedProperty = element.p;
                            data = await fdf.getProperties(plant, Property.TIME_STEP, $scope.selectedProperty, 24);
                            line = makeLineChart(Property.TIME_STEP, $scope.selectedProperty, data);
                        };

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
                            return `<b>${Math.round(item.values.value)} ${unit}</b>`;
                        }

                        function zoomChart() {
                            if ($scope.dateTo === "" || $scope.dateFrom === ""){
                                line.zoomToIndexes(line.dataProvider.length - 40, line.dataProvider.length - 1);
                            } else {
                                line.zoom($scope.dateTo, $scope.dateFrom);
                            }
                        }

                        $scope.format = 'yyyy-MM-dd';

                        $scope.openFrom = openFrom;
                        $scope.openedFrom = false;
                        $scope.optionsFrom = {
                            showWeeks: false,
                            defaultViewDate: $scope.dateFrom,
                            endDate: $scope.dateTo,
                            startDate: $scope.dateFrom
                        };

                        function openFrom() {
                            $scope.openedFrom = true;
                        }

                        $scope.openTo = openTo;
                        $scope.openedTo = false;
                        $scope.optionsTo = {
                            showWeeks: false,
                            defaultViewDate: $scope.dateTo,
                            endDate: $scope.dateTo,
                            startDate: $scope.dateFrom
                        };

                        function openTo() {
                            $scope.openedTo = true;
                        }

                        $scope.toChanged = function toChanged(){
                            if ($scope.dateFrom !== ""){
                                line.zoom($scope.dateFrom, $scope.dateTo);
                            }
                        };

                        $scope.fromChanged = function fromChanged() {
                            if ($scope.dateTo  !== ""){
                                line.zoom($scope.dateFrom, $scope.dateTo);
                            }
                        };

                        /**
                         * YYYY-MM-DD
                         */
                        function getDateObjectFromString(dateString){
                            let returnObject = {
                                day: "",
                                month: "",
                                year: ""
                            };

                            returnObject.year = dateString.substring(0, dateString.indexOf("-"));
                            returnObject.month = dateString.substring(dateString.indexOf("-"), dateString.split('-', 2).join("-").length);
                            returnObject.day= dateString.substring(dateString.split('-', 2).join("-").length, dateString.length-1);

                            return new Date(returnObject.year, returnObject.month-1, returnObject.day);
                        }

                    }
                ]
            )

    }
)
();