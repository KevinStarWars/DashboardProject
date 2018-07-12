(function () {
    'use strict';

    angular.module('Geothermal.pages.khristina')
        .directive('lineChartOne', lineChartOne);

    /** @ngInject */
    function lineChartOne() {
        return {
            restrict: 'E',
            controller: 'LineChartOneCtrl',
            templateUrl: 'app/pages/khristina/lineChartOne/lineChartOne.html'
        };
    }
})();