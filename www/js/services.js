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
      //console.log("Gemmer PAINDATA!! - Antal PAINDATA records i DB: " + this.getAllPainData().length.toString());
      var obj = PainData.createInstance({id: id, date: date, painType: painType, painScore: painScore, morphine: morphine, morphineType: morphineType, morphineDose: morphineDose});
      PainData.inject(obj);
      //console.log("Data gemt - ID: " + obj.id + " , DATE: " + obj.date + " , PAINTYPE: " + obj.painType + " , PAINSCORE: " + obj.painScore + " , MORPHINE: " + obj.morphine + " , MORPHINETYPE: " + obj.morphineType + " , MORPHINEDOSE: " + obj.morphineDose);
      //console.log("Antal PAINDATA records i DB: " + this.getAllPainData().length.toString());
      return obj;
    };

    paindataservice.getAllPainData = function () {
      return PainData.getAll();
    };

    paindataservice.getPainData = function (id) {
      return PainData.get(id);
    };

    paindataservice.getPainDataOnDate = function(date){
      var temp = date.setHours(0,0,0,0);
      return PainData.filter({
        where: {
          date: {
            '>': temp,
            '<': temp.setDate(temp.getDate()+1)
          }
        }
      });
    };

    paindataservice.deletePainData = function (id) {
      PainData.destroy(id);
    };

    paindataservice.finishedWizard = null;

    return paindataservice
  })

  .factory('MedicineDataService', function(IdGenerator, MedicineData){

    var medicinedataservice = {};

    //MedicineData
    MedicineData.inject([{id: 1, date: new Date(2015, 8, 27, 0, 0, 0, 0), sixmp:0, mtx:0},{id: 2, date: new Date(2015, 9, 2, 0, 0, 0, 0), sixmp:0, mtx:0},{id: 3, date: new Date(2015, 9, 16, 0, 0, 0, 0), sixmp:10.0, mtx:10.0}, {id: 4, date: new Date(2015, 9, 17, 0, 0, 0, 0), sixmp:0, mtx:0}, {id: 5, date: new Date(2015, 10, 1, 0, 0, 0, 0), sixmp:0, mtx:0},{id: 6, date: new Date(2015, 10, 7, 0, 0, 0, 0), sixmp:25.0, mtx:10.0}]);

    medicinedataservice.createMedicineData = function (date, sixmp, mtx){
      var id = IdGenerator.generateId();
      //console.log("Gemmer MEDICINEDATA!! - Antal MEDICINEDATA records i DB: " + this.getAllMedicineData().length.toString());
      var obj = MedicineData.createInstance({id: id, date: date, sixmp: sixmp, mtx: mtx});
      MedicineData.inject(obj);
      //console.log("Data gemt - ID: " + obj.id + " , DATE: " + obj.date + " , SIXMP: " + obj.sixmp + " , MTX:" + obj.mtx);
      //console.log("Antal MEDICINEDATA records i DB: " + this.getAllMedicineData().length.toString());
      return obj;
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
          date: {
            '>': temp,
            '<': temp.setDate(temp.getDate()+1)
          }
        }
      });
    };

    medicinedataservice.deleteMedicineData = function (id) {
      MedicineData.destroy(id);
    };

    medicinedataservice.finishedWizard = null;

    return medicinedataservice;
  })

  .factory('BloodsampleDataService', function(IdGenerator, BloodsampleData){

    var bloodsampledataservice = {};

    //BloodsampleData
    BloodsampleData.inject([{id: 1, date: new Date(2015, 9, 2, 15, 15, 0, 0), leucocytes: 4.5, neutrofile: 7.8, thrombocytes: 45.2, hemoglobin: 3.7, alat: 3465, crp: 453},
      {id: 2, date: new Date(2015, 10, 7, 12, 2, 34, 0), leucocytes:78.5, neutrofile:12.3, thrombocytes:15.0, hemoglobin:4.1, alat:2635, crp:251}]);

    bloodsampledataservice.createBloodsampleData = function (date, leucocytes, neutrofile, thrombocytes, hemoglobin, alat, crp){
      var id = IdGenerator.generateId();
      //console.log("Gemmer BLOODSAMPLEDATA!! - Antal BLOODSAMPLEDATA records i DB: " + this.getAllBloodsampleData().length.toString());
      var obj = BloodsampleData.createInstance({id: id, date:date, leucocytes: leucocytes,neutrofile: neutrofile,thrombocytes: thrombocytes,hemoglobin: hemoglobin,alat: alat,crp: crp});
      BloodsampleData.inject(obj);
      //console.log("Data gemt!! - ID: " + obj.id + ", DATE: " + obj.date + ", leucocytes: " + obj.leucocytes + " , neutrofile: " + obj.neutrofile + " , thrombocytes: " + obj.thrombocytes + " , hemoglobin: " + obj.hemoglobin + " , alat: " + obj.alat + " , crp: " + obj.crp);
      //console.log("Antal BLOODSAMPLEDATA records i DB: " + this.getAllBloodsampleData().length.toString());
      return obj;
    };

    bloodsampledataservice.getAllBloodsampleData = function () {
      return BloodsampleData.getAll();
    };

    bloodsampledataservice.getBloodsampleData = function (id) {
      return BloodsampleData.get(id);
    };

    bloodsampledataservice.getBloodsampleDataOnDate = function(date){
      var temp = date.setHours(0,0,0,0);
      return BloodsampleData.filter({
        where: {
          date: {
            '>': temp,
            '<': temp.setDate(temp.getDate()+1)
          }
        }
      });
    };

    bloodsampledataservice.deleteBloodsampleData = function (id) {
      BloodsampleData.destroy(id);
    };

    bloodsampledataservice.finishedWizard = null;

    return bloodsampledataservice;
  })

  .factory('MucositisDataService', function(IdGenerator, MucositisData){

    var mucositisdataservice = {};

    //MucositisData
    //MucositisData.inject([{id: 1, date: new Date(2015, 9, 16, 19, 14, 22, 0), mucositisScore:7, nauseaScore:6},{id: 2, date: new Date(2015, 10, 7, 19, 46, 0, 0), mucositisScore:9, nauseaScore:8}]);

    mucositisdataservice.createMucositisData = function (timeStamp, pain, ulcers, food, nauseaScore){
      var id = IdGenerator.generateId();
      //console.log("Gemmer paindata!! - Antal MUCOSITISDATA records i DB: " + this.getAllMucositisData().length.toString());
      var obj = MucositisData.createInstance({id: id, date: timeStamp, pain: pain, ulcers: ulcers, food:food, 'nauseaScore': nauseaScore});
      MucositisData.inject(obj);
      //console.log("Data gemt!! - ID: " + obj.id + ", DATE: " + obj.date + ", pain: " + obj.pain + " , ulcers: " + obj.ulcers + " , food: " + obj.food + " , nauseaScore: " + obj.nauseaScore);
      //console.log("Antal MUCOSITISDATA records i DB: " + this.getAllMucositisData().length.toString());
      return obj;
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
          date: {
            '>': temp,
            '<': temp.setDate(temp.getDate()+1)
          }
        }
      });
    };

    mucositisdataservice.deleteMucositisData = function (id) {
      MucositisData.destroy(id);
    };

    mucositisdataservice.finishedWizard = null;

    return mucositisdataservice;
  })

  .factory('questionState', function() {
    return {
      type: undefined //e.g. pain for pain questions
    };
  })

  .factory('dataProvider', function(MucositisDataService) {
    var getDataObjects = function() {
      return MucositisDataService.getAllMucositisData();
    };

     var getAllDataSeries = function() {
      var result = {};
      var dataObjects = getDataObjects();
      for (objcount in dataObjects) {
        var obj = dataObjects[objcount];
        var timeStamp = obj['timeStamp'];
        for (key in obj) {
          if (['id', 'timeStamp'].indexOf(key)>=0 || !obj.hasOwnProperty(key))
            continue;
          if (result[key]===undefined)
            result[key] = new Array();
          result[key].push({'x':timeStamp, 'y':obj[key]});
        }
      }
      return result;
    };

    var getAllDataTable = function() {
      var result = {};
      var dataSeries = getAllDataSeries();
      for (dataseriename in dataSeries) {
        if (!result.hasOwnProperty(dataseriename)) {
          result[dataseriename] = {};
          if (Object.keys(result).length>0) {
            for (i in result[Object.keys(result)[0]])
              result[dataseriename][i] = {'x': i.x, 'y':undefined};
          };
        }
        for (obj_index in dataSeries[dataseriename]) {
          var obj = dataSeries[dataseriename][obj_index];
          if (!result[dataseriename].hasOwnProperty(obj.x)) {
            for (var ds in result) {
              result[ds][obj.x]=undefined;
            }
          }
          result[dataseriename][obj.x] = obj.y;
        }
      }
      return result;
    };

    return {
      'getAllDataSeries': getAllDataSeries,
      'getAllDataTable': getAllDataTable
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



