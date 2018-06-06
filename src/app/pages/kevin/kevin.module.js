(function () {
    'use strict';

    angular.module('Geothermal.pages.kevin', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('kevin', {
                url: '/kevin',
                templateUrl: 'app/pages/kevin/kevin.html',
                title: 'Kevin',
                sidebarMeta: {
                    order: 800,
                },
            });
    }

})();