angular.module('starter.controllers', ['mgo-angular-wizard'])

  .controller('calendarController', ['$scope', 'calendarFactory', function($scope, calendarFactory) {
    "use strict";
    $scope.calendarFactory = calendarFactory;
    $scope.events = calendarFactory.events;
    $scope.checkBoxModel = {
      bloodsample: false,
      highdose: false
    };

    // With "use strict", Dates can be passed ONLY as strings (ISO format: YYYY-MM-DD)
    $scope.options = {
      defaultDate: new Date(),
      minDate: "2015-01-01",
      maxDate: "2020-12-31",
      disabledDates: [

      ],
      dayNamesLength: 1, // 1 for "M", 2 for "Mo", 3 for "Mon"; 9 will show full day names. Default is 1.
      mondayIsFirstDay: true,//set monday as first day of week. Default is false
      eventClick: function(date) {
        calendarFactory.setSelectedDate(date.date);
        $scope.checkBoxModel.bloodsample = false;
        $scope.checkBoxModel.highdose = false;

        date.event.forEach(function(event) {
          if (event.foo == 'bloodsample')
            $scope.checkBoxModel.bloodsample = true;
          if (event.foo == 'highdose')
            $scope.checkBoxModel.highdose = true;
        });

        console.log(date);
      },
      dateClick: function(date) {
        calendarFactory.setSelectedDate(date.date);
        $scope.checkBoxModel.bloodsample = false;
        $scope.checkBoxModel.highdose = false;
      },
      changeMonth: function(month, year) {
        console.log(month, year);
      }
    };

    $scope.updateBloodSampleEvent = function() {
      if ($scope.checkBoxModel.bloodsample == true) {
        calendarFactory.addEvent('bloodsample');
      }

      if ($scope.checkBoxModel.bloodsample == false) {
        calendarFactory.removeEvent('bloodsample');
      }
    }

    $scope.updateHighDoseEvent = function() {
      if ($scope.checkBoxModel.highdose == true) {
        calendarFactory.addEvent('highdose');
      }

      if ($scope.checkBoxModel.highdose == false) {
        calendarFactory.removeEvent('highdose');
      }
    }

  }])


  .controller('questionsController', ['$scope', 'questionState','MucositisDataService', function($scope, questionState, MucositisDataService) {


    $scope.questions = {
      "Blodprøve": {
        "Blodprøve": "templates/questions/blodsample.html"
      },
      "Medicin": {
        "Medicin": "templates/questions/medicine.html"
      },
      "Smerte": {
        "Morfin":"templates/questions/morphine.html",
        "Type":"templates/questions/painposition.html",
        "Intensitet": "templates/questions/painscale.html"
      },
      "Mucositis": {
        "Mundsår":"templates/questions/mucositistype.html",
        "Kvalme":"templates/questions/nausea.html"
      }
    };

    $scope.data = questionState.data;
    $scope.datatype = questionState.data.type;
    $scope.template = "fff";
    $scope.hideIndicators = Object.keys($scope.questions[$scope.datatype]).length<=1;

    $scope.finishedWizard = function(){
      MucositisDataService.finishedWizard();
      console.log("WIZARD SLUT!!!");
    }

  }])

  .controller('frontpageController', ['$scope', '$location', 'questionState', function($scope, $location, questionState) {
    $scope.openQuestionWizardPage = function(type){
      questionState.data.type = typeof(type)=="string"?type:undefined;
      $location.path("questionwizardpage");
    };

    $scope.openDataOverviewPage = function(type){
      questionState.data.type = typeof(type)=="string"?type:undefined;
      $location.path("dataoverviewpage");
    };
  }])

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
    $scope.datatype = questionState.data.type; //e.g. Smerte

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

  .controller('mucositisController', function($scope, MucositisDataService) {
    //Intialize nauseaScore
    $scope.nauseaScore = 5;

    //Initialize group values and classes
    $scope.groupvalue = [undefined, undefined, undefined];

    //Change selection
    $scope.select = function(groupnumber, newvalue) {
      $scope.groupvalue[groupnumber] = newvalue;
    };

    //Create new Mucositisdata instance
    MucositisDataService.finishedWizard = function(){
      console.log("Påbegynder oprettelse af mucositisdata!");
      var mucositisScore = 0;
      for (var i = 0; i < $scope.groupvalue.length; i++) {
        mucositisScore += $scope.groupvalue[i];
      }
      console.log("MucositisScore: " + mucositisScore + " , NauseaScore: " + $scope.nauseaScore);
      MucositisDataService.createMucositisData(mucositisScore,$scope.nauseaScore);
    };

  })

  .controller('blodsampleController', ['$scope', function($scope) {
    $scope.Blodsamples = {
      "Leukocytter": undefined,
      "Neutrofile": undefined,
      "Thombocytter": undefined,
      "Hemoglobin": undefined,
      "Alat": undefined,
      "CRP": undefined
    };
  }])

  .controller('medicineController', ['$scope', function($scope) {
    $scope.Medicine = {
      "From": undefined,
      "To": undefined,
      "MP": undefined,
      "MTX": undefined
    };
  }])

  .controller('painController', ['$scope', function($scope) {

    $scope.painData = {
      "painType": undefined,
      "painScore": undefined,
      "morphine": true,
      "morphineType": 'oral',
      "morphineDose": undefined,
      "morphineMeasureUnit": 'mg'
    };

    $scope.selectPainType = function(painType) {
      $scope.painData.painType = painType;
    }

  }])
;
