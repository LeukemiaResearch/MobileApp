angular.module('starter.controllers', ['mgo-angular-wizard'])

.controller('calendarController', ['$scope', function($scope) {
  "use strict";
  // With "use strict", Dates can be passed ONLY as strings (ISO format: YYYY-MM-DD)
  $scope.options = {
    defaultDate: "2015-08-06",
    minDate: "2015-01-01",
    maxDate: "2015-12-31",
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
      console.log(date);
    },
    changeMonth: function(month, year) {
      console.log(month, year);
    }
  };

  $scope.events = [
    {foo: 'bar', date: "2015-08-18"},
    {foo: 'bar', date: "2015-08-20"}
  ];
}]);
