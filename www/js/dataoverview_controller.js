angular.module('starter.controllers')

  .controller('dataoverviewController', function ($scope, $filter, questionState, dataProvider) {

    $scope.formatTime = function (inputEpochTime) {
      var selectedTime = new Date(inputEpochTime * 1000);
      var hours = selectedTime.getUTCHours();
      var minutes = selectedTime.getUTCMinutes();
      return (hours < 10 ? '0' : '') + hours +' : '+ (minutes < 10 ? '0' : '') + minutes;
    };

    /* Time and date picker */
    $scope.updateStartTimeStamp = function() {

    };
    if ($scope.startTimePickerObject === undefined)
      $scope.startTimePickerObject = {
        displayValue: function () {
          return $scope.formatTime($scope.startTimePickerObject.inputEpochTime);
        },
        inputEpochTime: ((questionState.timeStamp?questionState.timeStamp:new Date()).getHours() * 60 * 60 +
        Math.floor((questionState.timeStamp?questionState.timeStamp:new Date()).getMinutes() / 5) * 5 * 60),  //Optional
        step: 5,  //Optional
        format: 24,  //Optional
        titleLabel: 'Tidspunkt',  //Optional
        setLabel: 'Vælg',  //Optional
        closeLabel: 'Anuller',  //Optional
        setButtonType: 'button-positive',  //Optional
        closeButtonType: 'button-stable',  //Optional
        callback: function (val) {    //Mandatory
          if (val) {
            $scope.startTimePickerObject.inputEpochTime = val;
            $scope.updateStartTimeStamp();
          }
        }
      };
    if ($scope.startDatepickerObject === undefined)
      $scope.startDatepickerObject = {
        titleLabel: 'Dato',  //Optional
        todayLabel: 'I dag',  //Optional
        closeLabel: 'Luk',  //Optional
        setLabel: 'Vælg',  //Optional
        setButtonType: 'button-assertive',  //Optional
        todayButtonType: 'button-assertive',  //Optional
        closeButtonType: 'button-assertive',  //Optional
        inputDate: (questionState.timeStamp?questionState.timeStamp:new Date()),  //Optional
        mondayFirst: true,  //Optional
        //disabledDates: disabledDates, //Optional
        weekDaysList: ["Sø", "Ma", "Ti", "On", "To", "Fr", "Lø"], //Optional
        monthList: ["Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December"], //Optional
        templateType: 'popup', //Optional
        showTodayButton: 'true', //Optional
        modalHeaderColor: 'bar-positive', //Optional
        modalFooterColor: 'bar-positive', //Optional
        //from: new Date(2012, 8, 2), //Optional
        //to: new Date(2018, 8, 25),  //Optional
        callback: function (val) {  //Mandatory
          if (val) {
            $scope.startDatepickerObject.inputDate = val;
            $scope.updateStartTimeStamp();
          }
        },
        dateFormat: 'dd-MM-yyyy', //Optional
        closeOnSelect: false, //Optional
      };
    $scope.updateEndTimeStamp = function() {

    };
    if ($scope.endTimePickerObject === undefined)
      $scope.endTimePickerObject = {
        displayValue: function () {
          return $scope.formatTime($scope.endTimePickerObject.inputEpochTime);
        },
        inputEpochTime: ((questionState.timeStamp?questionState.timeStamp:new Date()).getHours() * 60 * 60 +
        Math.floor((questionState.timeStamp?questionState.timeStamp:new Date()).getMinutes() / 5) * 5 * 60),  //Optional
        step: 5,  //Optional
        format: 24,  //Optional
        titleLabel: 'Tidspunkt',  //Optional
        setLabel: 'Vælg',  //Optional
        closeLabel: 'Anuller',  //Optional
        setButtonType: 'button-positive',  //Optional
        closeButtonType: 'button-stable',  //Optional
        callback: function (val) {    //Mandatory
          if (val) {
            $scope.endTimePickerObject.inputEpochTime = val;
            $scope.updateEndTimeStamp();
          }
        }
      };
    if ($scope.endDatepickerObject === undefined)
      $scope.endDatepickerObject = {
        titleLabel: 'Dato',  //Optional
        todayLabel: 'I dag',  //Optional
        closeLabel: 'Luk',  //Optional
        setLabel: 'Vælg',  //Optional
        setButtonType: 'button-assertive',  //Optional
        todayButtonType: 'button-assertive',  //Optional
        closeButtonType: 'button-assertive',  //Optional
        inputDate: (questionState.timeStamp?questionState.timeStamp:new Date()),  //Optional
        mondayFirst: true,  //Optional
        //disabledDates: disabledDates, //Optional
        weekDaysList: ["Sø", "Ma", "Ti", "On", "To", "Fr", "Lø"], //Optional
        monthList: ["Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December"], //Optional
        templateType: 'popup', //Optional
        showTodayButton: 'true', //Optional
        modalHeaderColor: 'bar-positive', //Optional
        modalFooterColor: 'bar-positive', //Optional
        //from: new Date(2012, 8, 2), //Optional
        //to: new Date(2018, 8, 25),  //Optional
        callback: function (val) {  //Mandatory
          if (val) {
            $scope.endDatepickerObject.inputDate = val;
            $scope.updateEndTimeStamp();
          }
        },
        dateFormat: 'dd-MM-yyyy', //Optional
        closeOnSelect: false, //Optional
      };

    /* Inspired by Lee Byron's test data generator. */
    function stream_layers(n, m, o) {
      if (arguments.length < 3) o = 0;
      function bump(a) {
        var x = 1 / (.1 + Math.random()),
          y = 2 * Math.random() - .5,
          z = 10 / (.1 + Math.random());
        for (var i = 0; i < m; i++) {
          var w = (i / m - y) * z;
          a[i] += x * Math.exp(-w * w);
        }
      }

      return d3.range(n).map(function () {
        var a = [], i;
        for (i = 0; i < m; i++) a[i] = o + o * Math.random();
        for (i = 0; i < 5; i++) bump(a);
        return a.map(stream_index);
      });
    }

    function stream_index(d, i) {
      return {x: i, y: Math.max(0, d)};
    }

    $scope.options = {
      chart: {
        type: 'multiChart',
        height: window.innerHeight / 2,
        margin: {
          top: 30,
          right: 30,
          bottom: 30,
          left: 30
        },
        "allcolors": [
          "#1f77b4",
          "#ff7f0e",
          "#2ca02c",
          "#d62728",
          "#9467bd",
          "#8c564b",
          "#e377c2",
          "#7f7f7f",
          "#bcbd22",
          "#17becf",
          "#1f77b4",
          "#ff7f0e",
          "#2ca02c",
          "#d62728",
          "#9467bd",
          "#8c564b",
          "#e377c2",
          "#7f7f7f",
          "#bcbd22",
          "#17becf",
          "#1f77b4",
          "#ff7f0e",
          "#2ca02c",
          "#d62728",
          "#9467bd",
          "#8c564b",
          "#e377c2",
          "#7f7f7f",
          "#bcbd22",
          "#17becf"
        ],
        //color: d3.scale.category10().range(),
        //useInteractiveGuideline: true,
        transitionDuration: 500,
        xAxis: {
          tickFormat: function (d) {
            return d3.time.format('%x')(new Date(d));
          }
        },
        yAxis1: {
          tickFormat: function (d) {
            return d3.format(',.1f')(d);
          }
        },
        yAxis2: {
          tickFormat: function (d) {
            return d3.format(',.1f')(d);
          }
        }
      }
    };

    //Data serie visibility control
    $scope.visibility = [];

    //Load graph data
    $scope.storeddata = new Array();
    var rawdataseries = dataProvider.getAllDataSeries();
    var dataserieNumber = 0;
    for (var name in rawdataseries) {
      var dataserie = {};
      dataserie['values'] = rawdataseries[name];
      dataserie['color'] = $scope.options.chart.allcolors[dataserieNumber];
      dataserie['type'] = 'line';
      dataserie['key'] = name;
      dataserie['label'] = name;
      dataserie['visible'] = true;
      $scope.storeddata.push(dataserie);
      $scope.visibility[dataserieNumber] =  dataserieNumber == 0;
      dataserieNumber++;
    }

    //Load table data
    $scope.storeddatatable = dataProvider.getAllDataTable();
    $scope.datatable = [];
    for (var dataseriename in $scope.storeddatatable) {
      if ($scope.storeddatatable.hasOwnProperty(dataseriename)) {
        if ($scope.storeddatatable.hasOwnProperty(dataseriename)) {
          var datarow = {'key': dataseriename, values: $scope.storeddatatable[dataseriename]};
          $scope.datatable.push(datarow);
        }
      }
    }

    //Data serie control display
    $scope.updateDataContent = function () {
      $scope.dataseries = $filter('filter')($scope.storeddata, function (value, index, array) {
        return $scope.visibility[index] === true;
      });
      var countLeft = 0;
      var countRight = 0;
      $scope.dataseries.forEach(function (dataserie) {
        if (dataserie.yAxis === 1) {
          countLeft++;
        } else if (dataserie.yAxis === 2) {
          countRight++;
        }
      });
      $scope.dataseries.forEach(function (dataserie) {
        if (dataserie.yAxis !== 1 && dataserie.yAxis !== 2) {
          if (countRight < countLeft) {
            dataserie.yAxis = 2;
            countRight++
          } else {
            dataserie.yAxis = 1;
            countLeft++
          }
        }
      });
      $scope.options.chart.color = $scope.dataseries.map(function (dataserie) {
        return dataserie.color;
      });
    };
    $scope.updateDataContent();

    //Toggle display of data serie
    $scope.toggleShowDataSerie = function(number) {
      $scope.visibility[number]=!$scope.visibility[number];
      $scope.updateDataContent();
    }

    //Data type control
    $scope.datatype = questionState.type; //e.g. Smerte

    //Display chart/table control
    $scope.displaytype = "";//'chart' or 'table'
    $scope.chartbuttonclass = "";
    $scope.tablebuttonclass = "";

    $scope.changeDisplayType = function (dis) {
      $scope.displaytype = dis;
      //console.log("Type:" + dis);
      if (dis == "chart") {
        $scope.chartbuttonclass = "button-dark";
        $scope.tablebuttonclass = "button-light";
      } else if (dis == "table") {
        $scope.chartbuttonclass = "button-light";
        $scope.tablebuttonclass = "button-dark";
      }
    };
    $scope.changeDisplayType("chart");

  });

