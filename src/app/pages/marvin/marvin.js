(function () {
    'use strict';

    angular.module('Geothermal.pages.marvin')
        .controller('MarvinCtrl',
            ['$scope', 'fetchDataFactory', 'baConfig', '$timeout',

                async function MarvinCtrl($scope, fetchDataFactory, baConfig, $timeout) {

                    let file = '1d8a69a5-b692-47b7-aacb-b7f26692c0ec';
                    let data = await fetchDataFactory.fetchData(file);
                    console.log(fetchDataFactory.fetchNameDepthArray(file));

                    $scope.simpleLineOptions = {
                        color: baConfig.colors.defaultText,
                        fullWidth: true,
                        height: "300px",
                        chartPadding: {
                            right: 40
                        }
                    };

                    $scope.simpleLineData = {
                        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
                        series: [
                            [34, 20, 13, 45, 50],
                            [10, 45, 30, 14, 12],
                            [34, 12, 12, 40, 50],
                            [10, 43, 25, 22, 16],
                            [3, 6, 10, 33, 43]
                        ]
                    };

                }])
})();