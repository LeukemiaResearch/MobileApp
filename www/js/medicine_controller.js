angular.module('starter.controllers')

  .controller('medicineController', function($scope, MedicineDataService, questionState) {

    //Expose questionState
    $scope.questionState = questionState;

    //Initialize SixMP
    questionState.SixMP = undefined;

    //Initialize MTX
    questionState.MTX = undefined;

    //Create new MedicineData instance
    MedicineDataService.finishedWizard = function() {
      var timeStamp = new Date(questionState.timeStamp.getTime());
      //need to set 1 millisecond because calendar date overflows when checking for valid front page data
      //caused by latestDate.setHours(24); in getLatestRegistration methods to get data inclusive for the day
      timeStamp.setHours(0,0,0,1);

      MedicineDataService.createMedicineData(timeStamp, questionState.SixMP, questionState.MTX);
    };
  });
