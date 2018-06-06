/**
 * @author k.danovsky
 * created on 12.01.2016
 */
(function () {
  'use strict';

  angular.module('Geothermal.pages.ui', [
    'Geothermal.pages.ui.typography',
    'Geothermal.pages.ui.buttons',
    'Geothermal.pages.ui.icons',
    'Geothermal.pages.ui.modals',
    'Geothermal.pages.ui.grid',
    'Geothermal.pages.ui.alerts',
    'Geothermal.pages.ui.progressBars',
    'Geothermal.pages.ui.notifications',
    'Geothermal.pages.ui.tabs',
    'Geothermal.pages.ui.slider',
    'Geothermal.pages.ui.panels',
  ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('ui', {
          url: '/ui',
          template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
          abstract: true,
          title: 'UI Features',
          sidebarMeta: {
            icon: 'ion-android-laptop',
            order: 200,
          },
        });
  }

})();
