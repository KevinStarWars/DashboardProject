(function () {
    'use strict';

    angular.module('Geothermal.pages.dashboard')
        .controller('DepthChartCtrl',
            ['baConfig', 'fetchDataFactory', 'layoutPaths',
                async function DepthChartCtrl(baConfig, fetchDataFactory, layoutPaths) {
            let nameDepthArray = await fetchDataFactory.fetchNameDepthArray();
            let layoutColors = baConfig.colors;
            console.log(layoutColors);
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
            console.log(dataProvider);
            let barChart = AmCharts.makeChart('depthChart', {
                type: 'serial',
                theme: 'blur',
                color: layoutColors.defaultText,
                dataProvider: dataProvider,
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

            function handleClick(event){
                let locationString = 'http://localhost:3000/#/' + event['item']['category'];
                console.log(locationString);
                window.open(locationString, "_top");
            }
        }
        ]
        )
}
)
();