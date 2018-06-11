(function () {
    'use strict';

    angular.module('Geothermal.pages.1d8a69a5-b692-47b7-aacb-b7f26692c0ec')
        .controller('GeothermalOneCtrl',
            ['$scope', 'fetchDataFactory',
                async function GeothermalOneCtrl($scope, fetchDataFactory) {
                    let data = await fetchDataFactory.fetchData('1d8a69a5-b692-47b7-aacb-b7f26692c0ec.json');
                }])})();