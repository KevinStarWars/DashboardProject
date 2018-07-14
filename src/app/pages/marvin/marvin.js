(function () {
    'use strict';

    angular.module('Geothermal.pages.marvin')
        .controller('MarvinCtrl',
            ['$scope', 'fetchDataFactory', 'baConfig', '$timeout', '$stateParams',
                async function MarvinCtrl($scope, fdf, baConfig, $timeout, $stateParams) {

                    $scope.selectedPlant = $stateParams.plantId;

                    $scope.changePlant = async function (element) {
                        $scope.selectedPlant = element.name;

                        // Broadcast change to child controllers
                        $scope.$broadcast('plant_changed');
                    };

                    $scope.powerplants = await fdf.getAllNames();
                }
            ]
        )
})();