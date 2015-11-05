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


  .controller('questionsController', function($scope, questionState, MucositisDataService, $ionicPopup) {

    $scope.questionState = questionState;

    if (questionState.timePickerObject === undefined)
      questionState.timePickerObject = {
        timeDisplayValue: undefined,
        displayValue: function () {
          var selectedTime = new Date(questionState.timePickerObject.inputEpochTime * 1000);
          return selectedTime.getUTCHours().toLocaleString('da-DK', {minimumIntegerDigits: 2, useGrouping: false})
            + ' : '
            + selectedTime.getUTCMinutes().toLocaleString('da-DK', {minimumIntegerDigits: 2, useGrouping: false});
        },
        inputEpochTime: (new Date().getHours() * 60 * 60 + Math.floor(new Date().getMinutes() / 5) * 5 * 60),  //Optional
        step: 5,  //Optional
        format: 24,  //Optional
        titleLabel: 'Tidspunkt',  //Optional
        setLabel: 'Vælg',  //Optional
        closeLabel: 'Anuller',  //Optional
        setButtonType: 'button-positive',  //Optional
        closeButtonType: 'button-stable',  //Optional
        callback: function (val) {    //Mandatory
          questionState.timePickerObject.inputEpochTime = val;
        }
      };

    if (questionState.datepickerObject === undefined)
      questionState.datepickerObject = {
        titleLabel: 'Dato',  //Optional
        todayLabel: 'I dag',  //Optional
        closeLabel: 'Luk',  //Optional
        setLabel: 'Vælg',  //Optional
        setButtonType: 'button-assertive',  //Optional
        todayButtonType: 'button-assertive',  //Optional
        closeButtonType: 'button-assertive',  //Optional
        inputDate: new Date(),  //Optional
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
          questionState.datepickerObject.inputDate = val;
        },
        dateFormat: 'dd-MM-yyyy', //Optional
        closeOnSelect: false, //Optional
      };

    $scope.questions = {
      "Blodprøve": {
        "Tid": "templates/questions/timestamp.html",
        "Blodprøve": "templates/questions/blodsample.html"
      },
      "Medicin": {
        "Tid": "templates/questions/timestamp.html",
        "Medicin": "templates/questions/medicine.html"
      },
      "Smerte": {
        "Tid": "templates/questions/timestamp.html",
        "Morfin":"templates/questions/morphine.html",
        "Type":"templates/questions/painposition.html",
        "Styrke": "templates/questions/painscale.html"
      },
      "Mucositis": {
        "Tid": "templates/questions/timestamp.html",
        "Mundsår":"templates/questions/mucositistype.html",
        "Kvalme":"templates/questions/nausea.html"
      }
    };

    $scope.datatype = questionState.type;
    $scope.template = 0; //First template
    $scope.hideIndicators = Object.keys($scope.questions[$scope.datatype]).length<=1;

    $scope.finishedWizard = function(){

      //Store entered data
      if (questionState.type==='Mucositis')
        MucositisDataService.finishedWizard();

      //Clean up question state
      for (var variableKey in questionState){

        if (variableKey!=='timePickerObject' &&
            variableKey!=='datepickerObject' &&
            questionState.hasOwnProperty(variableKey))
        {
          delete questionState[variableKey];
        }
      }

      $ionicPopup.alert({
        title: $scope.datatype,
        content: 'Indtastede svar gemt!'
      }).then(function(res) {
        $scope.$ionicGoBack();
        console.log("WIZARD SLUT!!!");
      });
    }

  })

  .controller('frontpageController', ['$scope', '$location', 'questionState', function($scope, $location, questionState) {
    $scope.openQuestionWizardPage = function(type){
      questionState.type = typeof(type)=="string"?type:undefined;
      $location.path("questionwizardpage");
    };

    $scope.openDataOverviewPage = function(type){
      questionState.type = typeof(type)=="string"?type:undefined;
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

  .controller('mucositisController', function($scope, MucositisDataService, questionState) {

    //Expose questionState
    $scope.questionState = questionState;

    //Intialize nauseaScore
    if (questionState.nauseaScore === undefined)
      questionState.nauseaScore = 5;

    //Initialize group values and classes
    if (questionState.groupvalue === undefined)
      questionState.groupvalue = [undefined, undefined, undefined];

    //Change selection
    $scope.select = function(groupnumber, newvalue) {
      questionState.groupvalue[groupnumber] = newvalue;
    };

    //Create new Mucositisdata instance
    MucositisDataService.finishedWizard = function(){
      console.log("Påbegynder oprettelse af mucositisdata!");
      var mucositisScore = 0;
      for (var i = 0; i < questionState.groupvalue.length; i++) {
        mucositisScore += questionState.groupvalue[i];
      }
      console.log("MucositisScore: " + mucositisScore + " , NauseaScore: " + questionState.nauseaScore);
      MucositisDataService.createMucositisData(mucositisScore, questionState.nauseaScore);
    };

  })

  .controller('blodsampleController', function($scope, questionState) {

    //Expose questionState
    $scope.questionState = questionState;

    //values
    questionState.Leukocytter;
    questionState.Neutrofile;
    questionState.Thombocytter;
    questionState.Hemoglobin;
    questionState.Alat;
    questionState.CRP;
  })

  .controller('medicineController', function($scope, questionState) {

    //Expose questionState
    $scope.questionState = questionState;

    //values
    questionState.From;
    questionState.To;
    questionState.MP;
    questionState.MTX;
  })

  .controller('painController', function($scope, questionState) {

    //Expose questionState
    $scope.questionState = questionState;

    //values
    questionState.painType;
    questionState.painScore;
    questionState.morphine;
    questionState.morphineType;
    questionState.morphineDose;

    //Initialize
    if (questionState.morphineMeasureUnit === undefined)
      questionState.morphineMeasureUnit = 'mg';

    //pain type selection
    $scope.selectPainType = function(painType) {
      questionState.painType = painType;
    }

  })
;
