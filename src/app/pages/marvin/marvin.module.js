(function () {
    'use strict';

    angular.module('Geothermal.pages.marvin', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('marvin', {
                url: '/detailView/:plantId',
                params: {plantId: '1d8a69a5-b692-47b7-aacb-b7f26692c0ec'},
                templateUrl: 'app/pages/marvin/marvin.html',
                title: 'Detailed View',
                sidebarMeta: {
                    order: 800,
                },
            });
    }

})();