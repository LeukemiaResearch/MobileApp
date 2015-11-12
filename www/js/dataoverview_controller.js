angular.module('starter.controllers')

  .controller('dataoverviewController', function ($scope, $filter, questionState, dataProvider, PainDataService, MucositisDataService, MedicineDataService, BloodsampleDataService) {

    //Initialize period
    $scope.endTimeStamp = new Date();
    $scope.startTimeStamp = new Date();
    $scope.startTimeStamp.setMonth($scope.startTimeStamp.getMonth()-1);

    $scope.formatTime = function (inputEpochTime) {
      var selectedTime = new Date(inputEpochTime * 1000);
      var hours = selectedTime.getUTCHours();
      var minutes = selectedTime.getUTCMinutes();
      return (hours < 10 ? '0' : '') + hours +' : '+ (minutes < 10 ? '0' : '') + minutes;
    };

    /* Time and date picker */
    $scope.updateStartTimeStamp = function() {
      var date = $scope.startDatepickerObject.inputDate;
      var hours = Math.floor($scope.startTimePickerObject.inputEpochTime / 3600);
      var minutes = Math.floor(($scope.startTimePickerObject.inputEpochTime - hours * 3600) / 60);
      date.setHours(hours, minutes, 0, 0);
      $scope.startTimeStamp = date;
    };
    if ($scope.startTimePickerObject === undefined)
      $scope.startTimePickerObject = {
        displayValue: function () {
          return $scope.formatTime($scope.startTimePickerObject.inputEpochTime);
        },
        inputEpochTime: (($scope.startTimeStamp?$scope.startTimeStamp:new Date()).getHours() * 60 * 60 +
        Math.floor(($scope.startTimeStamp?$scope.startTimeStamp:new Date()).getMinutes() / 5) * 5 * 60),  //Optional
        step: 5,  //Optional
        format: 24,  //Optional
        titleLabel: 'Tidspunkt',  //Optional
        setLabel: 'Vælg',  //Optional
        closeLabel: 'Luk',  //Optional
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
        setButtonType: 'button-positive',  //Optional
        todayButtonType: 'button-stable',  //Optional
        closeButtonType: 'button-stable',  //Optional
        inputDate: ($scope.startTimeStamp?$scope.startTimeStamp:new Date()),  //Optional
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
      var date = $scope.endDatepickerObject.inputDate;
      var hours = Math.floor($scope.endTimePickerObject.inputEpochTime / 3600);
      var minutes = Math.floor(($scope.endTimePickerObject.inputEpochTime - hours * 3600) / 60);
      date.setHours(hours, minutes, 0, 0);
      $scope.endTimeStamp = date;
    };
    if ($scope.endTimePickerObject === undefined)
      $scope.endTimePickerObject = {
        displayValue: function () {
          return $scope.formatTime($scope.endTimePickerObject.inputEpochTime);
        },
        inputEpochTime: (($scope.endTimeStamp?$scope.endTimeStamp:new Date()).getHours() * 60 * 60 +
        Math.floor(($scope.endTimeStamp?$scope.endTimeStamp:new Date()).getMinutes() / 5) * 5 * 60),  //Optional
        step: 5,  //Optional
        format: 24,  //Optional
        titleLabel: 'Tidspunkt',  //Optional
        setLabel: 'Vælg',  //Optional
        closeLabel: 'Luk',  //Optional
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
        setButtonType: 'button-positive',  //Optional
        todayButtonType: 'button-stable',  //Optional
        closeButtonType: 'button-stable',  //Optional
        inputDate: ($scope.endTimeStamp?$scope.endTimeStamp:new Date()),  //Optional
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
        showLegend: false,
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
        //useInteractiveGuideline: false,
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

    //Lookup data service based on type
    $scope.getDataService = function() {
      if ($scope.datatype=='Medicin') {
        return MedicineDataService;
      } else if ($scope.datatype=='Smerte') {
        return PainDataService;
      } else if ($scope.datatype=='Blodprøve') {
        return BloodsampleDataService;
      } else if ($scope.datatype=='Mucositis') {
        return MucositisDataService;
      };
    }

    //Load graph data
    $scope.updateGraphContent = function() {
      $scope.storeddata = new Array();
      var rawdataseries = dataProvider.getAllDataSeries($scope.getDataService(), $scope.startTimeStamp, $scope.endTimeStamp);
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
        $scope.visibility[dataserieNumber] = dataserieNumber == 0;
        dataserieNumber++;
      }
      $scope.updateDataContent();
    };

    //Load table data
    $scope.updateTableData = function() {
      $scope.storeddatatable = dataProvider.getAllDataTable($scope.getDataService(), $scope.startTimeStamp, $scope.endTimeStamp);
      $scope.datatable = [];
      for (var dataseriename in $scope.storeddatatable) {
        if ($scope.storeddatatable.hasOwnProperty(dataseriename)) {
          if ($scope.storeddatatable.hasOwnProperty(dataseriename)) {
            var datarow = {'key': dataseriename, values: $scope.storeddatatable[dataseriename]};
            $scope.datatable.push(datarow);
          }
        }
      }
    }

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

    //Update data content
    $scope.$watch(
      function() { return $scope.startTimeStamp.getTime(); },
      function(newValue, oldValue) {
        $scope.updateGraphContent();
        $scope.updateTableData();
      }
    );
    $scope.$watch(
      function() { return $scope.endTimeStamp.getTime(); },
      function(newValue, oldValue) {
        $scope.updateGraphContent();
        $scope.updateTableData();
      }
    );
    $scope.updateGraphContent();
    $scope.updateTableData();
  });

