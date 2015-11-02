angular.module('starter.services', [])

  .factory('DataStore',function(){
    var store = new JSData.DS();
    store.registerAdapter('localforage',new DSLocalForageAdapter(),{default:true});
    return store;
  })

  .factory('DailyData',function(DataStore){
    return DataStore.defineResource('daily');
  })

  .factory('PainData',function(DataStore){
    return DataStore.defineResource('pain');
  })

  .factory('MedicineData',function(DataStore){
    return DataStore.defineResource('medicine');
  })

  .factory('BloodsampleData',function(DataStore){
    return DataStore.defineResource('bloodsample');
  })

  .factory('MucositisData',function(DataStore){
    return DataStore.defineResource('mucositis');
  })

  .factory('IdGenerator',function(){
    var id = {};
    id.generateId = function(){
      return '_' + Math.random().toString(36).substr(2, 9);
    };
    return id;
  })

  .factory('DailyDataService', function (IdGenerator, DailyData) {

    var dailydataservice = {};

    //DailyData
    DailyData.inject([
      {id: 1, date: new Date(2015, 8, 27, 0, 0, 0, 0), note: '', treatmentDay: '1'},
      {id: 2, date: new Date(2015, 9, 2, 0, 0, 0, 0), note: '', treatmentDay: '2'},
      {id: 3, date: new Date(2015, 9, 16, 0, 0, 0, 0), note: '', treatmentDay: '3'},
      {id: 4, date: new Date(2015, 9, 17, 0, 0, 0, 0), note: 'Fin dag, ingen bivirkninger', treatmentDay: '4'},
      {id: 5, date: new Date(2015, 10, 1, 0, 0, 0, 0), note: '', treatmentDay: '5'},
      {id: 6, date: new Date(2015, 10, 7, 0, 0, 0, 0), note: '', treatmentDay: '6'}
    ]);

    //Daily data functions
    dailydataservice.createDailyData = function (date, note, treatmentDay) {
      var id = IdGenerator.generateId();
      var dateWithoutTime = date.setHours(0, 0, 0, 0);
      var obj = DailyData.createInstance({id: id, date: dateWithoutTime, note: note, treatmentDay: treatmentDay});
      DailyData.inject(obj);
      return obj;
    };

    dailydataservice.getAllDailyData = function () {
      return DailyData.getAll();
    };

    dailydataservice.getDailyData = function (id) {
      return DailyData.get(id);
    };

    dailydataservice.getDailyDataOnDate = function(date){
      return DailyData.filter({
        where: {
          date: {
            '==': date.setHours(0,0,0,0)
          }
        }
      });
    };

    dailydataservice.deleteDailyData = function (id) {
      DailyData.destroy(id);
    };

    return dailydataservice;
  })

  .factory('PainDataService', function(IdGenerator, PainData){

    var paindataservice = {};

    //Inject TestData
    PainData.inject([{id: 1, date: new Date(2015, 8, 27, 10, 0, 0, 0), painType:'stomach', painScore: 6, morphine:false, morphineType:'', morphineDose:''},
      {id: 2, date: new Date(2015, 8, 27, 17, 23, 22, 0), painType:'stomach', painScore: 8, morphine:true, morphineType:'oral', morphineDose:10.0},
      {id: 3, date: new Date(2015, 9, 16, 19, 7, 34, 0), painType:'stomach', painScore: 2, morphine:false, morphineType:'', morphineDose:''},
      {id: 4, date: new Date(2015, 10, 1, 18, 53, 17, 0), painType:'stomach', painScore: 4, morphine:false, morphineType:'', morphineDose:''},
      {id: 5, date: new Date(2015, 10, 1, 22, 18, 56, 0), painType:'stomach', painScore: 8, morphine:true, morphineType:'oral', morphineDose:7.5}]);

    //Pain data functions
    paindataservice.createPainData = function (date, painType, painScore, morphine, morphineType, morphineDose){
      var id = IdGenerator.generateId();
      var obj = PainData.createInstance({id: id, date: date, painType: painType, painScore: painScore, morphine: morphine, morphineType: morphineType, morphineDose: morphineDose});
      PainData.inject(obj);
      return obj;
    };

    paindataservice.getAllPainData = function () {
      return PainData.getAll();
    };

    paindataservice.getPainData = function (id) {
      return PainData.get(id);
    };

    paindataservice.getPainDataOnDate = function(date){
      return PainData.filter({
        where: {
          date: {
            '==': date.setHours(0,0,0,0)
          }
        }
      });
    };

    paindataservice.deletePainData = function (id) {
      PainData.destroy(id);
    };

    return paindataservice
  })

  .factory('MedicineDataService', function(IdGenerator, MedicineData){

    var medicinedataservice = {};

    //MedicineData
    MedicineData.inject([{id: 1, date: new Date(2015, 8, 27, 0, 0, 0, 0), sixmp:0, mtx:0},{id: 2, date: new Date(2015, 9, 2, 0, 0, 0, 0), sixmp:0, mtx:0},{id: 3, date: new Date(2015, 9, 16, 0, 0, 0, 0), sixmp:10.0, mtx:10.0}, {id: 4, date: new Date(2015, 9, 17, 0, 0, 0, 0), sixmp:0, mtx:0}, {id: 5, date: new Date(2015, 10, 1, 0, 0, 0, 0), sixmp:0, mtx:0},{id: 6, date: new Date(2015, 10, 7, 0, 0, 0, 0), sixmp:25.0, mtx:10.0}]);

    medicinedataservice.createMedicineData = function (sixmp, mtx, date){
      var id = IdGenerator.generateId();
      var obj = MedicineData.createInstance({id: id, date: date, sixmp: sixmp, mtx: mtx});
      MedicineData.inject(obj);
      return obj;
    };

    medicinedataservice.getAllMedicineData = function () {
      return MedicineData.getAll();
    };

    medicinedataservice.getMedicineData = function (id) {
      return MedicineData.get(id);
    };

    medicinedataservice.getMedicineDataOnDate = function(date){
      return MedicineData.filter({
        where: {
          date: {
            '==': date.setHours(0,0,0,0)
          }
        }
      });
    };

    medicinedataservice.deleteMedicineData = function (id) {
      MedicineData.destroy(id);
    };

    return medicinedataservice;
  })

  .factory('BloodsampleDataService', function(IdGenerator, BloodsampleData){

    var bloodsampledataservice = {};

    //BloodsampleData
    BloodsampleData.inject([{id: 1, date: new Date(2015, 9, 2, 15, 15, 0, 0), leucocytes: 4.5, neutrofile: 7.8, thrombocytes: 45.2, hemoglobin: 3.7, alat: 3465, crp: 453},
      {id: 2, date: new Date(2015, 10, 7, 12, 2, 34, 0), leucocytes:78.5, neutrofile:12.3, thrombocytes:15.0, hemoglobin:4.1, alat:2635, crp:251}]);

    bloodsampledataservice.createBloodsampleData = function (leucocytes, neutrofile, thrombocytes, hemoglobin, alat, crp){
      var id = IdGenerator.generateId();
      var obj = BloodsampleData.createInstance({id: id, date:new Date(),leucocytes: leucocytes,neutrofile: neutrofile,thrombocytes: thrombocytes,hemoglobin: hemoglobin,alat: alat,crp: crp});
      BloodsampleData.inject(obj);
      return obj;
    };

    bloodsampledataservice.getAllBloodsampleData = function () {
      return BloodsampleData.getAll();
    };

    bloodsampledataservice.getBloodsampleData = function (id) {
      return BloodsampleData.get(id);
    };

    bloodsampledataservice.getBloodsampleDataOnDate = function(date){
      return BloodsampleData.filter({
        where: {
          date: {
            '==': date.setHours(0,0,0,0)
          }
        }
      });
    };

    bloodsampledataservice.deleteBloodsampleData = function (id) {
      BloodsampleData.destroy(id);
    };

    return bloodsampledataservice;
  })

  .factory('MucositisDataService', function(IdGenerator, MucositisData){

    var mucositisdataservice = {};

    //MucositisData
    MucositisData.inject([{id: 1, date: new Date(2015, 9, 16, 19, 14, 22, 0), mucositisScore:7, nauseaScore:6, imageFile:''},{id: 2, date: new Date(2015, 10, 7, 19, 46, 0, 0), mucositisScore:9, nauseaScore:8, imageFile:''}]);

    mucositisdataservice.createMucositisData = function (mucositisScore, nauseaScore, imageFile){
      var id = IdGenerator.generateId();
      var obj = MucositisData.createInstance({id: id, date:new Date(),mucositisScore: mucositisScore, nauseaScore: nauseaScore, imageFile: imageFile});
      MucositisData.inject(obj);
      return obj;
    };

    mucositisdataservice.getAllMucositisData = function () {
      return MucositisData.getAll();
    };

    mucositisdataservice.getMucositisData = function (id) {
      return MucositisData.get(id);
    };

    mucositisdataservice.getMucositisDataOnDate = function(date){
      return MucositisData.filter({
        where: {
          date: {
            '==': date.setHours(0,0,0,0)
          }
        }
      });
    };

    mucositisdataservice.deleteMucositisData = function (id) {
      MucositisData.destroy(id);
    };

    return mucositisdataservice;
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
