angular.module('starter.controllers')

  .controller('painController', function($scope, questionState) {

  //Expose questionState
  $scope.questionState = questionState;

  //values
  questionState.painType;
  questionState.painScore;
  questionState.morphine;
  questionState.morphineType;
  questionState.morphineDose;

  //Initialize
  if (questionState.morphineMeasureUnit === undefined)
    questionState.morphineMeasureUnit = 'mg';

  //pain type selection
  $scope.selectPainType = function(painType) {
    questionState.painType = painType;
  }

})
