(function () {
        'use strict';

        angular.module('Geothermal.pages.khristina')
            .controller('compareChartController',
                ['$scope', 'baConfig', 'fetchDataFactory', 'layoutPaths', 'commonFunctions',
                    async function compareChartController($scope, baConfig, fetchDataFactory, layoutPaths, commonFunctions) {
                        let downSampleRate = 500;
                        let allData = await fetchDataFactory.fetchTimeStepAllEfficiencies(downSampleRate);
                        let graphs = [];

                        let plants = [];
                        plants.push({
                            name: $scope.selectedPlantOne,
                            color: "#d1655d"
                        });
                        plants.push({
                            name: $scope.selectedPlantTwo,
                            color: "#248837"
                        });

                        let i = 1;
                        plants.forEach(function (item) {
                            graphs.push({
                                id: i,
                                balloonText: '',
                                bullet: 'round',
                                bulletSize: 8,
                                lineColor: item['color'],
                                lineThickness: 1,
                                negativeLineColor: commonFunctions.getWarningColor(),
                                type: 'smoothedLine',
                                valueField: item['name'],
                                negativeFillAlphas: 1,
                            });
                            i++;
                        });

                        let lineChart = AmCharts.makeChart('compareChart', {
                            type: 'serial',
                            theme: 'blur',
                            color: commonFunctions.getTextColor(),
                            marginTop: 0,
                            marginRight: 15,
                            dataProvider: allData,
                            valueAxes: [
                                {
                                    axisAlpha: 0,
                                    position: 'left',
                                    gridAlpha: 0.5,
                                    gridColor: commonFunctions.getBorderColor(),
                                    useScientificNotation: true,
                                    unit: fetchDataFactory.getUnit($scope.selectedProperty)
                                }
                            ],
                            graphs: graphs,
                            chartScrollbar: {
                                graph: 'g1',
                                gridAlpha: 0,
                                color: commonFunctions.getTextColor(),
                                scrollbarHeight: 55,
                                backgroundAlpha: 0,
                                selectedBackgroundAlpha: 0.05,
                                selectedBackgroundColor: commonFunctions.getTextColor(),
                                graphFillAlpha: 0,
                                autoGridCount: true,
                                selectedGraphFillAlpha: 0,
                                graphLineAlpha: 0.2,
                                selectedGraphLineColor: commonFunctions.getTextColor(),
                                selectedGraphLineAlpha: 1
                            },
                            chartCursor: {
                                categoryBalloonDateFormat: 'YYYY-MM-DD',
                                cursorAlpha: 0,
                                valueLineEnabled: true,
                                valueLineBalloonEnabled: false,
                                valueLineAlpha: 0.5,
                                fullWidth: true
                            },
                            dataDateFormat: 'YYYY-MM-DD',
                            categoryField: 'time_step',
                            categoryAxis: {
                                minPeriod: 'DD',
                                parseDates: true,
                                minorGridAlpha: 0.1,
                                minorGridEnabled: true,
                                gridAlpha: 0.5,
                                gridColor: commonFunctions.getBorderColor(),
                            },
                            export: {
                                enabled: true
                            },
                            creditsPosition: 'bottom-right',
                            pathToImages: layoutPaths.images.amChart,
                        });

                        $scope.$on('plant_changed_two', async function() {
                            for (let i = 0; i < lineChart.graphs.length; i++){
                                if (lineChart.graphs[i].id === 2){
                                    lineChart.graphs[i].valueField = $scope.selectedPlantTwo;
                                }
                            }
                            lineChart.validateData();
                        });

                        $scope.$on('plant_changed_one', async function() {
                            for (let i = 0; i < lineChart.graphs.length; i++){
                                if (lineChart.graphs[i].id === 1){
                                    lineChart.graphs[i].valueField = $scope.selectedPlantOne;
                                }
                            }
                            lineChart.validateData();
                        });

                        $scope.$on('propertyChanged', async function () {
                            lineChart.dataProvider = await fetchDataFactory.fetchTimeStepAllProperty(downSampleRate, $scope.selectedProperty);
                            lineChart.validateData();
                        });

                        $scope.$on('lineChartOneZoomedIteration', function (event, args) {
                            lineChart.zoom(args.startDate, args.endDate);
                        });

                        $scope.$on('lineChartTwoZoomedIteration', function (event, args) {
                            lineChart.zoom(args.startDate, args.endDate);
                        });
                    }
                ]
            )
    }
)
();