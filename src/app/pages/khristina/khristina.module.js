(function () {
    'use strict';

    angular.module('BlurAdmin.pages.khristina', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('khristina', {
                url: '/khristina',
                templateUrl: 'app/pages/khristina/khristina.html',
                title: 'Khristina',
                sidebarMeta: {
                    order: 800,
                },
            });
    }

})();