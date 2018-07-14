(function () {
    'use strict';

    angular.module('Geothermal.pages.khristina')
        .directive('compareChart', compareChart);

    /** @ngInject */
    function compareChart() {
        return {
            restrict: 'E',
            controller: 'compareChartController',
            templateUrl: 'app/pages/khristina/CompareChart/compareChart.html'
        };
    }
})();