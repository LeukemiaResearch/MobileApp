angular.module('starter.controllers')

.controller('blodsampleController', function($scope, questionState) {

  //Expose questionState
  $scope.questionState = questionState;

  //values
  questionState.Leukocytter;
  questionState.Neutrofile;
  questionState.Thombocytter;
  questionState.Hemoglobin;
  questionState.Alat;
  questionState.CRP;
})
