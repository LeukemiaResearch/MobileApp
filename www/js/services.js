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

  .factory('PainDataService', function(IdGenerator, PainData, questionState){

    var paindataservice = {};

    //Inject TestData
    /*PainData.inject([{id: 1, date: new Date(2015, 8, 27, 10, 0, 0, 0), painType:'stomach', painScore: 6, morphine:false, morphineType:'', morphineDose:'', morphineMeasureUnit:''},
      {id: 2, date: new Date(2015, 8, 27, 17, 23, 22, 0), painType:'stomach', painScore: 8, morphine:true, morphineType:'oral', morphineDose:10.0, morphineMeasureUnit:'mg/dag'},
      {id: 3, date: new Date(2015, 9, 16, 19, 7, 34, 0), painType:'stomach', painScore: 2, morphine:false, morphineType:'', morphineDose:'', morphineMeasureUnit:''},
      {id: 4, date: new Date(2015, 10, 1, 18, 53, 17, 0), painType:'stomach', painScore: 4, morphine:false, morphineType:'', morphineDose:'', morphineMeasureUnit:''},
      {id: 5, date: new Date(2015, 10, 1, 22, 18, 56, 0), painType:'stomach', painScore: 8, morphine:true, morphineType:'oral', morphineDose:7.5, morphineMeasureUnit:'mg/dag'}]);*/

    //Pain data functions
    paindataservice.createPainData = function (date, painType, painScore, morphine, morphineType, morphineDose, morphineMeasureUnit){
      var id = IdGenerator.generateId();
      var obj = PainData.createInstance({id: id, timeStamp: date, painType: painType, painScore: painScore, morphine: morphine, morphineType: morphineType, morphineDose: morphineDose, morphineMeasureUnit: morphineMeasureUnit});
      PainData.inject(obj);
      return obj;
    };

    paindataservice.getAllPainData = function () {
      return PainData.getAll();
    };

    paindataservice.getData = function (start, end) {
      return PainData.filter({
        where: {
          timeStamp: {
            '>=': start,
            '<=': end
          }
        }
      });
    };

    paindataservice.getPainData = function (id) {
      return PainData.get(id);
    };

    paindataservice.getPainDataOnDate = function(date){
      var temp = date.setHours(0,0,0,0);
      return PainData.filter({
        where: {
          timeStamp: {
            '>': temp,
            '<': temp.setDate(temp.getDate()+1)
          }
        }
      });
    };

    paindataservice.deletePainData = function (id) {
      PainData.destroy(id);
    };

    paindataservice.finishedStep = function(stepNumber) {
      if (stepNumber==1) {
        return questionState.timeStamp !== undefined;
      }
      else if (stepNumber==2) {
        return true;
      }
      else if (stepNumber==3) {
        return questionState.painType !== undefined;
      }
      else if (stepNumber==4) {
        return (questionState.flaccvalue !== undefined && questionState.flaccvalue[0] !== undefined && questionState.flaccvalue[1] !== undefined && questionState.flaccvalue[2] !== undefined) || questionState.selectedSmiley !==undefined;
      }
      else
        return false;
    };

    paindataservice.finishedWizard = null;

    return paindataservice
  })

  .factory('MedicineDataService', function(IdGenerator, MedicineData, questionState){

    var medicinedataservice = {};

    //MedicineData
    //MedicineData.inject([{id: 1, date: new Date(2015, 8, 27, 0, 0, 0, 0), sixmp:0, mtx:0},{id: 2, date: new Date(2015, 9, 2, 0, 0, 0, 0), sixmp:0, mtx:0},{id: 3, date: new Date(2015, 9, 16, 0, 0, 0, 0), sixmp:10.0, mtx:10.0}, {id: 4, date: new Date(2015, 9, 17, 0, 0, 0, 0), sixmp:0, mtx:0}, {id: 5, date: new Date(2015, 10, 1, 0, 0, 0, 0), sixmp:0, mtx:0},{id: 6, date: new Date(2015, 10, 7, 0, 0, 0, 0), sixmp:25.0, mtx:10.0}]);

    medicinedataservice.createMedicineData = function (date, sixmp, mtx){
      var id = IdGenerator.generateId();
      var obj = MedicineData.createInstance({id: id, timeStamp: date, sixmp: sixmp, mtx: mtx});
      MedicineData.inject(obj);
      return obj;
    };

    medicinedataservice.getData = function (start, end) {
      return MedicineData.filter({
        where: {
          timeStamp: {
            '>=': start,
            '<=': end
          }
        }
      });
    };

    medicinedataservice.getAllMedicineData = function () {
      return MedicineData.getAll();
    };

    medicinedataservice.getMedicineData = function (id) {
      return MedicineData.get(id);
    };

    medicinedataservice.getMedicineDataOnDate = function(date){
      var temp = date.setHours(0,0,0,0);
      return MedicineData.filter({
        where: {
          timeStamp: {
            '>': temp,
            '<': temp.setDate(temp.getDate()+1)
          }
        }
      });
    };

    medicinedataservice.deleteMedicineData = function (id) {
      MedicineData.destroy(id);
    };

    medicinedataservice.finishedStep = function(stepNumber) {
      if (stepNumber==1){
        return questionState.timeStamp !== undefined;
      }
      else if (stepNumber==2){
        return questionState.SixMP !== undefined && questionState.MTX !== undefined;
      }
      else
        return false;
    };

    medicinedataservice.finishedWizard = null;

    return medicinedataservice;
  })

  .factory('BloodsampleDataService', function(IdGenerator, BloodsampleData, questionState){

    var bloodsampledataservice = {};

    //BloodsampleData
    /*BloodsampleData.inject([{id: 1, date: new Date(2015, 9, 2, 15, 15, 0, 0), leucocytes: 4.5, neutrofile: 7.8, thrombocytes: 45.2, hemoglobin: 3.7, alat: 3465, crp: 453},
      {id: 2, date: new Date(2015, 10, 7, 12, 2, 34, 0), leucocytes:78.5, neutrofile:12.3, thrombocytes:15.0, hemoglobin:4.1, alat:2635, crp:251}]);*/

    bloodsampledataservice.createBloodsampleData = function (date, leucocytes, neutrofile, thrombocytes, hemoglobin, alat, crp){
      var id = IdGenerator.generateId();
      var obj = BloodsampleData.createInstance({id: id, timeStamp:date, leucocytes: leucocytes,neutrofile: neutrofile,thrombocytes: thrombocytes,hemoglobin: hemoglobin,alat: alat,crp: crp});
      BloodsampleData.inject(obj);
      return obj;
    };

    bloodsampledataservice.getAllBloodsampleData = function () {
      return BloodsampleData.getAll();
    };

    bloodsampledataservice.getData = function (start, end) {
      return BloodsampleData.filter({
        where: {
          timeStamp: {
            '>=': start,
            '<=': end
          }
        }
      });
    };

    bloodsampledataservice.getBloodsampleData = function (id) {
      return BloodsampleData.get(id);
    };

    bloodsampledataservice.getBloodsampleDataOnDate = function(date){
      var temp = date.setHours(0,0,0,0);
      return BloodsampleData.filter({
        where: {
          timeStamp: {
            '>': temp,
            '<': temp.setDate(temp.getDate()+1)
          }
        }
      });
    };

    bloodsampledataservice.deleteBloodsampleData = function (id) {
      BloodsampleData.destroy(id);
    };

    bloodsampledataservice.finishedStep = function(stepNumber) {
      if (stepNumber==1){
        return questionState.timeStamp !== undefined;
      }
      else if (stepNumber==2){
        return questionState.Leukocytter !== undefined && questionState.Neutrofile !== undefined && questionState.Thombocytter !== undefined && questionState.Hemoglobin !== undefined && questionState.Alat !== undefined && questionState.CRP !== undefined;
      }
      else
        return false;
    };

    bloodsampledataservice.finishedWizard = null;

    return bloodsampledataservice;
  })

  .factory('MucositisDataService', function(IdGenerator, MucositisData, questionState){

    var mucositisdataservice = {};

    //MucositisData
    //MucositisData.inject([{id: 1, date: new Date(2015, 9, 16, 19, 14, 22, 0), mucositisScore:7, nauseaScore:6},{id: 2, date: new Date(2015, 10, 7, 19, 46, 0, 0), mucositisScore:9, nauseaScore:8}]);

    mucositisdataservice.createMucositisData = function (timeStamp, pain, ulcers, food, nauseaScore){
      var id = IdGenerator.generateId();
      var obj = MucositisData.createInstance({id: id, timeStamp: timeStamp, pain: pain, ulcers: ulcers, food:food, 'nauseaScore': nauseaScore});
      MucositisData.inject(obj);
      return obj;
    };

    mucositisdataservice.getData = function (start, end) {
      return MucositisData.filter({
        where: {
          timeStamp: {
            '>=': start,
            '<=': end
          }
        }
      });
    };

    mucositisdataservice.getAllMucositisData = function () {
      return MucositisData.getAll();
    };

    mucositisdataservice.getMucositisData = function (id) {
      return MucositisData.get(id);
    };

    mucositisdataservice.getMucositisDataOnDate = function(date){
      var temp = date.setHours(0,0,0,0);
      return MucositisData.filter({
        where: {
          timeStamp: {
            '>': temp,
            '<': temp.setDate(temp.getDate()+1)
          }
        }
      });
    };

    mucositisdataservice.deleteMucositisData = function (id) {
      MucositisData.destroy(id);
    };

    mucositisdataservice.finishedStep = function(stepNumber) {
      if (stepNumber==1)
        return questionState.timeStamp !== undefined;
      else if (stepNumber==2)
        return questionState.groupvalue !== undefined && questionState.groupvalue[0] !== undefined && questionState.groupvalue[1] !== undefined && questionState.groupvalue[2] !== undefined;
      else if (stepNumber==3)
        return questionState.nauseaScore;
      else
        return false;
    };

/*
    mucositisdataservice.finishedStep = null;
*/

    mucositisdataservice.finishedWizard = null;

    return mucositisdataservice;
  })

  .factory('questionState', function() {
    return {
      type: undefined //e.g. pain fo9r pain questions
    };
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
