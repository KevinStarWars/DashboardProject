(function () {
        'use strict';

        angular.module('Geothermal.pages.marvin')
            .controller('GaugeDetailCtrl',
                ['$scope', 'baConfig', 'fetchDataFactory', 'layoutPaths', 'commonFunctions',
                    async function GaugeDetailCtrl($scope, baConfig, fdf, layoutPaths, commonFunctions) {

                        // Default plant
                        let plant = "1d8a69a5-b692-47b7-aacb-b7f26692c0ec";
                        if ($scope.selectedPlant !== undefined){
                            plant = $scope.selectedPlant;
                        }

                        let values = await fdf.fetchElectricalPowerArray(plant);
                        let maxValue = Math.max(...values);

                        let chart = makeGauge(Math.round(maxValue));

                        makePanelVisible();
                        setInterval(random, 1000);

                        // Broadcast listener, called when the selected plant is changed
                        $scope.$on('plant_changed', async function() {
                            // Recalculate values and redraw gauge
                            values = await fdf.fetchElectricalPowerArray($scope.selectedPlant);
                            maxValue = Math.max(...values);
                            chart = makeGauge(Math.round(maxValue));
                        });

                        // Draw the gauge
                        function makeGauge(maxValue) {
                            return AmCharts.makeChart("gauge-detail-div", {
                                "theme": "light",
                                "type": "gauge",
                                "axes": [{
                                    "topTextFontSize": 20,
                                    "topTextYOffset": 70,
                                    "axisColor": "#31d6ea",
                                    "axisThickness": 1,
                                    "endValue": 2 * maxValue,
                                    "gridInside": true,
                                    "inside": true,
                                    "radius": "50%",
                                    "valueInterval": Math.round(maxValue / 2),
                                    "tickColor": "#67b7dc",
                                    "startAngle": -90,
                                    "endAngle": 90,
                                    "unit": "",
                                    "bandOutlineAlpha": 0,
                                    "bands": [{
                                        "color": "#0080ff",
                                        "endValue": 2 * maxValue,
                                        "innerRadius": "105%",
                                        "radius": "170%",
                                        "gradientRatio": [0.5, 0, -0.5],
                                        "startValue": 0
                                    }, {
                                        "color": "#3cd3a3",
                                        "endValue": maxValue * 1.2,
                                        "innerRadius": "105%",
                                        "radius": "170%",
                                        "gradientRatio": [0.5, 0, -0.5],
                                        "startValue": maxValue * 0.8
                                    }]
                                }],
                                "arrows": [{
                                    "alpha": 1,
                                    "innerRadius": "35%",
                                    "nailRadius": 0,
                                    "radius": "170%"
                                }]
                            });
                        }

                        function makePanelVisible() {
                            document.getElementById('gauge-panel').style.display = 'inline';
                        }

                        // Generate random values for the gauge
                        function random() {
                            let value = Math.floor(Math.random() * maxValue * 0.4) + maxValue * 0.8;
                            chart.arrows[0].setValue(value);
                            chart.axes[0].setTopText(Math.round(value).toLocaleString('en-us') + " kW/h");
                        }
                    }
                ]
            )
    }
)
();