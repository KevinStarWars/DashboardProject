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
                        efficiencyArray.push(parseFloat(value['efficiency']) * 100);
                    });
                    return efficiencyArray;
                },

                fetchDownSampledData: async function(filename, n){
                    return await fetch('../../../assets/geothermal-data/' + filename)
                        .then(response => response.json());
                }
            }
        });
})();