angular.module('starter.controllers')

  .controller('dataoverviewController', function ($scope, $filter, $timeout, questionState, PainDataService, MucositisDataService, MedicineDataService, BloodsampleDataService) {

    //Initialize controller
    var newDataTypeInController = $scope.dataType !== questionState.type;
    if (newDataTypeInController)
      $scope.dataType = questionState.type; //e.g. Smerte

    //Lookup data service based on type
    $scope.getDataService = function() {
      //console.log(questionState.type);
      if ($scope.dataType=='Medicin') {
        return MedicineDataService;
      } else if ($scope.dataType=='Smerte') {
        return PainDataService;
      } else if ($scope.dataType=='Blodprøve') {
        return BloodsampleDataService;
      } else if ($scope.dataType=='Mucositis') {
        return MucositisDataService;
      }
    };

    //Initialize period
    if (!$scope.endTimeStamp || !$scope.startTimeStamp) {
      $scope.endTimeStamp = new Date();
      $scope.startTimeStamp = new Date();
      $scope.startTimeStamp.setMonth($scope.startTimeStamp.getMonth() - 1);

      $scope.formatTime = function (inputEpochTime) {
        var selectedTime = new Date(inputEpochTime * 1000);
        var hours = selectedTime.getUTCHours();
        var minutes = selectedTime.getUTCMinutes();
        return (hours < 10 ? '0' : '') + hours + ' : ' + (minutes < 10 ? '0' : '') + minutes;
      };

      /* Time and date picker */
      $scope.updateStartTimeStamp = function () {
        var date = $scope.startDatepickerObject.inputDate;
        var hours = Math.floor($scope.startTimePickerObject.inputEpochTime / 3600);
        var minutes = Math.floor(($scope.startTimePickerObject.inputEpochTime - hours * 3600) / 60);
        date.setHours(hours, minutes, 0, 0);
        $scope.startTimeStamp = date;
        console.log("updated start timestamp");
        console.log(date);
      };
      if ($scope.startTimePickerObject === undefined)
        $scope.startTimePickerObject = {
          displayValue: function () {
            return $scope.formatTime($scope.startTimePickerObject.inputEpochTime);
          },
          inputEpochTime: (($scope.startTimeStamp ? $scope.startTimeStamp : new Date()).getHours() * 60 * 60 +
          Math.floor(($scope.startTimeStamp ? $scope.startTimeStamp : new Date()).getMinutes() / 5) * 5 * 60),  //Optional
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
          inputDate: ($scope.startTimeStamp ? $scope.startTimeStamp : new Date()),  //Optional
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
            }
            $scope.updateStartTimeStamp();
          },
          dateFormat: 'dd-MM-yyyy', //Optional
          closeOnSelect: false //Optional
        };
      $scope.updateEndTimeStamp = function () {
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
          inputEpochTime: (($scope.endTimeStamp ? $scope.endTimeStamp : new Date()).getHours() * 60 * 60 +
          Math.floor(($scope.endTimeStamp ? $scope.endTimeStamp : new Date()).getMinutes() / 5) * 5 * 60),  //Optional
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
          inputDate: ($scope.endTimeStamp ? $scope.endTimeStamp : new Date()),  //Optional
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
            }
            $scope.updateEndTimeStamp();
          },
          dateFormat: 'dd-MM-yyyy', //Optional
          closeOnSelect: false //Optional
        };
    }

    $scope.options = {
      chart: {
        type: 'multiChart',
        height: window.innerHeight / 2,
        showLegend: false,
        noData: "Ingen data valgt til visning",
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
            if (!d) return d;
            return d3.time.format('%d/%m')(new Date(d));
          }
        },
        yAxis1: {
          tickFormat: function (d) {
            if (!d) return d;
            return d3.format(',.1f')(d);
          }
        },
        yAxis2: {
          tickFormat: function (d) {
            if (!d) return d;
            return d3.format(',.1f')(d);
          }
        }
      }
    };

    $scope.config = {
      visible: true, // default: true
      extended: false, // default: false
      disabled: false, // default: false
      autorefresh: true, // default: true
      refreshDataOnly: true, // default: true
      deepWatchOptions: true, // default: true
      deepWatchData: true, // default: false
      deepWatchConfig: true, // default: true
      debounce: 10 // default: 10
    };

    //Data serie visibility control
    $scope.updateFilteredDataSeries = function () {
      var curr = $scope.displaytype;
      //using $timeout instead of $scope.$apply removes $digest already in progress error
      $timeout( function() {
        $scope.filteredDataSeries = $filter('filter')($scope.dataSeries, {visible:true});
        var chart = nv.models.multiChart();
        d3.select("graph svg").datum($scope.filteredDataSeries).call(chart);
        console.log("Change");
        if (curr=="chart")
          $scope.displaytype = "table";
        else
          $scope.displaytype = "chart";
      });
      $timeout( function() {
        $scope.displaytype = curr;
      });
    };

    //Load data objects to display
    if ($scope.dataSeries===undefined || newDataTypeInController) {
      $scope.dataSeries = []; // Objects like {values: [{x:timeStap, y:value},...], color: ?, type: ?, key: ?, label: ?, visible: true}
    }
    $scope.$watch($scope.startTimeStamp, function() {
      $scope.updateDataObjects();
    });
    $scope.$watch($scope.endTimeStamp, function() {
      $scope.updateDataObjects();
    });
    $scope.updateDataObjects = function () {

      //create graph dataseries content
      var dataObjects = $scope.getDataService().getData($scope.startTimeStamp, $scope.endTimeStamp);
      var dataserieNumber = 0;
      for (var objcount in dataObjects) {

        //Insert all timeStamp data in data series
        var obj = dataObjects[objcount];
        for (dataSerieName in obj) {
          if (!obj.hasOwnProperty(dataSerieName) || dataSerieName==="id" || dataSerieName==="timeStamp" || dataSerieName==="DSCreate")
            continue;

          //Lookup dataserie for dataSerieName
          var dataserie = $scope.dataSeries.find(function(e){return e.key==dataSerieName});
          if (dataserie===undefined) {
            dataserie = {};
            dataserie['values'] = [];
            dataserie['color'] = $scope.options.chart.allcolors[$scope.dataSeries.length+1];
            dataserie['type'] = 'line';
            dataserie['key'] = dataSerieName;
            dataserie['label'] = dataSerieName;
            dataserie['visible'] = 0==dataserieNumber++;
            $scope.dataSeries.push(dataserie);
          }

          //Insert new dataserie value
          var dataValue = {'x':obj['timeStamp'], 'y':obj[dataSerieName]};
          var position = dataserie.values.findIndex(function(e){
            return e.x==obj['timeStamp'];
          });
          if (position<0)
            dataserie.values.push(dataValue);
          else
            dataserie.values.splice(position, 1, dataValue);
        }
      }

      //Remove all data out of period
      for (dataserie in $scope.dataSeries) {
        do {
          var removeIndex = $scope.dataSeries[dataserie].values.findIndex(function(e){e.x<$scope.startTimeStamp || $scope.endTimeStamp< e.x});
          if (removeIndex>=0)
            dataserie.values.splice(removeIndex, 1);
        } while (removeIndex>=0);
      }

      //Sort data values
      for (dataserie in $scope.dataSeries) {
        $scope.dataSeries[dataserie].values.sort(function(e1,e2){return e1.x<e2.x});
      }

      //Data serie display control
      var countLeft = 0;
      var countRight = 0;
      $scope.dataSeries.forEach(function (dataserie) {
        if (dataserie.yAxis === 1) {
          countLeft++;
        } else if (dataserie.yAxis === 2) {
          countRight++;
        }
      });
      $scope.dataSeries.forEach(function (dataserie) {
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
      $scope.options.chart.color = $scope.dataSeries.map(function (dataserie) {
        return dataserie.color;
      });

      //Data serie visibility control
      $scope.updateFilteredDataSeries();
    };

    //Toggle display of data serie
    $scope.toggleShowDataSerie = function(key) {
      var dataserie = $scope.dataSeries.find(function(ds){
        return ds.key==key;
      });
      dataserie.visible = !dataserie.visible;

      //Data serie visibility control
      $scope.updateFilteredDataSeries();
    };

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
    $scope.changeDisplayType("table");

    //Update data content
    if (newDataTypeInController)
      $scope.updateDataObjects();
    $scope.$watch(
      function() { return $scope.startTimeStamp.getTime(); },
      function(newValue, oldValue) {
        $scope.updateDataObjects();
      }
    );
    $scope.$watch(
      function() { return $scope.endTimeStamp.getTime(); },
      function(newValue, oldValue) {
        $scope.updateDataObjects();
      }
    );
  });

