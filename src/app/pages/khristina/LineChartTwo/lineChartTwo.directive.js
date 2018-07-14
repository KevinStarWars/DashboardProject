(function () {
    'use strict';

    angular.module('Geothermal.pages.khristina')
        .directive('lineChartTwo', lineChartTwo);

    /** @ngInject */
    function lineChartTwo() {
        return {
            restrict: 'E',
            controller: 'LineChartTwoCtrl',
            templateUrl: 'app/pages/khristina/LineChartTwo/lineChartTwo.html'
        };
    }
})();