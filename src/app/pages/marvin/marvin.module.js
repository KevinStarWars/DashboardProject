(function () {
    'use strict';

    angular.module('BlurAdmin.pages.marvin', [])
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