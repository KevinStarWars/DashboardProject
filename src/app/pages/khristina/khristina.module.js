(function () {
    'use strict';

    angular.module('Geothermal.pages.khristina', ['Geothermal.pages.kevin'])
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
            })
            .state('khristina.id', {
                url: '/khristina/{plantId}',
                templateUrl: 'app/pages/khristina/khristina.html',
                controller: function ($stateParams) {
                    console.log($stateParams);
                    $scope.selectedPlant = $stateParams.plantId;
                }
            });
    }

})();