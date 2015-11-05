angular.module('starter.controllers')

.controller('mucositisController', function($scope, MucositisDataService, questionState) {

  //Expose questionState
  $scope.questionState = questionState;

  //Intialize nauseaScore
  if (questionState.nauseaScore === undefined)
    questionState.nauseaScore = 5;

  //Initialize group values and classes
  if (questionState.groupvalue === undefined)
    questionState.groupvalue = [undefined, undefined, undefined];

  //Change selection
  $scope.select = function(groupnumber, newvalue) {
    questionState.groupvalue[groupnumber] = newvalue;
  };

  //Create new Mucositisdata instance
  MucositisDataService.finishedWizard = function(){
    console.log("Påbegynder oprettelse af mucositisdata!");
    var mucositisScore = 0;
    for (var i = 0; i < questionState.groupvalue.length; i++) {
      mucositisScore += questionState.groupvalue[i];
    }
    console.log("MucositisScore: " + mucositisScore + " , NauseaScore: " + questionState.nauseaScore);
    MucositisDataService.createMucositisData(mucositisScore, questionState.nauseaScore);
  };

})
