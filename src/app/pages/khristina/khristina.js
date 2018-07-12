(function () {
    'use strict';

    angular.module('Geothermal.pages.khristina')
        .controller('KhristinaCtrl',
            ['$scope', 'fetchDataFactory', 'baConfig', '$timeout','$interval', 'stopableInterval','$window',
                async function KhristinaCtrl($scope, fetchDataFactory, $timeout, baConfig, $interval, stopableInterval, $window, fdf) {

                    var chartData = generateChartData();

                    var chart = AmCharts.makeChart("chartdiv", {
                        "type": "serial",
                        "theme": "light",
                        "legend": {
                            "useGraphSettings": true
                        },
                        "dataProvider": chartData,
                        "synchronizeGrid":true,
                        "valueAxes": [{
                            "id":"v1",
                            "axisColor": "#FF6600",
                            "axisThickness": 2,
                            "axisAlpha": 1,
                            "position": "left"
                        }, {
                            "id":"v2",
                            "axisColor": "#FCD202",
                            "axisThickness": 2,
                            "axisAlpha": 1,
                            "position": "right"
                        }, {
                            "id":"v3",
                            "axisColor": "#B0DE09",
                            "axisThickness": 2,
                            "gridAlpha": 0,
                            "offset": 50,
                            "axisAlpha": 1,
                            "position": "left"
                        }],
                        "graphs": [{
                            "valueAxis": "v1",
                            "lineColor": "#FF6600",
                            "bullet": "round",
                            "bulletBorderThickness": 1,
                            "hideBulletsCount": 30,
                            "title": "red line",
                            "valueField": "visits",
                            "fillAlphas": 0
                        }, {
                            "valueAxis": "v2",
                            "lineColor": "#FCD202",
                            "bullet": "square",
                            "bulletBorderThickness": 1,
                            "hideBulletsCount": 30,
                            "title": "yellow line",
                            "valueField": "hits",
                            "fillAlphas": 0
                        }],
                        "chartScrollbar": {
                            "oppositeAxis":false
                        },
                        "chartCursor": {
                            "cursorPosition": "mouse"
                        },
                        "categoryField": "date",
                        "categoryAxis": {
                            "parseDates": true,
                            "axisColor": "#DADADA",
                            "minorGridEnabled": true
                        },
                        "export": {
                            "enabled": true,
                            "position": "bottom-right"
                        }
                    });

                    chart.addListener("dataUpdated", zoomChart);
                    zoomChart();


// generate some random data, quite different range
                    function generateChartData() {
                        var chartData = [];
                        var firstDate = new Date();
                        firstDate.setDate(firstDate.getDate() - 100);

                        var visits = 1600;
                        var hits = 2900;
                        var views = 8700;


                        for (var i = 0; i < 100; i++) {
                            // we create date objects here. In your data, you can have date strings
                            // and then set format of your dates using chart.dataDateFormat property,
                            // however when possible, use date objects, as this will speed up chart rendering.
                            var newDate = new Date(firstDate);
                            newDate.setDate(newDate.getDate() + i);

                            visits += Math.round((Math.random()<0.5?1:-1)*Math.random()*10);
                            hits += Math.round((Math.random()<0.5?1:-1)*Math.random()*10);
                            views += Math.round((Math.random()<0.5?1:-1)*Math.random()*10);

                            chartData.push({
                                date: newDate,
                                visits: visits,
                                hits: hits,
                                views: views
                            });
                            console.log(chartData)
                        }
                        return chartData;
                    }

                    function zoomChart(){
                        chart.zoomToIndexes(chart.dataProvider.length - 20, chart.dataProvider.length - 1);
                    }
                }
            ]
        )

    }
)
();

                   // let data_test = await fetchDataFactory.getNewNames();
                   // console.log(data_test)
/*
                    $scope.names = await fetchDataFactory.getAllNames();

                    let anlage_one_efficiency= await fetchDataFactory.fetchEfficiencyArray('1d8a69a5-b692-47b7-aacb-b7f26692c0ec', 0);
                    let anlage_two_efficiency = await fetchDataFactory.fetchEfficiencyArray('6b423e19-9f02-4374-8391-5075a57ecfdc',0);

                    let anlage_two_power = await fetchDataFactory.fetchElectricalPowerArray('6b423e19-9f02-4374-8391-5075a57ecfdc');


                    let anlage_one_geopower = await fetchDataFactory.fetchGeothermalPowerArray('1d8a69a5-b692-47b7-aacb-b7f26692c0ec');
                    let anlage_two_geopower = await fetchDataFactory.fetchGeothermalPowerArray('6b423e19-9f02-4374-8391-5075a57ecfdc');

*/

                    // List of values for the drop-down menu

                    /*
                    $scope.values = Property;

                    // Default values for the drop-down menu
                    $scope.prop1 = Property.TIME_STEP;
                    $scope.prop2 = Property.ELECTRICAL_POWER;

                    let file = '1d8a69a5-b692-47b7-aacb-b7f26692c0ec';
                    let data = await fetchDataFactory.getProperties(file, $scope.prop1, $scope.prop2, 24);

                    let names = ['linediv', 'Chart'];
                    let charts = [];
                    names.forEach(function (name) {
                        charts.push(makeLineChart($scope.prop1, $scope.prop2, data, name));
                    });

                    $scope.updateChart = async function () {
                        let data = await fetchDataFactory.getProperties(file, $scope.prop1, $scope.prop2, 24);
                        console.log(data);
                        line = makeLineChart($scope.prop1, $scope.prop2, data);
                    };


                    charts.forEach(function (chart) {
                        chart.addListener("rendered", zoomChart(chart));
                    });


                    // Make a line chart. Value and category are the properties to be plotted
                    function makeLineChart(category, value, data, name) {
                        console.log("makeLineChart: " + category + " | " + value + " (" + data.length + ")");
                        return AmCharts.makeChart(name, {
                            "type": "serial",
                            "theme": "light",
                            "marginRight": 40,
                            "marginLeft": 40,
                            "autoMarginOffset": 20,
                            "mouseWheelZoomEnabled":true,
                            "hdataDateFormat": "YYYY-MM-DD",
                            "valueAxes": [{
                                "id": "v1",
                                "axisAlpha": 0,
                                "position": "left",
                                "ignoreAxisWidth":true
                            }],
                            "balloon": {
                                "borderThickness": 1,
                                "shadowAlpha": 0
                            },
                            "graphs": [{
                                "id": name,
                                "balloon":{
                                    "drop":true,
                                    "adjustBorderColor":false,
                                    "color":"#ffffff"
                                },
                                "bullet": "round",
                                "bulletBorderAlpha": 1,
                                "bulletColor": "#FFFFFF",
                                "bulletSize": 5,
                                "hideBulletsCount": 50,
                                "lineThickness": 2,
                                "title": "red line",
                                "useLineColorForBulletBorder": true,
                                "valueField": value,
                                "balloonText": "<span style='font-size:18px;'>[[value]]</span>"
                            }],
                            "chartScrollbar": {
                                "graph": "g1",
                                "oppositeAxis":false,
                                "offset":30,
                                "scrollbarHeight": 80,
                                "backgroundAlpha": 0,
                                "selectedBackgroundAlpha": 0.1,
                                "selectedBackgroundColor": "#888888",
                                "graphFillAlpha": 0,
                                "graphLineAlpha": 0.5,
                                "selectedGraphFillAlpha": 0,
                                "selectedGraphLineAlpha": 1,
                                "autoGridCount":true,
                                "color":"#AAAAAA"
                            },
                            "chartCursor": {
                                "pan": true,
                                "valueLineEnabled": true,
                                "valueLineBalloonEnabled": true,
                                "cursorAlpha":1,
                                "cursorColor":"#258cbb",
                                "limitToGraph":"g1",
                                "valueLineAlpha":0.2,
                                "valueZoomable":true
                            },
                            "valueScrollbar":{
                                "oppositeAxis":false,
                                "offset":50,
                                "scrollbarHeight":10
                            },
                            "categoryField": category,
                            "categoryAxis": {
                                "parseDates": true,
                                "dashLength": 1,
                                "minorGridEnabled": true
                            },
                            "export": {
                                "enabled": true
                            },
                            "dataProvider": data,
                        });
                    }

                    function zoomChart(chart) {
                        chart.zoomToIndexes(chart.dataProvider.length - 40, chart.dataProvider.length - 1);
                    }
                    */


                    /*

                    let length_array = anlage_one_efficiency.length - 8830;
                    var avg_month = 0;
                    let average_month = [];
                    var k = 0;
                    for (let i = 0; i < length_array; i++) {
                        if (k < 90) {
                            k++;
                            avg_month+= anlage_one_efficiency[i];
                        } else {
                            k = 0;
                            avg_month = avg_month / 90;
                            average_month.push(avg_month);
                            avg_month = 0;
                        }
                    }
                    console.log(average_month);

                    let length_array_2 = anlage_one_power.length - 8540;
                    var avg_effiz = 0;
                    let avg_eff = [];
                    var k = 0;
                    for (let i = 0; i < length_array_2; i++) {
                        if (k < 365) {
                            k++;
                            avg_effiz+= anlage_one_power[i];
                        } else {
                            k = 0;
                            avg_effiz = avg_effiz / 365;
                            avg_eff.push(avg_effiz);
                            avg_effiz = 0;

                        }
                    }
                    let length_array_3 = anlage_two_power.length - 8540;
                    var avg_effiz_2 = 0;
                    let avg_eff_2 = [];
                    var m = 0;
                    for (let i = 0; i < length_array_3; i++) {
                        if (m < 365) {
                            m++;
                            avg_effiz_2+= anlage_two_power[i];
                        } else {
                            m = 0;
                            avg_effiz_2 = avg_effiz_2 / 365;
                            avg_eff_2.push(avg_effiz_2);
                            avg_effiz_2 = 0;

                        }
                    }
                    console.log(avg_eff_2);

                   // [0.021759367986737478, 0.021754514499306578, 0.02173315694100295, 0.021715717395622395, 0.02171498201878351, 0.021723364502483435, 0.021723903376794994, 0.02179861529037908, 0.02191760266014898, 0.021946300851670143, 0.02194113545087387]


                    $scope.labels =["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec","Jan", "Feb","Mar"];
                    $scope.data = average_month.map(function(e){
                        return Math.sin(e) * 25 +25;
                    });

                    stopableInterval.start($interval, function(){
                        var tempArray = [];
                        var lastElement = $scope.data[$scope.data.length-1];
                        for(var i = $scope.data.length-1; i > 0; i--){
                            tempArray[i] = $scope.data[i-1];
                        }
                        tempArray[0] = lastElement;
                        $scope.data = tempArray;
                    }, 400)

                    var layoutColors = baConfig.colors;
                    //$scope.colors = [layoutColors.primary, layoutColors.warning, layoutColors.danger, layoutColors.info, layoutColors.success, layoutColors.primaryDark];
                    $scope.lineData = [
                       // {y: "2006", a: 0.0217336055650524, b: 0.021871597037165118},
                       // {y: "2007", a:  0.021815092157059374, b:  0.02172094192872475},
                       // {y: "2008", a: 0.021737255802169748, b: 0.021783106823443022},
                      //  {y: "2009", a: 0.021691241230473963, b: 0.021619416684796045},
                        {y: "2015", a: avg_eff[0], b: avg_eff_2[0]},
                        {y: "2016", a: avg_eff[1], b:avg_eff_2[1]},
                        {y: "2017", a: avg_eff[2], b: avg_eff_2[2]}
                    ];

                    angular.element($window).bind('resize', function () {
                        $window.Morris.Grid.prototype.redraw();
                    });
                    var chart = AmCharts.makeChart( "chartdiv", {
                        "type": "serial",
                        "theme": "light",
                        "depth3D": 20,
                        "angle": 30,
                        "legend": {
                            "horizontalGap": 10,
                            "useGraphSettings": true,
                            "markerSize": 10
                        },
                        "dataProvider": [ {
                            "year": 2015,
                            "Altheim": 2.5,
                            "Traunreut": 2.5,
                            "Bad Urach": 2.1,
                            "Bruchsaal": 1.2,
                            "Sauerlach": 0.2,
                            "Speyer": 0.1,
                            "Unterhaching":0.5,
                            "Kirchstockach":0.4,
                            "Taufkirchen":0.2,
                            "Holzkirchen":0.6
                        }, {
                            "year": 2016,
                            "Altheim": 3.5,
                            "Traunreut": 1.5,
                            "Bad Urach": 2.5,
                            "Bruchsaal": 1.2,
                            "Sauerlach": 0.2,
                            "Speyer": 0.1,
                            "Unterhaching":0.7,
                            "Kirchstockach":0.2,
                            "Taufkirchen":0.3,
                            "Holzkirchen":0.5
                        }, {
                            "year": 2017,
                            "Altheim": 3.5,
                            "Traunreut": 1.5,
                            "Bad Urach": 2.5,
                            "Bruchsaal": 1.2,
                            "Sauerlach": 0.2,
                            "Speyer": 0.1,
                            "Unterhaching":0.4,
                            "Kirchstockach":0.6,
                            "Taufkirchen":0.6,
                            "Holzkirchen":0.7
                        } ],
                        "valueAxes": [ {
                            "stackType": "regular",
                            "axisAlpha": 0,
                            "gridAlpha": 0
                        } ],
                        "graphs": [ {
                            "balloonText": "<b>[[title]]</b><br><span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>",
                            "fillAlphas": 0.8,
                            "labelText": "[[value]]",
                            "lineAlpha": 0.3,
                            "title": "Altheim",
                            "type": "column",
                            "color": "#000000",
                            "valueField": "Altheim"
                        }, {
                            "balloonText": "<b>[[title]]</b><br><span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>",
                            "fillAlphas": 0.8,
                            "labelText": "[[value]]",
                            "lineAlpha": 0.3,
                            "title": "Traunreut",
                            "type": "column",
                            "color": "#000000",
                            "valueField": "Traunreut"
                        }, {
                            "balloonText": "<b>[[title]]</b><br><span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>",
                            "fillAlphas": 0.8,
                            "labelText": "[[value]]",
                            "lineAlpha": 0.3,
                            "title": "Bad Urach",
                            "type": "column",
                            "newStack": true,
                            "color": "#000000",
                            "valueField": "burach"
                        }, {
                            "balloonText": "<b>[[title]]</b><br><span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>",
                            "fillAlphas": 0.8,
                            "labelText": "[[value]]",
                            "lineAlpha": 0.3,
                            "title": "Bruchsaal",
                            "type": "column",
                            "color": "#000000",
                            "valueField": "Bruchsaal"
                        }, {
                            "balloonText": "<b>[[title]]</b><br><span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>",
                            "fillAlphas": 0.8,
                            "labelText": "[[value]]",
                            "lineAlpha": 0.3,
                            "title": "Sauerlach",
                            "type": "column",
                            "color": "#000000",
                            "valueField": "sauerlach"
                        }, {
                            "balloonText": "<b>[[title]]</b><br><span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>",
                            "fillAlphas": 0.8,
                            "labelText": "[[value]]",
                            "lineAlpha": 0.3,
                            "title": "Speyer",
                            "type": "column",
                            "color": "#000000",
                            "valueField": "Speyer"
                        } ,
                            {
                                "balloonText": "<b>[[title]]</b><br><span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>",
                                "fillAlphas": 0.8,
                                "labelText": "[[value]]",
                                "lineAlpha": 0.3,
                                "title": "Unterhaching",
                                "type": "column",
                                "color": "#000000",
                                "valueField": "Unterhaching"
                            } ,
                            {
                                "balloonText": "<b>[[title]]</b><br><span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>",
                                "fillAlphas": 0.8,
                                "labelText": "[[value]]",
                                "lineAlpha": 0.3,
                                "title": "Kirchstockach",
                                "type": "column",
                                "color": "#000000",
                                "valueField": "Kirchstockach"
                            } ,
                            {
                                "balloonText": "<b>[[title]]</b><br><span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>",
                                "fillAlphas": 0.8,
                                "labelText": "[[value]]",
                                "lineAlpha": 0.3,
                                "title": "Taufkirchen",
                                "type": "column",
                                "color": "#000000",
                                "valueField": "Taufkirchen"
                            },{
                                "balloonText": "<b>[[title]]</b><br><span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>",
                                "fillAlphas": 0.8,
                                "labelText": "[[value]]",
                                "lineAlpha": 0.3,
                                "title": "Holzkirchen",
                                "type": "column",
                                "color": "#000000",
                                "valueField": "Holzkirchen"
                            } ],
                        "categoryField": "year",
                        "categoryAxis": {
                            "gridPosition": "start",
                            "axisAlpha": 0,
                            "gridAlpha": 0,
                            "position": "left"
                        },
                        "export": {
                            "enabled": true
                        }

                    } );

                    */
