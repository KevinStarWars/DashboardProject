(function () {
  "use strict";

  angular.module("Geothermal.pages", [
    "ui.router",

    "Geothermal.pages.dashboard",
      "Geothermal.pages.marvin",
      "Geothermal.pages.khristina",
  ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($urlRouterProvider, baSidebarServiceProvider) {
    $urlRouterProvider.otherwise("/dashboard");

  }

})();
