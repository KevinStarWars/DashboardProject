(function () {
  'use strict';

  angular.module('Geothermal.pages.charts', [
      'Geothermal.pages.charts.amCharts',
      'Geothermal.pages.charts.chartJs',
      'Geothermal.pages.charts.chartist',
      'Geothermal.pages.charts.morris'
  ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('charts', {
          url: '/charts',
          abstract: true,
          template: '<div ui-view  autoscroll="true" autoscroll-body-top></div>',
          title: 'Charts',
          sidebarMeta: {
            icon: 'ion-stats-bars',
            order: 150,
          },
        });
  }

})();
