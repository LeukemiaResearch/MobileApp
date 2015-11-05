angular.module('starter.controllers')

  .controller('dataoverviewController', ['$scope', '$filter', 'questionState', function($scope, $filter, questionState){

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
    return d3.range(n).map(function() {
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
      margin : {
        top: 30,
        right: 30,
        bottom: 30,
        left: 30
      },
      "color": [
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
        tickFormat: function(d){
          return d3.format(',f')(d);
        }
      },
      yAxis1: {
        tickFormat: function(d){
          return d3.format(',.1f')(d);
        }
      },
      yAxis2: {
        tickFormat: function(d){
          return d3.format(',.1f')(d);
        }
      }
    }
  };

  //Generate test data
  $scope.storeddata = stream_layers(7,10+Math.random()*100,.1).map(function(data, i) {
    return {
      key: 'Stream' + i,
      label: 'Stream' + i,
      values: data.map(function(a){a.y = a.y * (i <= 1 ? -1 : 1); return a}),
      type: "line",
      visible: false,
      color: $scope.options.chart.color[i]
    };
  });
  $scope.storeddata[0].visible=true; //show first

  //Data control
  $scope.dataseries = $filter('filter')($scope.storeddata,{visible:true});
  $scope.storeddata.forEach(function(dataserie, index) {
    $scope.$watch(function (scope) {
        return $scope.storeddata[index].visible
      },
      function (newValue, oldValue) {
        $scope.dataseries = $filter('filter')($scope.storeddata,{visible:true});
        var countLeft = 0;
        var countRight = 0;
        $scope.dataseries.forEach(function(dataserie) {
          if (dataserie.yAxis === 1) {
            countLeft++;
          } else if (dataserie.yAxis === 2) {
            countRight++;
          }
        });
        $scope.dataseries.forEach(function(dataserie) {
          if (dataserie.yAxis !== 1 && dataserie.yAxis !== 2) {
            if (countRight<countLeft) {
              dataserie.yAxis = 2;
              countRight++
            } else {
              dataserie.yAxis = 1;
              countLeft++
            }
          }
        });
        $scope.options.chart.color = $scope.dataseries.map(function(dataserie) { dataserie.color });
      }
    );
  });

  //Data type control
  $scope.datatype = questionState.type; //e.g. Smerte

  //Display chart/table control
  $scope.displaytype = "";//'chart' or 'table'
  $scope.chartbuttonclass = "";
  $scope.tablebuttonclass = "";

  $scope.changeDisplayType = function(dis) {
    $scope.displaytype = dis;
    console.log("Type:"+dis);
    if (dis=="chart") {
      $scope.chartbuttonclass = "button-dark";
      $scope.tablebuttonclass = "button-light";
    } else if (dis=="table") {
      $scope.chartbuttonclass = "button-light";
      $scope.tablebuttonclass = "button-dark";
    };
  };
  $scope.changeDisplayType("chart");

}])
