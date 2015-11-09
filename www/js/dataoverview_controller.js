angular.module('starter.controllers')

  .controller('dataoverviewController', function ($scope, $filter, questionState, dataProvider) {

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
      console.log("Type:" + dis);
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

