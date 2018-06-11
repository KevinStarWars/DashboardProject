(function () {
    'use strict';

    angular.module('Geothermal.pages.kevin')
        .factory('fetchDataFactory',function() {

            return {
                fetchData: async function(filename) {
                    return await fetch('../../../assets/geothermal-data/' + filename)
                        .then(response => response.json());
                },

                fetchTimeStepArray: async function(filename){
                    let data = await fetch('../../../assets/geothermal-data/' + filename)
                        .then(response => response.json());
                    let timeStepArray = [];
                    data.forEach(function (value) {
                        timeStepArray.push(value['time_step']);
                    });
                    return timeStepArray;
                },

                fetchEfficiencyArray: async function(filename){
                    let data = await fetch('../../../assets/geothermal-data/' + filename)
                        .then(response => response.json());
                    let efficiencyArray = [];
                    data.forEach(function (value) {
                        efficiencyArray.push(parseFloat(value['efficiency']));
                    });
                    return efficiencyArray;
                },

                fetchEfficiencyArrayInPercent: async function(filename){
                    let data = await fetch('../../../assets/geothermal-data/' + filename)
                        .then(response => response.json());
                    let efficiencyArray = [];
                    data.forEach(function (value) {
                        efficiencyArray.push(parseFloat(value['efficiency']) * 100);
                    });
                    return efficiencyArray;
                },

                fetchDownSampledData: async function(filename, n){
                    let data = await this.fetchData(filename);
                    let downSampledArray = [];
                    for (let i = 0; i < data.length; i = i + n){
                        downSampledArray.push(data[i]);
                    }
                    return downSampledArray;
                },

                fetchDownSampledTimeArray: async function(filename, n){
                    let timeSteps = await this.fetchTimeStepArray(filename);
                    let downSampledArray = [];
                    for (let i = 0; i < timeSteps.length; i = i + n){
                        downSampledArray.push(data[i]);
                    }
                    return downSampledArray;
                },

                fetchDownSampledEfficiencyArray: async function(filename, n){
                    let efficiencies = await this.fetchEfficiencyArray(filename);
                    let downSampledArray = [];
                    for (let i = 0; i < efficiencies.length; i = i + n){
                        downSampledArray.push(data[i]);
                    }
                    return downSampledArray;
                },

                fetchExtractionRatesArray: async function(filename){
                    let data = await fetch('../../../assets/geothermal-data/' + filename)
                        .then(response => response.json());
                    let extractionRates = [];
                    data.forEach(function (value) {
                        extractionRates.push(parseFloat(value['extraction_rate']));
                    });
                    return extractionRates;
                },

                fetchDownSampledExtractionRatesArray: async function(filename, n){
                    let data = await this.fetchExtractionRatesArray(filename);
                    let downSampledArray = [];
                    for (let i = 0; i < data.length; i = i + n){
                        downSampledArray.push(data[i]);
                    }
                    return downSampledArray;
                },

                fetchGeoData: async function(){
                    return await fetch('../../../assets/geothermal-data/general-data/geo-data.json')
                        .then(response => response.json());
                }
            }
        });
})();