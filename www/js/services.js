angular.module('starter.services', [])

  .factory('Data',function(DS){
    DS.registerAdapter('localforage',new DSLocalForageAdapter(),{default:true});
    return DS.defineResource('data');
  })

  .factory('DataService', function (Data) {

    var dataservice = {};

    //Create testdata
    Data.inject([
      {id: 1, date: new Date(2015, 8, 27, 0, 0, 0, 0), note: '', treatmentDay: '1',
        medicine:[{sixmp:0,mtx:0}], pain:[{time:new Date(2015, 8, 27, 10, 0, 0, 0),painType:'stomach', painScore: 6,morphine:false,morphineType:'',morphineDose:''},{time:new Date(2015, 8, 27, 17, 23, 22, 0),painType:'stomach', painScore: 8,morphine:true,morphineType:'oral',morphineDose:10.0}], bloodsample:[], mucositis:[]},
      {id: 2, date: new Date(2015, 9, 2, 0, 0, 0, 0), note: '', treatmentDay: '2',
        medicine:[{sixmp:0,mtx:0}], pain:[], bloodsample:[{time:new Date(2015, 9, 2, 15, 15, 0, 0),leucocytes:4.5,neutrofile:7.8,thrombocytes:45.2,hemoglobin:3.7,alat:3465,crp:453}], mucositis:[]},
      {id: 3, date: new Date(2015, 9, 16, 0, 0, 0, 0), note: '', treatmentDay: '3',
        medicine:[{sixmp:10.0,mtx:10.0}], pain:[{time:new Date(2015, 9, 16, 19, 7, 34, 0),painType:'stomach', painScore: 2,morphine:false,morphineType:'',morphineDose:''}], bloodsample:[], mucositis:[{time:new Date(2015, 9, 16, 19, 14, 22, 0),mucositisScore:7,nauseaScore:6,imageFile:''}]},
      {id: 4, date: new Date(2015, 9, 17, 0, 0, 0, 0), note: 'Fin dag, ingen bivirkninger', treatmentDay: '4',
        medicine:[{sixmp:0,mtx:0}], pain:[], bloodsample:[], mucositis:[]},
      {id: 5, date: new Date(2015, 10, 1, 0, 0, 0, 0), note: '', treatmentDay: '5',
        medicine:[{sixmp:0,mtx:0}], pain:[{time:new Date(2015, 10, 1, 18, 53, 17, 0),painType:'stomach', painScore: 4,morphine:false,morphineType:'',morphineDose:''},{time:new Date(2015, 10, 1, 22, 18, 56, 0),painType:'stomach', painScore: 8,morphine:true,morphineType:'oral',morphineDose:7.5}], bloodsample:[], mucositis:[]},
      {id: 6, date: new Date(2015, 10, 7, 0, 0, 0, 0), note: '', treatmentDay: '6',
        medicine:[{sixmp:25.0,mtx:10.0}], pain:[], bloodsample:[{time:new Date(2015, 10, 7, 12, 2, 34, 0),leucocytes:78.5,neutrofile:12.3,thrombocytes:15.0,hemoglobin:4.1,alat:2635,crp:251}], mucositis:[{time:new Date(2015, 10, 7, 19, 46, 0, 0),mucositisScore:9,nauseaScore:8,imageFile:''}]}
    ]);

    dataservice.dataOnDate = function(date){
      return Data.filter({
        where: {
          date: {
            '==': date.setHours(0,0,0,0)
          }
        }
      });
    };

    dataservice.createNewData = function (date, note, treatmentDay) {
      var id;
      id = function () {
        return '_' + Math.random().toString(36).substr(2, 9);
      };

      return Data.create({id: id, date: date.setHours(0,0,0,0), note: note, treatmentDay: treatmentDay,
        medicine:[], pain:[], bloodsample:[], mucositis:[]});
      };

    dataservice.deleteData = function (id) {
      Data.destroy(id);
    };

    dataservice.getAllData = function () {
      return Data.findAll();
    };

    dataservice.getData = function (id) {
      return Data.find(id);
    };

    dataservice.insertPainData = function (painType, painScore, morphine, morphineType, morphineDose){
      var data = this.dataOnDate(new Date());
      if(!data){
        data = this.createNewData(new Date());
      }
      data.pain.push({time: new Date(), painType: painType, painScore: painScore, morphine: morphine, morphineType: morphineType, morphineDose: morphineDose});
      Data.update(data.id, {pain: data.pain});
    };

    dataservice.insertMedicineData = function (sixmp, mtx){
      var data = this.dataOnDate(new Date());
      if(!data){
        data = this.createNewData(new Date());
      }
      data.medicine.push({sixmp: sixmp, mtx: mtx});
      Data.update(data.id, {medicine: data.medicine});
    };

    dataservice.insertBloodsampleData = function (leucocytes, neutrofile, thrombocytes, hemoglobin, alat, crp){
      var data = this.dataOnDate(new Date());
      if(!data){
        data = this.createNewData(new Date());
      }
      data.bloodsample.push({time:new Date(),leucocytes: leucocytes,neutrofile: neutrofile,thrombocytes: thrombocytes,hemoglobin: hemoglobin,alat: alat,crp: crp});
      Data.update(data.id, {bloodsample: data.bloodsample});
    };

    dataservice.insertMucositisData = function (mucositisScore, nauseaScore, imageFile){
      var data = this.dataOnDate(new Date());
      if(!data){
        data = this.createNewData(new Date());
      }
    data.mucositis.push({time:new Date(),mucositisScore: mucositisScore, nauseaScore: nauseaScore, imageFile: imageFile});
    Data.update(data.id, {mucositis: data.mucositis});
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
