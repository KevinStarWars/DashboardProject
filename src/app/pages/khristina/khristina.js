(function () {
    'use strict';

    angular.module('Geothermal.pages.khristina')
        .controller('KhristinaCtrl',
            ['$scope', 'fetchDataFactory', 'baConfig', '$timeout','$interval', 'stopableInterval','$window',
                async function KhristinaCtrl($scope, fetchDataFactory, $timeout, baConfig, $interval, stopableInterval, $window, fdf) {

                    // List of relevant Properties
                    $scope.properties = {
                        EFFICIENCY:         "efficiency",
                        ELECTRICAL_POWER:   "electrical_power",
                        EXTRACTION_RATE:    "extraction_rate",
                        GEOTHERMAL_POWER:   "geothermal_power",
                    };

                    $scope.selectedProperty = $scope.properties.EFFICIENCY;
                    $scope.selectedPlantOne = '1d8a69a5-b692-47b7-aacb-b7f26692c0ec';
                    $scope.selectedPlantTwo = 'a6e390e5-c28d-48f2-9f85-255acb38117f';

                    $scope.powerplants = await fetchDataFactory.getAllNames();

                    $scope.updateProperty = function (element) {
                        $scope.selectedProperty = element.p;
                        $scope.$broadcast('propertyChanged');
                    };

                    $scope.changePlantOne = function(element){
                        $scope.selectedPlantOne = element.name;
                        $scope.$broadcast('plant_changed_one');
                    };

                    $scope.changePlantTwo = function(element){
                        $scope.selectedPlantTwo = element.name;
                        $scope.$broadcast('plant_changed_two');
                    };

                    $scope.$on('lineChartOneZoomed', function (event, args) {
                        console.log('lineChartOneZoomed');
                        $scope.$broadcast('lineChartOneZoomedIteration', args);
                    });

                    $scope.$on('lineChartTwoZoomed', function (event, args) {
                        $scope.$broadcast('lineChartTwoZoomedIteration', args);
                    });
                }
            ]
        )

    }
)
();
