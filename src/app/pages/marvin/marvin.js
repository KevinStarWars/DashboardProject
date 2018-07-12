(function () {
    'use strict';

    angular.module('Geothermal.pages.marvin')
        .controller('MarvinCtrl',
            ['$scope', 'fetchDataFactory', 'baConfig', '$timeout',
                async function MarvinCtrl($scope, fdf, baConfig, $timeout) {

                    $scope.changePlant = async function (element) {
                        $scope.selectedPlant = element.name;
                        document.getElementById("selected").nodeValue = element.name;

                        // Broadcast change to child controllers
                        $scope.$broadcast('plant_changed');
                    };

                    $scope.powerplants = await fdf.getAllNames();
                    console.log("powerplants " + $scope.powerplants);
                    $scope.selectedPlant = $scope.powerplants[0];
                    console.log("selected main " + $scope.selectedPlant);

                }
            ]
        )
})();