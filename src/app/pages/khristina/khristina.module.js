(function () {
    'use strict';

    angular.module('Geothermal.pages.khristina', ['Geothermal.pages.kevin', 'Geothermal.pages.dashboard'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('khristina', {
                url: '/khristina',
                templateUrl: 'app/pages/khristina/khristina.html',
                title: 'Geothermie Analyzer',
                sidebarMeta: {
                    order: 800,
                },
            });
    }

})();