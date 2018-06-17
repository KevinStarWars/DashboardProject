(function () {
    'use strict';

    angular.module('Geothermal.pages.khristina')
        .controller('KhristinaCtrl',
            ['$scope', 'fetchDataFactory', 'baConfig', '$timeout','$interval', 'stopableInterval','$window',
                async function KhristinaCtrl($scope, fetchDataFactory, $timeout, baConfig, $interval, stopableInterval, $window) {
                    //  let data = await fetchDataFactory.fetchData('1d8a69a5-b692-47b7-aacb-b7f26692c0ec');

                    let array_data = await fetchDataFactory.fetchEfficiencyArray('1d8a69a5-b692-47b7-aacb-b7f26692c0ec', 0);
                    let length_array = array_data.length - 9280;
                    var avg_month = 0;
                    let average_month = [];
                    var k = 0;
                    for (let i = 0; i < length_array; i++) {
                        if (k < 60) {
                            k++;
                            avg_month+= array_data[i];
                        } else {
                            k = 0;
                            avg_month = avg_month / 60;
                            average_month.push(avg_month);
                            avg_month = 0;

                        }
                    }
                    console.log(average_month)  //for Animated Radar
                    let length_array_2 = array_data.length - 4160;
                    var avg_effiz = 0;
                    let avg_eff = [];
                    var k = 0;
                    for (let i = 0; i < length_array_2; i++) {
                        if (k < 365) {
                            k++;
                            avg_effiz+= array_data[i];
                        } else {
                            k = 0;
                            avg_effiz = avg_effiz / 365;
                            avg_eff.push(avg_effiz);
                            avg_effiz = 0;

                        }
                    }
                    $scope.labels =["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec","Jan", "Feb"];
                    $scope.data = [0.021759367986737478, 0.021754514499306578, 0.02173315694100295, 0.021715717395622395, 0.02171498201878351, 0.021723364502483435, 0.021723903376794994, 0.02179861529037908, 0.02191760266014898, 0.021946300851670143, 0.02194113545087387].map(function(e){
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
                        {y: "2006", a: 0.0217336055650524, b: 0.021871597037165118},
                        {y: "2007", a:  0.021815092157059374, b:  0.02172094192872475},
                        {y: "2008", a: 0.021737255802169748, b: 0.021783106823443022},
                        {y: "2009", a: 0.021691241230473963, b: 0.021619416684796045},
                        {y: "2010", a: 0.021553817725412157, b: 0.021441530416323004},
                        {y: "2011", a: 0.021421724592412972, b: 0.021427246096337983},
                        {y: "2012", a: 0.021461382850026595, b: 0.02134375345450876}
                    ];

                    angular.element($window).bind('resize', function () {
                        $window.Morris.Grid.prototype.redraw();
                    });


                }])})();
