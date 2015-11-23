angular.module('starter.controllers')

  .controller('mucositisController', function ($scope, MucositisDataService, questionState, WizardHandler) {

    //Expose questionState
    $scope.questionState = questionState;

    //Intialize nauseaScore
    if (questionState.nauseaScore === undefined)
      questionState.nauseaScore = "5";

    //Initialize group values and classes
    if (questionState.groupvalue === undefined)
      questionState.groupvalue = [undefined, undefined, undefined];

    //Change selection
    $scope.select = function (groupnumber, newvalue) {
      questionState.groupvalue[groupnumber] = newvalue;
    };

    //Create new Mucositisdata instance
    MucositisDataService.finishedWizard = function () {
      MucositisDataService.createMucositisData(questionState.timeStamp, questionState.groupvalue[0], questionState.groupvalue[1], questionState.groupvalue[2], parseInt(questionState.nauseaScore, 10));
    };

    //Validate input
    /*MucositisDataService.finishedStep = function() {
      var stepNumber = WizardHandler.wizard().currentStepNumber();
      if (stepNumber==1)
        return questionState.timeStamp !== undefined;
      else if (stepNumber==2)
        return questionState.groupvalue !== undefined && questionState.groupvalue[0] !== undefined && questionState.groupvalue[1] !== undefined && questionState.groupvalue[2] !== undefined;
      else if (stepNumber==3)
        return questionState.nauseaScore;
      else
        return false;
    };*/

  });
