angular.module('starter.controllers', ['mgo-angular-wizard'])

.controller('calendarController', ['$scope', 'calendarFactory', function($scope, calendarFactory) {
  "use strict";
  $scope.calendarFactory = calendarFactory;

  // With "use strict", Dates can be passed ONLY as strings (ISO format: YYYY-MM-DD)
  $scope.options = {
    defaultDate: new Date(),
    minDate: "2015-01-01",
    maxDate: "2020-12-31",
    disabledDates: [
      "2015-06-22",
      "2015-07-27",
      "2015-08-13",
      "2015-08-15"
    ],
    dayNamesLength: 1, // 1 for "M", 2 for "Mo", 3 for "Mon"; 9 will show full day names. Default is 1.
    mondayIsFirstDay: true,//set monday as first day of week. Default is false
    eventClick: function(date) {
      console.log(date);
    },
    dateClick: function(date) {
      calendarFactory.setSelectedDate(date.date);
    },
    changeMonth: function(month, year) {
      console.log(month, year);
    }
  };

  $scope.events = [
    {foo: 'bar', date: "2015-08-18"},
    {foo: 'bar', date: "2015-08-20"}
  ];


}])

  .controller('questionsController', ['$scope', 'questionState', function($scope, questionState ) {
    $scope.questions = {
      "Blodprøve": {
        "Blodprøve": "templates/questions/blodsample.html"
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
    $scope.type = questionState.data.type;
    $scope.template = "fff";
    $scope.hideIndicators = Object.keys($scope.questions[$scope.type]).length<=1;
  }])

  .controller('frontpageController', ['$scope', '$location', 'questionState', function($scope, $location, questionState) {
    $scope.openQuestionWizardPage = function(type){
      questionState.data.type = typeof(type)=="string"?type:undefined;
      $location.path("questionwizardpage");
    };
  }])



