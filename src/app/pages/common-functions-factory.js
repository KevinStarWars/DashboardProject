(function () {
    'use strict';

    angular.module('Geothermal.pages')
        .factory('commonFunctions',['baConfig',
            function(baConfig) {

            return{
                getRandomColor: function () {
                    let layoutColors = baConfig.colors;
                    let colorArray = [
                        layoutColors.dashboard.blueStone,
                        layoutColors.dashboard.gossip,
                        layoutColors.dashboard.silverTree,
                        layoutColors.dashboard.surfieGreen,
                        layoutColors.dashboard.white
                    ];
                    return colorArray[Math.floor(Math.random()*colorArray.length)];
                },

                getWarningColor: function () {
                    return baConfig.colors.danger;
                },

                getTextColor: function () {
                    return baConfig.colors.defaultText;
                },

                getBorderColor: function () {
                    return baConfig.colors.border;
                }
            }
        }]);
})();