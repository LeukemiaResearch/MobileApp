angular.module('starter.services', [])

  .factory('Data',function(DS){
    DS.registerAdapter('localforage',new DSLocalForageAdapter(),{default:true});
    return DS.defineResource('data');
  })

  .factory('DataService', function (Data) {

    var dataservice = {};

    /*TODO - Create testdata
    Data.inject([
      {id: 1, date: 1440647647000, note: '', treatmentDay: '',
        medicine:[], pain:[], bloodsample:[], mucositis:[]},
      {id: 2, date: 1441192892000, note: '', treatmentDay: '',
        medicine:[], pain:[], bloodsample:[], mucositis:[]},
      {id: 3, date: 1442430454000, note: '', treatmentDay: '',
        medicine:[], pain:[], bloodsample:[], mucositis:[]},
      {id: 4, date: 1442468058000, note: '', treatmentDay: '',
        medicine:[], pain:[], bloodsample:[], mucositis:[]},
      {id: 5, date: 1443725400000, note: '', treatmentDay: '',
        medicine:[], pain:[], bloodsample:[], mucositis:[]},
      {id: 6, date: 1444212958000, note: '', treatmentDay: '',
        medicine:[], pain:[], bloodsample:[], mucositis:[]}
    ]);
    */

    dataservice.createNewData = function () {
      var id;
      id = function () {
        return '_' + Math.random().toString(36).substr(2, 9);
      };

      var date;
      date = function(){
         return Date.now();
       };

      Data.create({id: id, date: date, note: '', treatmentDay: '',
        medicine:[], pain:[], bloodsample:[], mucositis:[]});
      DS.digest();
      };

    dataservice.deleteData = function (id) {
      Data.destroy(id);
    };

    dataservice.getAllData = function () {
      return Data.getAll();
    };

    dataservice.getData = function (id) {
      return Data.get(id);
    };

    dataservice.insertPain = function (id){
    /*TODO*/
    };

    dataservice.insertMedicine = function (id){
    /*TODO*/
    };

    dataservice.insertBloodsample = function (id){
    /*TODO*/
    };

    dataservice.insertMucositis = function (id){
    /*TODO*/
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

    obj.events = [
      {foo: 'bar', date: "2015-08-18"},
      {foo: 'bar', date: "2015-08-20"},
      {foo: 'bloodsample', date: "2015-10-10"},
      {foo: 'highdose', date: "2015-10-20"}
    ];

    obj.addEvent = function(foo) {
      obj.events.push({foo: foo, date: obj.selectedDate});
    };

    obj.removeEvent = function(foo) {
      var index = -1;
      for (var i=0; i<obj.events.length; ++i)
      {
        if (obj.events[i]['date'].getTime() == obj.selectedDate.getTime()
        && obj.events[i]['foo'] == foo) {
          index = i;
          break;
        }
      }
      if (index > -1)
        obj.events.splice(index,1);

    };

    return obj;
  });
