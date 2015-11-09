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
    MedicineDataService.createMedicineData(questionState.timeStamp, questionState.SixMP, questionState.MTX);
  };
});
