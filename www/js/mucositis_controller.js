angular.module('starter.controllers')

.controller('mucositisController', function($scope, MucositisDataService, questionState) {

  //Expose questionState
  $scope.questionState = questionState;

  //Intialize nauseaScore
  if (questionState.nauseaScore === undefined)
    questionState.nauseaScore = "5";

  //Initialize group values and classes
  if (questionState.groupvalue === undefined)
    questionState.groupvalue = [undefined, undefined, undefined];

  //Change selection
  $scope.select = function(groupnumber, newvalue) {
    questionState.groupvalue[groupnumber] = newvalue;
  };

  //Create new Mucositisdata instance
  MucositisDataService.finishedWizard = function() {
    MucositisDataService.createMucositisData(questionState.timeStamp, questionState.groupvalue[0], questionState.groupvalue[1], questionState.groupvalue[2], parseInt(questionState.nauseaScore, 10));
  };

})
