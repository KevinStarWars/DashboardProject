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

                getDepthColor: function(){
                    return "#7a5230";
                },

                getLineChartColor: function(i){
                    let colorArray = [
                        "#8c510a",
                        "#01665e",
                        "#c51b7d",
                        "#000000",
                        "#762a83",
                        "#1b7837",
                        "#b35806",
                        "#4d4d4d",
                        "#fdbf6f",
                        "#cab2d6"
                    ];
                    return colorArray[i];
                },

                /**
                 * Colors By Color Brewer
                 * @returns {string}
                 */
                getEfficiencyColor: function(){
                    return "#b35806";
                },

                getExtractionRateColor: function(){
                    return "#542788";
                },

                getElectricalPowerColor: function(){
                    return "#f1a340";
                },

                getGeothermalPowerColor: function(){
                    return "#998ec3";
                },

                getWarningColor: function () {
                    return baConfig.colors.danger;
                },

                getTextColor: function () {
                    return baConfig.colors.defaultText;
                },

                getBorderColor: function () {
                    return baConfig.colors.border;
                },
                
                createGlyph: async function (data) {
                    let glyphLength = await this.calculateGlyphPathLength(data);
                    let glyphs = [];
                    glyphLength.forEach(glyph => {
                        let object = {};
                       object[Property.ID] = glyph[Property.ID];
                        /**
                         * svg creation
                         * colors by color brewer
                         * stroke width after trial and error
                         * @type {string}
                         */
                       object['HtmlString'] = 'data:image/svg+xml;utf-8, \
                        <svg width="96" height="96" xmlns="http://www.w3.org/2000/svg"> \
                        <path fill="red" stroke="' + this.getElectricalPowerColor() +'" stroke-width="4" d="M48 48 H' + glyph[Property.ELECTRICAL_POWER] +'"></path> \
                        <path fill="red" stroke="' + this.getGeothermalPowerColor() +'" stroke-width="4" d="M48 48 H' + glyph[Property.GEOTHERMAL_POWER] +'"></path> \
                        <path fill="red" stroke="' + this.getEfficiencyColor() + '" stroke-width="4" d="M48 48 V' + glyph[Property.EFFICIENCY] +'"></path> \
                        <path fill="red" stroke="' + this.getExtractionRateColor() + '" stroke-width="4" d="M48 48 V' + glyph[Property.EXTRACTION_RATE] + '" ></path> \
                        </svg>';
                       glyphs.push(object);
                    });
                    return glyphs
                },

                calculateGlyphPathLength: function (data) {
                    let minimaAndMaxima = this.findMaximaAndMaxima(data);
                    return this.calculateGlyphLength(data, minimaAndMaxima);
                },

                findMaximaAndMaxima: function (data) {
                    let returnObject = {
                        min_electrical_power: 0,
                        max_electrical_power: 0,
                        min_extraction_rate: 0,
                        max_extraction_rate: 0,
                        min_geothermal_power: 0,
                        max_geothermal_power: 0,
                        min_efficiency: 0,
                        max_efficiency: 0
                    };
                    let firstIteration = true;
                    data.forEach(function (item) {
                        if (firstIteration){
                            returnObject['min_electrical_power'] = parseFloat(item[Property.ELECTRICAL_POWER]);
                            returnObject['min_extraction_rate'] = parseFloat(item[Property.EXTRACTION_RATE]);
                            returnObject['min_geothermal_power'] = parseFloat(item[Property.GEOTHERMAL_POWER]);
                            returnObject['min_efficiency'] = parseFloat(item[Property.EFFICIENCY]);
                        } else {
                            if (parseFloat(item[Property.ELECTRICAL_POWER]) < returnObject['min_electrical_power']){
                                returnObject['min_electrical_power'] = parseFloat(item[Property.ELECTRICAL_POWER]);
                            }
                            if (parseFloat(item[Property.EXTRACTION_RATE]) < returnObject['min_extraction_rate']){
                                returnObject['min_extraction_rate'] = parseFloat(item[Property.EXTRACTION_RATE]);
                            }
                            if (parseFloat(item[Property.GEOTHERMAL_POWER]) < returnObject['min_geothermal_power']){
                                returnObject['min_geothermal_power'] = parseFloat(item[Property.GEOTHERMAL_POWER]);
                            }
                            if (parseFloat(item[Property.EFFICIENCY]) < returnObject['min_efficiency']){
                                returnObject['min_efficiency'] = parseFloat(item[Property.EFFICIENCY]);
                            }
                        }
                        if (parseFloat(item[Property.ELECTRICAL_POWER]) > returnObject['max_electrical_power']){
                            returnObject['max_electrical_power'] = parseFloat(item[Property.ELECTRICAL_POWER]);
                        }
                        if (parseFloat(item[Property.EXTRACTION_RATE]) > returnObject['max_extraction_rate']){
                            returnObject['max_extraction_rate'] = parseFloat(item[Property.EXTRACTION_RATE]);
                        }
                        if (parseFloat(item[Property.GEOTHERMAL_POWER]) > returnObject['max_geothermal_power']){
                            returnObject['max_geothermal_power'] = parseFloat(item[Property.GEOTHERMAL_POWER]);
                        }
                        if (parseFloat(item[Property.EFFICIENCY]) > returnObject['max_efficiency']){
                            returnObject['max_efficiency'] = parseFloat(item[Property.EFFICIENCY]);
                        }
                        firstIteration = false;
                    });
                    return returnObject;
                },

                calculateGlyphLength: function (data, minimaAndMaxima) {
                    let returnArray = [];
                    data.forEach(function (item) {
                        let returnObject = {};
                        returnObject[Property.ID] = item[Property.ID];
                        /**
                         * max of electrical power is 0
                         * min of electrical power is 46
                         * 46 - 0 = 46
                         * inverse percentage is taken in order to perform this
                         * rounded to two digits
                         * @type {number}
                         */
                        returnObject[Property.ELECTRICAL_POWER] = Math.round((((1 - parseFloat(item[Property.ELECTRICAL_POWER]) / minimaAndMaxima["max_electrical_power"]) * 46) ) * 100) / 100;
                        /**
                         * max of extraction rate is 0
                         * min of extraction rate is 46
                         * 46 - 0 = 46
                         * inverse percentage is taken in order to perform this
                         * rounded to two digits
                         * @type {number}
                         */
                        returnObject[Property.EXTRACTION_RATE] = Math.round((((1 - parseFloat(item[Property.EXTRACTION_RATE]) / minimaAndMaxima["max_extraction_rate"]) * 46))* 100) / 100;
                        /**
                         * max of geothermal power is 96
                         * min of geothermal power is 50
                         * 96 - 50 = 46
                         * percentage is taken in order to perform this
                         * rounded to two digits
                         * @type {number}
                         */
                        returnObject[Property.GEOTHERMAL_POWER] = Math.round((((parseFloat(item[Property.GEOTHERMAL_POWER]) / minimaAndMaxima["max_geothermal_power"]) * 46) + 50 )* 100) / 100;
                        /**
                         * max of efficiency is 96
                         * min of efficiency is 50
                         * 96 - 50 = 46
                         * percentage is taken in order to perform this
                         * rounded to two digits
                         */
                        returnObject[Property.EFFICIENCY] = Math.round((((parseFloat(item[Property.EFFICIENCY]) / minimaAndMaxima["max_efficiency"]) * 46) + 50 ) * 100) / 100;
                        returnArray.push(returnObject);
                    });
                    return returnArray;
                }
            }
        }]);
})();