(function () {
  "use strict";

  angular.module("Geothermal.pages", [
    "ui.router",

    "Geothermal.pages.dashboard",
      "Geothermal.pages.khristina",
      "Geothermal.pages.marvin",
  ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($urlRouterProvider, baSidebarServiceProvider) {
    $urlRouterProvider.otherwise("/dashboard");

  }

})();
