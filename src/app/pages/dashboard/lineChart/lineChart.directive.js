(function () {
    'use strict';

    angular.module('Geothermal.pages.dashboard')
        .directive('lineChart', lineChart);

    /** @ngInject */
    function lineChart() {
        return {
            restrict: 'E',
            controller: 'DshbrdLineChartCtrl',
            templateUrl: 'app/pages/dashboard/lineChart/lineChart.html'
        };
    }
})();