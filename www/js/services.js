angular.module('starter.services', [])

  .factory('Data',function(DS){
    DS.registerAdapter('localforage',new DSLocalForageAdapter(),{default:true});
    return DS.defineResource('data');
  })

  .factory('DataService', function (Data) {

    var dataservice = {};

    Data.inject([
      {
        /*TODO - Inject testdata*/
      }
    ]);

    dataservice.createNewData = function () {
      var id = '_' + Math.random().toString(36).substr(2, 9);

      Data.create({id: id,/*TODO - Create new dataobject*/});
        DS.digest();
      };

    dataservice.deleteData = function (id) {
      /*TODO - delete dataobject*/
    };

    dataservice.getAllData = function () {
      return Data.getAll();
    };

    dataservice.getData = function (id) {
      return Data.get(id);
    };

    return dataservice;
  })

  .factory('questionState', function($timeout) {
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
    };

    obj.getSelectedDayOfTheWeek = function() {
      var dayOfWeekNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
      ];

      return dayOfWeekNames[obj.selectedDate.getDay()];
    };

    return obj;
  });
