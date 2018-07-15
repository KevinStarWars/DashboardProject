let Property = {
    DEPTH:              "depth",
    EFFICIENCY:         "efficiency",
    ELECTRICAL_POWER:   "electrical_power",
    EXTRACTION_RATE:    "extraction_rate",
    GEOTHERMAL_POWER:   "geothermal_power",
    ID:                 "id",
    TEMPERATURE:        "temperature",
    TIME_STEP:          "time_step",
    NAME:               "name"
};

/**
 * 1000 ms * 60 sec * 60 min * 24 h * 365 d * 30 y
 * @type {number}
 */
let THIRTY_YEARS = 946080000000;
let TWELVE_HOURS = 12 * 60 * 60 * 1000;

(function () {
    'use strict';

    angular.module('Geothermal.pages.kevin')
        .factory('fetchDataFactory', ['commonFunctions', function(commonFunctions) {

            return {
                fetchData: async function(filename) {
                    return await fetch('../../../assets/geothermal-data/' + this.toJsonPath(filename))
                        .then(response => response.json());
                },

                fetchTimeStepArray: async function(filename){
                    let data = await this.fetchData(filename);
                    return this.getProperty(data, Property.TIME_STEP);
                },


                // Fetch the efficiency of each entry of a power plant.
                fetchEfficiencyArray: async function(filename) {
                    let data = await this.fetchData(filename);
                    return this.getProperty(data, Property.EFFICIENCY);
                },

                // Fetch a downsampled efficiency array.
                fetchDownSampledEfficiencyArray: async function(filename, n) {
                    let efficiencies = await this.fetchEfficiencyArray(filename);
                    return this.downsample(efficiencies, n);
                },

                // Fetch the efficiency of each entry as a percentage.
                fetchEfficiencyArrayInPercent: async function(filename) {
                    let data = await this.fetchEfficiencyArray(filename);
                    return data.map(function(x) { return x * 100; });
                },

                // Fetch a downsampled efficiency array in percentages.
                fetchDownSampledEfficiencyArrayInPercent: async function(filename, n) {
                    let efficiencies = await this.fetchEfficiencyArrayInPercent(filename);
                    return this.downsample(efficiencies, n);
                },


                // Fetch the electrical power of each entry of a power plant.
                fetchElectricalPowerArray: async function(filename) {
                    let data = await this.fetchData(filename);
                    return this.getProperty(data, Property.ELECTRICAL_POWER);
                },

                // Fetch a downsampled electrical power array.
                fetchDownSampledElectricalPowerArray: async function(filename, n) {
                    let data = await this.fetchElectricalPowerArray(filename);
                    return this.downsample(data, n);
                },


                // Fetch the extraction rate of each entry of a power plant.
                fetchExtractionRatesArray: async function(filename) {
                    let data = await this.fetchData(filename);
                    return this.getProperty(data, Property.EXTRACTION_RATE);
                },

                // Fetch a downsampled extraction rate array.
                fetchDownSampledExtractionRatesArray: async function(filename, n) {
                    let data = await this.fetchExtractionRatesArray(filename);
                    return this.downsample(data, n);
                },


                // Fetch the geothermal power of each entry of a power plant.
                fetchGeothermalPowerArray: async function(filename) {
                    let data = await this.fetchData(filename);
                    return this.getProperty(data, Property.GEOTHERMAL_POWER);
                },

                // Fetch a downsampled geothermal power array.
                fetchDownSampledGeothermalPowerArray: async function(filename, n) {
                    let data = await this.fetchGeothermalPowerArray(filename);
                    return this.downsample(data, n);
                },


                // Fetch the temperature of a power plant. This returns a single value
                // since the station's water temperature is constant.
                fetchTemperature: async function(filename) {
                    let data = await this.fetchData(filename);
                    return data[0][Property.TEMPERATURE];
                },


                // Fetch a downsampled timestamp array.
                fetchDownSampledTimeArray: async function(filename, n) {
                    let timeSteps = await this.fetchTimeStepArray(filename);
                    return this.downsample(timeSteps, n);
                },


                // Fetch the geographical location of all power plants.
                fetchGeoData: async function() {
                    return await fetch('../../../assets/geothermal-data/general-data/geo-data.json')
                        .then(response => response.json());
                },

                // Get the name of every power plant.
                getAllNames: async function() {
                    let geoData = await this.fetchGeoData();
                    return this.getProperty(geoData, Property.NAME);
                },

                getAllNamesWithColors: async function(){
                    let geoData = await this.fetchGeoData();
                    let  returnArray = [];
                    for (let i = 0; i < geoData.length; i++){
                        returnArray.push({
                            name: geoData[i]['name'],
                            color: commonFunctions.getLineChartColor(i)
                        })
                    }
                    return returnArray;
                },

                getNewNames: async function() {
                    return ["Altheim", "Traunreut", "Bad Urach", "Bruchsaal", "Sauerlach",
                        "Speyer", "Unterhaching", "Kirchstockach", "Taufkirchen", "Holzkirchen"];
                },

                getAverageYear: async function(filename, property, n) {
                    let data = await fetchDataFactory.getProperties(filename, Property.TIME_STEP, property, n);
                    let temp = [];
                    data.forEach(function (item) {
                        let year = new Date(Date.parse(item[Property.TIME_STEP])).getFullYear();
                        if (!temp.includes(year)){
                            temp.push(year);
                            temp[year] = [];
                        }
                        temp[year].push(item[property]);
                    });
                    return temp;
                },

                // Fetch an array of each power plant's name and it's respective depth.
                fetchNameDepthArray: async function () {
                    let nameDepthArray = [];
                    let nameArray = await this.getAllNames();
                    for (let i = 0; i < nameArray.length; i++) {
                        let tmpArray = [];
                        tmpArray.push(nameArray[i]);
                        tmpArray.push(await this.fetchDepth(nameArray[i]));
                        nameDepthArray.push(tmpArray);
                    }
                    return nameDepthArray;
                },

                // Get the JSON path of a power plant.
                toJsonPath: function(filename) {
                    return filename + ".json";
                },

                // Downsample a set of data, so that only each nth element is kept.
                downsample: async function (data, n) {
                    let downSampledArray = [];
                    for (let i = 0; i < data.length; i = i + n) {
                        downSampledArray.push(data[i]);
                    }
                    return downSampledArray;
                },

                // Filter a set of data, so that only a single property is kept.
                getProperty: async function (data, property) {
                    let array = [];
                    data.forEach(function (value) {
                        array.push(value[property]);
                    });
                    return array;
                },

                fetchDepth: async function(filename){
                    let data = await this.fetchData(filename);
                    return data[0]["depth"];
                },

                // Filter a set of data, so that only two properties are kept.
                // This method returns a two-dimensional array. The inner arrays
                // are pairs of the first and second property (the parameters).
                getProperties: async function (file, p1, p2, n) {
                    let data = await this.fetchData(file);
                    let array = [];

                    data.forEach(value => {
                        let temp = [];

                        if (p1 = Property.TIME_STEP) {
                            // Manipulate timestamp and convert to String
                            temp[p1] = this.formatDate(value[p1] * TWELVE_HOURS + THIRTY_YEARS);
                        } else {
                            temp[p1] = value[p1];
                        }
                        temp[p2] = value[p2];
                        array.push(temp);
                    });

                    if (n !== 'undefined') {
                        array = this.downsample(array, n);
                    }

                    return array;
                },

                getAllProperties: async function(names, p1, p2, n){
                    let array = [];
                    for (name of names){
                        array.push(await this.getProperties(name, p1, p2, n));
                    }
                    return array;
                },

                fetchDownSampledEfficiencyTimes: async function(names, downSampleRate){
                    let efficiencies = [];
                    for (let item of names) {
                        let time = await this.fetchDownSampledTimeArray(item, downSampleRate);
                        let value = await this.fetchDownSampledEfficiencyArray(item, downSampleRate);
                        if (time.length === value.length) {
                            let tmpArray = [];
                            for (let i = 0; i < time.length; i++) {
                                tmpArray.push({
                                    time: time[i],
                                    value: value[i]
                                })
                            }
                            efficiencies.push(tmpArray);
                        }
                    }
                    return efficiencies;
                },

                formatDate: function (date) {
                     let d = new Date(date),
                         month = '' + (d.getMonth() + 1),
                         day = '' + d.getDate(),
                         year = d.getFullYear();

                     if (month.length < 2) month = '0' + month;
                     if (day.length < 2) day = '0' + day;

                     return [year, month, day].join('-');
                 },

                /**
                 * puts all efficiencies into one array. is used in line chart
                 * @param n
                 * @returns {Promise<Array>}
                 */
                fetchTimeStepAllEfficiencies: async function (n) {
                    let names = await this.getAllNames();
                    let data = await this.getAllProperties(names,
                        Property.TIME_STEP,
                        Property.EFFICIENCY,
                        n);
                    let array = [];
                    let firstIteration = true;
                    for (let i = 0; i < data.length; i++){
                        if (firstIteration){
                            for (let j = 0; j < data[i].length; j++){
                                let dummy = {};
                                dummy[Property.TIME_STEP] = data[i][j][Property.TIME_STEP];
                                dummy[names[i]] = data[i][j][Property.EFFICIENCY];
                                array.push(dummy);
                            }
                            firstIteration = false;
                        } else {
                            for (let j = 0; j < data[i].length; j++){
                                array[j][Property.TIME_STEP] = data[i][j][Property.TIME_STEP];
                                array[j][names[i]] = data[i][j][Property.EFFICIENCY];
                            }
                        }
                    }
                    return array;
                },

                fetchTimeStepAllProperty: async function(n, property){
                    let names = await this.getAllNames();
                    let data = await this.getAllProperties(names,
                        Property.TIME_STEP,
                        property,
                        n);
                    let array = [];
                    let firstIteration = true;
                    for (let i = 0; i < data.length; i++){
                        if (firstIteration){
                            for (let j = 0; j < data[i].length; j++){
                                let dummy = {};
                                dummy[Property.TIME_STEP] = data[i][j][Property.TIME_STEP];
                                dummy[names[i]] = data[i][j][property];
                                array.push(dummy);
                            }
                            firstIteration = false;
                        } else {
                            for (let j = 0; j < data[i].length; j++){
                                array[j][Property.TIME_STEP] = data[i][j][Property.TIME_STEP];
                                array[j][names[i]] = data[i][j][property];
                            }
                        }
                    }
                    return array;
                },

                fetchNameDepthObject: async function () {
                    let nameArray = await this.getAllNames();
                    let object = {};
                    for(let i = 0; i  < nameArray.length; i++){
                        object[nameArray[i]] = await this.fetchDepth(nameArray[i]);
                    }
                    return object;
                },

                getAllCategories: async function(){
                    let data  = await this.fetchData('1d8a69a5-b692-47b7-aacb-b7f26692c0ec');
                    return Object.keys(data[0]);
                },

                getLastValues: async function(){
                    let names = await this.getAllNames();
                    let data = [];
                    for (let i = 0; i < names.length; i++){
                        data.push(await this.fetchData(names[i]));
                    }
                    let lastDataSet = [];
                    data.forEach(function (item) {
                        lastDataSet.push(item[item.length-1])
                    });
                    return lastDataSet;
                },

                getFirstAndLastValues: async function(){
                    let names = await this.getAllNames();
                    let data = [];
                    for (let i = 0; i < names.length; i++){
                        data.push(await this.fetchData(names[i]));
                    }
                    let dataSet = [];
                    data.forEach(function (item) {
                        dataSet.push({
                            first: item[0],
                            last: item[item.length-1]})
                    });
                    return dataSet;
                },

                getUnit: function(property){
                    if (property === Property.ELECTRICAL_POWER){
                        return "kWh";
                    } else if (property === Property.EFFICIENCY) {
                        return "";
                    } else if (property === Property.EXTRACTION_RATE){
                        return "m³/h"
                    } else if (property === Property.GEOTHERMAL_POWER){
                        return "kWh";
                    }
                }
            }
        }]);
})();