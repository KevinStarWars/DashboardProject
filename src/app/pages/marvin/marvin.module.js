(function () {
    'use strict';

    angular.module('Geothermal.pages.marvin', ['Geothermal.pages.kevin'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('marvin', {
                url: '/detailView',
                templateUrl: 'app/pages/marvin/marvin.html',
                title: 'Detailed View',
                sidebarMeta: {
                    order: 800,
                },
            })
            .state('marvin.id', {
                url: '/detailView/{plantId}',
                templateUrl: 'app/pages/marvin/marvin.html',
                controller: function ($stateParams) {
                    console.log($stateParams);
                    $scope.selectedPlant = $stateParams.plantId;
                }
            });
    }

})();