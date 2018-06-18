(function () {
    'use strict';

    angular.module('Geothermal.pages.dashboard')
        .controller('DepthChartCtrl',
            ['$scope', 'baConfig', 'fetchDataFactory', 'layoutPaths', 'dashboardFactory',
                async function DepthChartCtrl($scope, baConfig, fetchDataFactory, layoutPaths, dashboardFactory) {
            $scope.checkboxModel = true;
            document.getElementById('depthChartPanel').style.display = 'none';
            let nameDepthArray = await fetchDataFactory.fetchNameDepthArray();
            let nameArray = [];
            nameDepthArray.forEach(function (item) {
                nameArray.push(item[0]);
            });
            $scope.names = nameArray;
            let layoutColors = baConfig.colors;
            let colorArray = [
                layoutColors.dashboard.blueStone,
                layoutColors.dashboard.gossip,
                layoutColors.dashboard.silverTree,
                layoutColors.dashboard.surfieGreen,
                layoutColors.dashboard.white
            ];
            let dataProvider = [];
            nameDepthArray.forEach(function (value) {
                dataProvider.push({
                    geothermal: value[0],
                    depth: parseFloat(value[1]),
                    color: colorArray[Math.floor(Math.random()*colorArray.length)]
                })
            });
            let barChart = AmCharts.makeChart('depthChart', {
                type: 'serial',
                theme: 'blur',
                color: layoutColors.defaultText,
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
                        position: 'left',
                        title: 'Depth',
                        gridAlpha: 0.5,
                        gridColor: layoutColors.border,
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
                    gridColor: layoutColors.border,
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
                console.log(element);
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
                                    color: colorArray[Math.floor(Math.random()*colorArray.length)]
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