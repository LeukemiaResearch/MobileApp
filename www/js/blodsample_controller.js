angular.module('starter.controllers')

.controller('blodsampleController', function($scope, questionState, BloodsampleDataService) {

  //Expose questionState
  $scope.questionState = questionState;

  //values
  questionState.Leukocytter = undefined;
  questionState.Neutrofile = undefined;
  questionState.Thombocytter = undefined;
  questionState.Hemoglobin = undefined;
  questionState.Alat = undefined;
  questionState.CRP = undefined;

    BloodsampleDataService.finishedWizard = function() {
      BloodsampleDataService.createBloodsampleData(questionState.timeStamp, questionState.Leukocytter, questionState.Neutrofile, questionState.Thombocytter, questionState.Hemoglobin, questionState.Alat, questionState.CRP);
      console.log("Blodprøve gemt");
    };
});
