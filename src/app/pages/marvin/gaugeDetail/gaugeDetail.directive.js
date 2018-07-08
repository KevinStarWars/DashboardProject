(function () {
    'use strict';

    angular.module('Geothermal.pages.marvin')
        .directive('gaugeDetail', gaugeDetail);

    /** @ngInject */
    function gaugeDetail() {
        return {
            restrict: 'E',
            controller: 'GaugeDetailCtrl',
            templateUrl: 'app/pages/marvin/gaugeDetail/gaugeDetail.html'
        };
    }
})();