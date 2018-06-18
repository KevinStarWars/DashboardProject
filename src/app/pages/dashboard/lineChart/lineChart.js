(function () {
        'use strict';

        angular.module('Geothermal.pages.dashboard')
            .controller('DshbrdLineChartCtrl',
                ['$scope', 'baConfig', 'fetchDataFactory', 'layoutPaths',
                    async function DshbrdLineChartCtrl($scope, baConfig, fetchDataFactory, layoutPaths) {
                let downSampleRate = 100;
                let names = await fetchDataFactory.getAllNames();
                console.log('Hello World');
                $scope.names = names;
                $scope.checkboxModel = true;
                let data = await fetchDataFactory.fetchDownSampledEfficiencyTimes(names, downSampleRate);
                console.log(data);
                let layoutColors = baConfig.colors;
                let lineChart = AmCharts.makeChart('lineChart', {
                    type: 'serial',
                    theme: 'blur',
                    color: layoutColors.defaultText,
                    marginTop: 0,
                    marginRight: 15,
                    dataProvider: data,
                    valueAxes: [
                        {
                            axisAlpha: 0,
                            position: 'left',
                            gridAlpha: 0.5,
                            gridColor: layoutColors.border,
                        }
                    ],
                    graphs: [
                        {
                            id: 'g1',
                            balloonText: '[[value]]',
                            bullet: 'round',
                            bulletSize: 8,
                            lineColor: layoutColors.danger,
                            lineThickness: 1,
                            negativeLineColor: layoutColors.warning,
                            type: 'smoothedLine',
                            valueField: 'value'
                        }
                    ],
                    chartScrollbar: {
                        graph: 'g1',
                        gridAlpha: 0,
                        color: layoutColors.defaultText,
                        scrollbarHeight: 55,
                        backgroundAlpha: 0,
                        selectedBackgroundAlpha: 0.05,
                        selectedBackgroundColor: layoutColors.defaultText,
                        graphFillAlpha: 0,
                        autoGridCount: true,
                        selectedGraphFillAlpha: 0,
                        graphLineAlpha: 0.2,
                        selectedGraphLineColor: layoutColors.defaultText,
                        selectedGraphLineAlpha: 1
                    },
                    chartCursor: {
                        categoryBalloonDateFormat: 'YYYY',
                        cursorAlpha: 0,
                        valueLineEnabled: true,
                        valueLineBalloonEnabled: true,
                        valueLineAlpha: 0.5,
                        fullWidth: true
                    },
                    dataDateFormat: 'YYYY',
                    categoryField: 'year',
                    categoryAxis: {
                        minPeriod: 'YYYY',
                        parseDates: true,
                        minorGridAlpha: 0.1,
                        minorGridEnabled: true,
                        gridAlpha: 0.5,
                        gridColor: layoutColors.border,
                    },
                    export: {
                        enabled: true
                    },
                    creditsPosition: 'bottom-right',
                    pathToImages: layoutPaths.images.amChart
                });

                lineChart.addListener('rendered', zoomChart);
                if (lineChart.zoomChart) {
                    lineChart.zoomChart();
                }

                function zoomChart() {
                    lineChart.zoomToIndexes(Math.round(lineChart.dataProvider.length * 0.4), Math.round(lineChart.dataProvider.length * 0.55));
                }
            }
            ]
            )
}
)
();