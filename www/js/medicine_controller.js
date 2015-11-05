angular.module('starter.controllers')

  .controller('medicineController', function($scope, questionState) {

  //Expose questionState
  $scope.questionState = questionState;

  //values
  questionState.From;
  questionState.To;
  questionState.MP;
  questionState.MTX;
})
