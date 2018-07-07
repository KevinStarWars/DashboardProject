(function () {
    'use strict';

    angular.module('Geothermal.pages.dashboard')
        .controller('DepthChartCtrl',
            ['$scope', 'baConfig', 'fetchDataFactory', 'layoutPaths', 'dashboardFactory', 'commonFunctions',
                async function DepthChartCtrl($scope, baConfig, fetchDataFactory, layoutPaths, dashboardFactory, commonFunctions) {
            $scope.checkboxModel = true;
            let nameDepthArray = await fetchDataFactory.fetchNameDepthArray();
            $scope.names = await fetchDataFactory.getAllNames();
            let dataProvider = [];
            nameDepthArray.forEach(function (value) {
                dataProvider.push({
                    geothermal: value[0],
                    depth: parseFloat(value[1]),
                    color: commonFunctions.getDepthColor() 
                })
            });
            let barChart = AmCharts.makeChart('depthChart', {
                type: 'serial',
                theme: 'blur',
                color: commonFunctions.getTextColor(),
                dataProvider: dataProvider,
                listeners: [
                    {
                        event: 'rendered',
                        method: makeVisible()
                    }
                ],
                valueAxes: [
                    {
                        axisAlpha: 0,
                        reversed: true,
                        position: 'left',
                        title: 'Depth',
                        gridAlpha: 0.5,
                        gridColor: commonFunctions.getBorderColor(),
                    }
                ],
                startDuration: 1,
                graphs: [
                    {
                        balloonText: '<b>[[category]]: [[value]]</b>',
                        fillColorsField: 'color',
                        fillAlphas: 0.7,
                        lineAlpha: 0.2,
                        type: 'column',
                        valueField: 'depth'
                    }
                ],
                chartCursor: {
                    categoryBalloonEnabled: false,
                    cursorAlpha: 0,
                    zoomable: false
                },
                categoryField: 'geothermal',
                categoryAxis: {
                    gridPosition: 'start',
                    labelRotation: 45,
                    gridAlpha: 0.5,
                    gridColor: commonFunctions.getBorderColor(),
                },
                export: {
                    enabled: true
                },
                creditsPosition: 'top-right',
                pathToImages: layoutPaths.images.amChart
            });

            barChart.addListener("clickGraphItem", handleClick);

            function makeVisible() {
                document.getElementById('depthChartPanel').style.display = 'inline';
            }

            function handleClick(event){
                let locationString = 'http://localhost:3000/#/' + event['item']['category'];
                window.open(locationString, "_top");
            }

            $scope.removeData = function(element){
                if (element.checkboxModel === false) {
                    let index = dataProvider.findIndex(function (value) {
                        if (value.geothermal === element.name) {
                            return true;
                        }
                    });
                    if (index !== -1) {
                        dataProvider.splice(index, 1);
                        barChart.validateData();
                    }
                } else {
                    if (!dataProvider.includes(element.name)) {
                        nameDepthArray.forEach(function (item) {
                            if (item[0] === element.name){
                                dataProvider.push({
                                    geothermal: item[0],
                                    depth: parseFloat(item[1]),
                                    color: commonFunctions.getRandomColor()
                                });
                                barChart.validateData();
                            }
                        })
                    }
                }
            }
        }
        ]
        )
}
)
();