angular.module('starter.controllers')

  .controller('questionsController', function($scope, questionState, MucositisDataService, $ionicPopup) {

  $scope.questionState = questionState;

  if (questionState.timePickerObject === undefined)
    questionState.timePickerObject = {
      timeDisplayValue: undefined,
      displayValue: function () {
        var selectedTime = new Date(questionState.timePickerObject.inputEpochTime * 1000);
        return selectedTime.getUTCHours().toLocaleString('da-DK', {minimumIntegerDigits: 2, useGrouping: false})
          + ' : '
          + selectedTime.getUTCMinutes().toLocaleString('da-DK', {minimumIntegerDigits: 2, useGrouping: false});
      },
      inputEpochTime: (new Date().getHours() * 60 * 60 + Math.floor(new Date().getMinutes() / 5) * 5 * 60),  //Optional
      step: 5,  //Optional
      format: 24,  //Optional
      titleLabel: 'Tidspunkt',  //Optional
      setLabel: 'Vælg',  //Optional
      closeLabel: 'Anuller',  //Optional
      setButtonType: 'button-positive',  //Optional
      closeButtonType: 'button-stable',  //Optional
      callback: function (val) {    //Mandatory
        questionState.timePickerObject.inputEpochTime = val;
      }
    };

  if (questionState.datepickerObject === undefined)
    questionState.datepickerObject = {
      titleLabel: 'Dato',  //Optional
      todayLabel: 'I dag',  //Optional
      closeLabel: 'Luk',  //Optional
      setLabel: 'Vælg',  //Optional
      setButtonType: 'button-assertive',  //Optional
      todayButtonType: 'button-assertive',  //Optional
      closeButtonType: 'button-assertive',  //Optional
      inputDate: new Date(),  //Optional
      mondayFirst: true,  //Optional
      //disabledDates: disabledDates, //Optional
      weekDaysList: ["Sø", "Ma", "Ti", "On", "To", "Fr", "Lø"], //Optional
      monthList: ["Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December"], //Optional
      templateType: 'popup', //Optional
      showTodayButton: 'true', //Optional
      modalHeaderColor: 'bar-positive', //Optional
      modalFooterColor: 'bar-positive', //Optional
      //from: new Date(2012, 8, 2), //Optional
      //to: new Date(2018, 8, 25),  //Optional
      callback: function (val) {  //Mandatory
        questionState.datepickerObject.inputDate = val;
      },
      dateFormat: 'dd-MM-yyyy', //Optional
      closeOnSelect: false, //Optional
    };

  $scope.questions = {
    "Blodprøve": {
      "Tid": "templates/questions/timestamp.html",
      "Blodprøve": "templates/questions/blodsample.html"
    },
    "Medicin": {
      "Tid": "templates/questions/timestamp.html",
      "Medicin": "templates/questions/medicine.html"
    },
    "Smerte": {
      "Tid": "templates/questions/timestamp.html",
      "Morfin":"templates/questions/morphine.html",
      "Type":"templates/questions/painposition.html",
      "Styrke": "templates/questions/painscale.html"
    },
    "Mucositis": {
      "Tid": "templates/questions/timestamp.html",
      "Mundsår":"templates/questions/mucositistype.html",
      "Kvalme":"templates/questions/nausea.html"
    }
  };

  $scope.datatype = questionState.type;
  $scope.template = 0; //First template
  $scope.hideIndicators = Object.keys($scope.questions[$scope.datatype]).length<=1;

  $scope.finishedWizard = function(){

    //Store entered data
    if (questionState.type==='Mucositis')
      MucositisDataService.finishedWizard();

    //Clean up question state
    for (var variableKey in questionState){

      if (variableKey!=='timePickerObject' &&
        variableKey!=='datepickerObject' &&
        questionState.hasOwnProperty(variableKey))
      {
        delete questionState[variableKey];
      }
    }

    $ionicPopup.alert({
      title: $scope.datatype,
      content: 'Registrering gemt!'
    }).then(function(res) {
      setTimeout($scope.$ionicGoBack);
      console.log("WIZARD SLUT!!!");
    });
  }

})
