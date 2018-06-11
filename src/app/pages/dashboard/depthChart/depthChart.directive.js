(function () {
    'use strict';

    angular.module('Geothermal.pages.dashboard')
        .directive('depthChart', depthChart);

    /** @ngInject */
    function depthChart() {
        return {
            restrict: 'E',
            controller: 'DepthChartCtrl',
            templateUrl: 'app/pages/dashboard/depthChart/depthChart.html'
        };
    }
})();