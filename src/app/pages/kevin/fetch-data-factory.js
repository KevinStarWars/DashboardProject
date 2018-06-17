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

(function () {
    'use strict';

    angular.module('Geothermal.pages.kevin')
        .factory('fetchDataFactory', function() {

            return {

                // Fetch the data of a geothermal power plant. Returns an array
                // of JSON objects. (See 'assets' folder for the exact structure)
                fetchData: async function(filename) {
                    return await fetch('../../../assets/geothermal-data/' + this.toJsonPath(filename))
                        .then(response => response.json());
                },

                // Fetch each nth entry of the data.
                fetchDownSampledData: async function(filename, n) {
                    let data = await this.fetchData(filename);
                    return this.downsample(data, n);
                },

                // Fetch the data for every power plant.
                fetchAllData: async function() {
                    let names = await this.getAllNames();
                    let dataArray = [];
                    names.forEach(async function (value) {
                        let filePath = value + ".json";
                        let data = await fetch('../../../assets/geothermal-data/' + filePath)
                            .then(response => response.json());
                        dataArray.push(data);
                    });
                    return dataArray;
                },


                // Fetch the depth of a power plant. This returns a single value
                // since the station's depth is constant.
                fetchDepth: async function(filename) {
                    let data = await this.fetchData(filename);
                    return data[0][Property.DEPTH];
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


                // Fetch the timestamps of each entry of a power plant.
                fetchTimeStepArray: async function(filename) {
                    let data = await this.fetchData(filename);
                    return this.getProperty(data, Property.TIME_STEP);
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

                // Filter a set of data, so that only two properties are kept.
                // This method returns a two-dimensional array. The inner arrays
                // are pairs of the first and second property (the parameters).
                getProperties: async function (file, p1, p2, n) {
                    let data = await this.fetchData(file);
                    let array = [];

                    data.forEach(function (value) {
                        let temp = [];

                        if (p1 = Property.TIME_STEP) {
                            // Format the timestamp into a string
                            temp[p1] = new Date(value[p1] * 10000000).toDateString();
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
                }
            }
        });
})();