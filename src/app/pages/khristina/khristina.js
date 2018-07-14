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
                    $scope.selectedPlantTwo = '1d8a69a5-b692-47b7-aacb-b7f26692c0ec';

                    $scope.powerplants = await fetchDataFactory.getAllNames();

                    $scope.updateProperty = function (element) {
                        $scope.selectedProperty = element.p;
                        $scope.$broadcast('propertyChanged');
                    };

                    $scope.changePlantOne = function(element){
                        $scope.selectedPlantOne = element.name;
                        console.log($scope.selectedPlantOne);
                        $scope.$broadcast('plant_changed_one');
                    };

                    $scope.changePlantTwo = function(element){
                        $scope.selectedPlantTwo = element.name;
                        console.log($scope.selectedPlantTwo);
                        $scope.$broadcast('plant_changed_two');
                    };
                }
            ]
        )

    }
)
();
