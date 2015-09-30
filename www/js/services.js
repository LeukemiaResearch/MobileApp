angular.module('starter.services', [])

.factory('questionState', function() {
  var obj = {
    type: undefined, //e.g. pain for pain questions
  };
  return {data: obj};
})

.factory('calendarFactory', function() {

    var obj = {};

    obj.selectedDate = new Date();

    obj.setSelectedDate = function (date) {
      obj.selectedDate = date;
    };

    obj.getSelectedMonth = function () {
      var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];

      return monthNames[obj.selectedDate.getMonth()];
    }

    obj.getSelectedDayOfTheWeek = function() {
      var dayOfWeekNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
        ];

      return dayOfWeekNames[obj.selectedDate.getDay()];
    }

    return obj;
  });
