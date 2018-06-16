(function () {
    'use strict';

    angular.module('Geothermal.pages.1d8a69a5-b692-47b7-aacb-b7f26692c0ec', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('1d8a69a5-b692-47b7-aacb-b7f26692c0ec', {
                url: '/1d8a69a5-b692-47b7-aacb-b7f26692c0ec',
                templateUrl: 'app/pages/1d8a69a5-b692-47b7-aacb-b7f26692c0ec/1d8a69a5-b692-47b7-aacb-b7f26692c0ec.html',
                title: '1d8a69a5-b692-47b7-aacb-b7f26692c0ec',
                sidebarMeta: {
                    order: 800,
                },
            });
    }

})();