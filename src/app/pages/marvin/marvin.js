(function () {
    'use strict';

    angular.module('Geothermal.pages.marvin')
        .controller('MarvinCtrl',
            ['$scope', 'fetchDataFactory', 'baConfig', '$timeout', '$stateParams',
                async function MarvinCtrl($scope, fdf, baConfig, $timeout, $stateParams) {

                    // Read the selected plant out of the URL / stateParam
                    $scope.selectedPlant = $stateParams.plantId;
                    $scope.powerplants = await fdf.getAllNames();

                    // Called when a new plant is selected
                    $scope.changePlant = async function (element) {
                        $scope.selectedPlant = element.name;

                        // Broadcast change to child controllers
                        $scope.$broadcast('plant_changed');
                    };

                }
            ]
        )
})();