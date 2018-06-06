(function () {
    'use strict';

    angular.module('Geothermal.pages.marvin', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('marvin', {
                url: '/marvin',
                templateUrl: 'app/pages/marvin/marvin.html',
                title: 'Marvin',
                sidebarMeta: {
                    order: 800,
                },
            });
    }

})();