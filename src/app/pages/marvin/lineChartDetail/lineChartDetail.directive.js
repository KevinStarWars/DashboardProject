(function () {
    'use strict';

    angular.module('Geothermal.pages.marvin')
        .directive('lineChartDetail', lineChartDetail);

    /** @ngInject */
    function lineChartDetail() {
        return {
            restrict: 'E',
            controller: 'LineChartDetailCtrl',
            templateUrl: 'app/pages/marvin/lineChartDetail/lineChartDetail.html'
        };
    }
})();