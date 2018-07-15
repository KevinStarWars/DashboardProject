(function () {
        'use strict';

        angular.module('Geothermal.pages.khristina')
            .controller('LineChartTwoCtrl',
                ['$scope', 'baConfig', 'fetchDataFactory', 'layoutPaths', 'commonFunctions',
                    async function LineChartTwoCtrl($scope, baConfig, fetchDataFactory, layoutPaths, commonFunctions) {

                        let downSampleRate = 500;
                        let data = await fetchDataFactory.getProperties($scope.selectedPlantTwo, Property.TIME_STEP, $scope.selectedProperty, downSampleRate);
                        let line = makeLineChart(Property.TIME_STEP, $scope.selectedProperty, data);

                        addZoomListener(line);

                        document.getElementById('line-chart-panel').style.display = 'inline';

                        // Broadcast listener, called when the selected plant is changed
                        $scope.$on('plant_changed_two', async function() {
                            data = await fetchDataFactory.getProperties($scope.selectedPlantTwo, Property.TIME_STEP, $scope.selectedProperty, downSampleRate);
                            line = makeLineChart(Property.TIME_STEP, $scope.selectedProperty, data);
                            addZoomListener(line);
                        });

                        $scope.$on('propertyChanged', async function () {
                            data = await fetchDataFactory.getProperties($scope.selectedPlantTwo, Property.TIME_STEP, $scope.selectedProperty, downSampleRate);
                            line = makeLineChart(Property.TIME_STEP, $scope.selectedProperty, data);
                            addZoomListener(line);
                        });

                        $scope.changePlant = async function (element) {
                            $scope.selectedPlantTwo = element.name;
                            $scope.$broadcast('plant_changed');
                        };

                        // Make a line chart. Value and category are the properties to be plotted
                        function makeLineChart(category, value, data) {
                            return AmCharts.makeChart("line-chart-div2", {
                                "type": "serial",
                                "theme": "blur",
                                "marginRight": 40,
                                "marginLeft": 40,
                                "autoMarginOffset": 20,
                                "mouseWheelZoomEnabled":true,
                                "dataDateFormat": "YYYY-MM-DD",
                                "valueAxes": [{
                                    "id": "v1",
                                    "axisAlpha": 0,
                                    "position": "left",
                                    "ignoreAxisWidth":true,
                                    useScientificNotation: true,
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
                                    "valueLineEnabled": true,
                                    "valueLineBalloonEnabled": true,
                                    "cursorAlpha":0,
                                    "valueLineAlpha":0.5,
                                    fullWidth: true
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

                        function addZoomListener(line){
                            line.addListener('zoomed', function () {
                                $scope.$emit('lineChartTwoZoomed',
                                    {
                                        startDate: line.startDate,
                                        endDate: line.endDate
                                    });
                            });
                        }
                    }
                ]
            )

    }
)
();