(function () {
    'use strict';

    angular.module('Geothermal.pages.maps')
        .controller('MapCtrl', MapCtrl);

    /** @ngInject */
    function MapCtrl($timeout) {
        function initialize() {
            var mapCanvas = document.getElementById('google-maps');
            var mapOptions = {
                center: new google.maps.LatLng(51.312801, 9.481544),
                zoom: 7,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(mapCanvas, mapOptions);
        }

        $timeout(function(){
            initialize();
        }, 100);
    }

})();