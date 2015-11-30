angular.module('starter.controllers')

  .controller('calendarController', ['$scope', 'calendarFactory', 'DailyDataService',
    function ($scope, calendarFactory, DailyDataService) {
      "use strict";
      $scope.calendarFactory = calendarFactory;
      $scope.events = calendarFactory.events;
      $scope.checkBoxModel = {
        bloodsample: false,
        highdose: false
      };
      $scope.notes = calendarFactory.getNoteForDay();

      // With "use strict", Dates can be passed ONLY as strings (ISO format: YYYY-MM-DD)
      $scope.options = {
        defaultDate: new Date(),
        minDate: "2015-01-01",
        maxDate: "2020-12-31",
        disabledDates: [],
        dayNamesLength: 1, // 1 for "M", 2 for "Mo", 3 for "Mon"; 9 will show full day names. Default is 1.
        mondayIsFirstDay: true,//set monday as first day of week. Default is false
        eventClick: function (date) {
          saveNote();
          calendarFactory.setSelectedDate(date.date);
          $scope.checkBoxModel.bloodsample = false;
          $scope.checkBoxModel.highdose = false;
          $scope.notes = calendarFactory.getNoteForDay();

          date.event.forEach(function (event) {
            if (event.foo == 'bloodsample')
              $scope.checkBoxModel.bloodsample = true;
            if (event.foo == 'highdose')
              $scope.checkBoxModel.highdose = true;
          });

          console.log(date);
        },
        dateClick: function (date) {
          saveNote();
          calendarFactory.setSelectedDate(date.date);
          $scope.checkBoxModel.bloodsample = false;
          $scope.checkBoxModel.highdose = false;
          $scope.notes = calendarFactory.getNoteForDay();
        },
        changeMonth: function (month, year) {
          console.log(month, year);
        }
      };

      $scope.updateBloodSampleEvent = function () {
        if ($scope.checkBoxModel.bloodsample == true) {
          calendarFactory.addEvent('bloodsample');
        }

        if ($scope.checkBoxModel.bloodsample == false) {
          calendarFactory.removeEvent('bloodsample');
        }
      }

      $scope.updateHighDoseEvent = function () {
        if ($scope.checkBoxModel.highdose == true) {
          calendarFactory.addEvent('highdose');
        }

        if ($scope.checkBoxModel.highdose == false) {
          calendarFactory.removeEvent('highdose');
        }
      }

      var saveNote = function () {
        var dailyData = DailyDataService.getDailyDataOnDate(calendarFactory.selectedDate)[0];
        console.log(dailyData)
        if (dailyData === undefined || dailyData.length == 0  ) {
          DailyDataService.createDailyData(calendarFactory.selectedDate, $scope.notes, '-');
          console.log("New daily data object created.")
        } else {
          if (dailyData.note !== $scope.notes) {
            dailyData.note = $scope.notes;
            console.log("Note modified.")
          }
        }
      }

    }])
;
