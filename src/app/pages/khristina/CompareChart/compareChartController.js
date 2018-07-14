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
                            name: '1d8a69a5-b692-47b7-aacb-b7f26692c0ec',
                            color: '#8c510a'
                        });
                        plants.push({
                            name: '1d8a69a5-b692-47b7-aacb-b7f26692c0ec',
                            color: '#01665e'
                        });

                        let i = 0;
                        plants.forEach(function (item) {
                            graphs.push({
                                id: item['name'],
                                balloonText: '',
                                bullet: 'round',
                                bulletSize: 8,
                                lineColor: item['color'],
                                lineThickness: 1,
                                negativeLineColor: commonFunctions.getWarningColor(),
                                type: 'smoothedLine',
                                valueField: item['name'],
                                negativeBase: allData[0][item['name']]  * 0.75,
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
                        lineChart.addListener("clickGraphItem", function (event) {
                            console.log(event);
                        });

                    }
                ]
            )
    }
)
();