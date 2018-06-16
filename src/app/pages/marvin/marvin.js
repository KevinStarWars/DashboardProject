(function () {
    'use strict';

    angular.module('Geothermal.pages.marvin')
        .controller('MarvinCtrl',
            ['$scope', 'fetchDataFactory',
                async function MarvinCtrl($scope, fetchDataFactory) {
                    let data = await fetchDataFactory.fetchData('1d8a69a5-b692-47b7-aacb-b7f26692c0ec');
                    console.log(data);
                }])})();