(function () {
        'use strict';

        angular.module('Geothermal.pages.dashboard')
            .controller('DshbrdLineChartCtrl',
                    ['$scope', 'baConfig', 'fetchDataFactory', 'layoutPaths', 'commonFunctions',
                    async function DshbrdLineChartCtrl($scope, baConfig, fetchDataFactory, layoutPaths, commonFunctions) {
                let downSampleRate = 500;
                let allData = await fetchDataFactory.fetchTimeStepAllEfficiencies(downSampleRate);
                let graphs = [];
                let categories = await fetchDataFactory.getAllCategories();
                $scope.categories = [];
                categories.forEach(function (category) {
                    if (category !== 'depth' && category !== 'temperature' && category !== 'time_step' && category !== 'id'){
                        $scope.categories.push(category)
                    }
                });
                $scope.names = await fetchDataFactory.getAllNames();
                $scope.checkboxModel = true;
                $scope.names.forEach(function (item) {
                    graphs.push({
                        id: item,
                        balloonText: '[[' + item + ']]',
                        bullet: 'round',
                        bulletSize: 8,
                        lineColor: commonFunctions.getRandomColor(),
                        lineThickness: 1,
                        negativeLineColor: commonFunctions.getWarningColor(),
                        type: 'smoothedLine',
                        valueField: item,
                        negativeBase: allData[0][item]  * 0.75,
                    });
                });
                let lineChart = AmCharts.makeChart('lineChart', {
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
                        valueLineBalloonEnabled: true,
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
                    listeners: [
                        {
                            event: 'rendered',
                            method: makePanelVisible()
                        }
                    ],
                });

                console.log(lineChart.graphs);

                lineChart.addListener('rendered', zoomChart);
                if (lineChart.zoomChart) {
                    lineChart.zoomChart();
                }

                function zoomChart() {
                    lineChart.zoomToIndexes(Math.round(lineChart.dataProvider.length * 0.4), Math.round(lineChart.dataProvider.length * 0.55));
                }

                function makePanelVisible(){
                    document.getElementById('lineChartPanel').style.display = 'inline';
                }

                function makeDiagramVisible(){
                    document.getElementById('lineChart').style.visibility = 'visible';
                }

                $scope.removeData = function(element) {
                    let graphs = lineChart.graphs;
                    graphs.forEach(function (graph) {
                        if (graph.id === element.name){
                            if (element.checkboxModel === false){
                                lineChart.hideGraph(graph);
                            } else {
                                lineChart.showGraph(graph);
                            }
                        }
                    });
                };

                $scope.changeButtonName = async function (element) {
                    document.getElementById('lineChart').style.visibility = 'hidden';
                    document.getElementById('dropdown').childNodes[0].nodeValue = element.category.replace("_", " ").toUpperCase();
                    let dataProvider = await fetchDataFactory.fetchTimeStepAllProperty(downSampleRate, element.category);
                    lineChart.dataProvider = dataProvider;
                    for (let i = 0; i < $scope.names.length; i++){
                        lineChart.graphs[i].negativeBase  = dataProvider[0][$scope.names[i]]*0.7;
                    }
                    lineChart.validateData();
                    makeDiagramVisible();
                }
            }
            ]
            )
}
)
();