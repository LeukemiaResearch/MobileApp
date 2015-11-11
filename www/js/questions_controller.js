angular.module('starter.controllers')

  .controller('questionsController', function ($scope, questionState, PainDataService, MucositisDataService, MedicineDataService, BloodsampleDataService, $ionicPopup) {

    $scope.questionState = questionState;

    $scope.formatTime = function (inputEpochTime) {
      var selectedTime = new Date(inputEpochTime * 1000);
      var hours = selectedTime.getUTCHours();
      var minutes = selectedTime.getUTCMinutes();
      return (hours < 10 ? '0' : '') + hours + ' : ' + (minutes < 10 ? '0' : '') + minutes;
    };

    if ($scope.timePickerObject === undefined)
      $scope.timePickerObject = {
        displayValue: function () {
          return $scope.formatTime($scope.timePickerObject.inputEpochTime);
        },
        inputEpochTime: ((questionState.timeStamp ? questionState.timeStamp : new Date()).getHours() * 60 * 60 +
        Math.floor((questionState.timeStamp ? questionState.timeStamp : new Date()).getMinutes() / 5) * 5 * 60),  //Optional
        step: 5,  //Optional
        format: 24,  //Optional
        titleLabel: 'Tidspunkt',  //Optional
        setLabel: 'Vælg',  //Optional
        closeLabel: 'Luk',  //Optional
        setButtonType: 'button-positive',  //Optional
        closeButtonType: 'button-stable',  //Optional
        callback: function (val) {    //Mandatory
          if (val) {
            $scope.timePickerObject.inputEpochTime = val;
            $scope.updateQuestionStateTimeStamp();
          }
        }
      };

    if ($scope.datepickerObject === undefined)
      $scope.datepickerObject = {
        titleLabel: 'Dato',  //Optional
        todayLabel: 'I dag',  //Optional
        closeLabel: 'Luk',  //Optional
        setLabel: 'Vælg',  //Optional
        setButtonType: 'button-positive',  //Optional
        todayButtonType: 'button-stable',  //Optional
        closeButtonType: 'button-stable',  //Optional
        inputDate: (questionState.timeStamp ? questionState.timeStamp : new Date()),  //Optional
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
          if (val) {
            $scope.datepickerObject.inputDate = val;
            $scope.updateQuestionStateTimeStamp();
          }
        },
        dateFormat: 'dd-MM-yyyy', //Optional
        closeOnSelect: false, //Optional
      };

    $scope.updateQuestionStateTimeStamp = function () {
      var date = $scope.datepickerObject.inputDate;
      var hours = Math.floor($scope.timePickerObject.inputEpochTime / 3600);
      var minutes = Math.floor(($scope.timePickerObject.inputEpochTime - hours * 3600) / 60);
      date.setHours(hours, minutes, 0, 0);
      questionState.timeStamp = date;
    };
    $scope.updateQuestionStateTimeStamp();

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
        "Morfin": "templates/questions/morphine.html",
        "Type": "templates/questions/painposition.html",
        "Styrke": "templates/questions/painscale.html",
      },
      "Mucositis": {
        "Tid": "templates/questions/timestamp.html",
        "Mundsår": "templates/questions/mucositistype.html",
        "Kvalme": "templates/questions/nausea.html"
      }
    };

    $scope.datatype = questionState.type;
    $scope.template = 0; //First template
    $scope.hideIndicators = Object.keys($scope.questions[$scope.datatype]).length <= 1;

    $scope.finishedWizard = function () {

      //Store entered data
      if (questionState.type === 'Mucositis') {
        MucositisDataService.finishedWizard();
      }

      else if (questionState.type === 'Medicin') {
        MedicineDataService.finishedWizard();
      }

      else if (questionState.type === 'Smerte') {
        PainDataService.finishedWizard();
      }

      else if (questionState.type === 'Blodprøve') {
        BloodsampleDataService.finishedWizard();
      }

      //Clean up question state
      for (var variableKey in questionState) {

        if (variableKey !== 'timeStamp' &&
          questionState.hasOwnProperty(variableKey)) {
          delete questionState[variableKey];
        }
      }

      $ionicPopup.alert({
        title: $scope.datatype,
        content: 'Registrering gemt!'
      }).then(function (res) {
        setTimeout($scope.$ionicGoBack);
        console.log("WIZARD SLUT!!!");
      });
    }

  });
