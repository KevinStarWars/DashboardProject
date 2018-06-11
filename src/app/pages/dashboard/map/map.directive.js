(function () {
    'use strict';

    angular.module('Geothermal.pages.dashboard')
        .directive('googleMap', googleMap);

    /** @ngInject */
    function googleMap() {
        return {
            restrict: 'E',
            controller: 'MapCtrl',
            templateUrl: 'app/pages/dashboard/map/map.html'
        };
    }
})();