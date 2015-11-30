angular.module('starter.controllers')

  .controller('painController', function ($scope, PainDataService, questionState) {

    //Expose questionState
    $scope.questionState = questionState;

    //values
    questionState.painType;
    /*questionState.painScore;
    questionState.morphine;
    questionState.morphineType;
    questionState.morphineDose;*/

    //Initialize group values and classes
    if (questionState.flaccvalue === undefined)
      questionState.flaccvalue = [undefined, undefined, undefined];

    if (questionState.morphineMeasureUnit === undefined)
      questionState.morphineMeasureUnit = 'mg/t';

    questionState.painScore = 0;

    //used for switching between pain scales
    $scope.show = true;

    //morphine dose

    //pain type selection
    $scope.selectPainType = function (painType) {
      questionState.painType = painType;
    };

    //flacc selection
    $scope.selectFlacc = function (flaccnumber, newvalue) {
      if (questionState.flaccvalue[flaccnumber] !== undefined) {
        questionState.painScore -= questionState.flaccvalue[flaccnumber];
      }
      questionState.flaccvalue[flaccnumber] = newvalue;
      questionState.painScore += newvalue;
    };

    //smiley selection
    questionState.selectedSmiley = undefined;

    $scope.selectSmiley = function (smileynumber) {
      questionState.selectedSmiley = smileynumber;
      questionState.painScore = smileynumber;
    };

    $scope.changeScale = function () {
      $scope.show = !$scope.show;
      questionState.painScore = 0;
      questionState.selectedSmiley = undefined;
      questionState.flaccvalue = [undefined, undefined, undefined];
    }

    //Save Data
    PainDataService.finishedWizard = function () {
      if (questionState.morphineType === undefined) {
        questionState.morphine = false;
        questionState.morphineMeasureUnit = '';
        questionState.morphineDose = '';
        questionState.morphineType = '';
      } else questionState.morphine = true;

      if (questionState.morphineType == 'oral') {
        questionState.morphineMeasureUnit = 'mg/dag';
      }

      $scope.lastRegistration = PainDataService.getLastPainData();

      var data = PainDataService.createPainData(questionState.timeStamp, questionState.painType, parseInt(questionState.painScore, 10),
        questionState.morphine, questionState.morphineType, parseFloat(questionState.morphineDose), questionState.morphineMeasureUnit);
      console.log(data);
    }
  });


