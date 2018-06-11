(function () {
    'use strict';

    angular.module('Geothermal.pages.kevin')
        .factory('fetchDataFactory',function() {

            return {
                fetchData: async function(filename) {
                    return await fetch('../../../assets/geothermal-data/' + this.toJsonPath(filename))
                        .then(response => response.json());
                },

                fetchTimeStepArray: async function(filename){
                    let data = await this.fetchData(filename);
                    let timeStepArray = [];
                    data.forEach(function (value) {
                        timeStepArray.push(value['time_step']);
                    });
                    return timeStepArray;
                },

                fetchEfficiencyArray: async function(filename){
                    let data = await this.fetchData(filename);
                    let efficiencyArray = [];
                    data.forEach(function (value) {
                        efficiencyArray.push(parseFloat(value['efficiency']));
                    });
                    return efficiencyArray;
                },

                fetchEfficiencyArrayInPercent: async function(filename){
                    let data = await this.fetchData(filename);
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
                    let data = await this.fetchData(filename);
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

                fetchElectricalPowerArray: async function(filename){
                    let data = await this.fetchData(filename);
                    let electricalPowerArray = [];
                    data.forEach(function (value) {
                        electricalPowerArray.push(parseFloat(value['electrical_power']));
                    });
                    return electricalPowerArray;
                },

                fetchDownSampledElectricalPowerArray: async function(filename, n){
                    let data = await this.fetchElectricalPowerArray(filename);
                    let downSampledArray = [];
                    for (let i = 0; i < data.length; i = i + n){
                        downSampledArray.push(data[i]);
                    }
                    return downSampledArray;
                },

                fetchDepth: async function(filename){
                    let data = await this.fetchData(filename);
                    return data[0]['depth'];
                },

                fetchTemperature: async function(filename){
                    let data = await this.fetchData(filename);
                    return data[0]['temperature'];
                },

                fetchGeothermalPowerArray: async function(filename){
                    let data = await this.fetchData(filename);
                    let geothermalPowerArray = [];
                    data.forEach(function (value) {
                        geothermalPowerArray.push(parseFloat(value['geothermal_power']));
                    });
                    return geothermalPowerArray;
                },

                fetchDownSampledGeothermalPowerArray: async function(filename, n){
                    let data = await this.fetchGeothermalPowerArray(filename);
                    let downSampledArray = [];
                    for (let i = 0; i < data.length; i = i + n){
                        downSampledArray.push(data[i]);
                    }
                    return downSampledArray;
                },

                fetchGeoData: async function(){
                    return await fetch('../../../assets/geothermal-data/general-data/geo-data.json')
                        .then(response => response.json());
                },

                getAllNames: async function(){
                    let geoData = await this.fetchGeoData();
                    let nameArray = [];
                    geoData.forEach(function (value) {
                        nameArray.push(value['name']);
                    });
                    return nameArray;
                },

                fetchAllData: async function(){
                    let names = await this.getAllNames();
                    console.log(names);
                    let dataArray = [];
                    names.forEach(async function (value) {
                        let filePath = value + ".json";
                        let data = await fetch('../../../assets/geothermal-data/' + filePath)
                            .then(response => response.json());
                        dataArray.push(data);
                    });
                    return dataArray;
                },

                toJsonPath: function(filename){
                    return filename + ".json";
                }
            }
        });
})();